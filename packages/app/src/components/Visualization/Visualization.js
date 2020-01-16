import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import i18n from '@dhis2/d2-i18n'
import debounce from 'lodash-es/debounce'

import styles from './styles/Visualization.style'
import VisualizationPlugin from '@dhis2/data-visualizer-plugin'
import { sGetVisualization } from '../../reducers/visualization'
import { sGetCurrent } from '../../reducers/current'
import { sGetUiRightSidebarOpen, sGetUiInterpretation } from '../../reducers/ui'
import { sGetLoadError } from '../../reducers/loader'

import { acAddMetadata } from '../../actions/metadata'
import { acSetChart } from '../../actions/chart'
import { acSetLoadError } from '../../actions/loader'

import StartScreen from './StartScreen'

export class Visualization extends Component {
    constructor(props) {
        super(props)

        this.state = {
            renderId: null,
        }
    }

    onError = err => {
        const error =
            (err && err.message) ||
            i18n.t('Error generating chart, please try again')

        this.props.acSetLoadError(error)
    }

    onChartGenerated = svg => this.props.acSetChart(svg)

    onResponsesReceived = responses => {
        const forMetadata = {}

        responses.forEach(response =>
            Object.entries(response.metaData.items).forEach(([id, item]) => {
                forMetadata[id] = {
                    id,
                    name: item.name || item.displayName,
                    displayName: item.displayName,
                }
            })
        )

        this.props.acAddMetadata(forMetadata)
    }

    getNewRenderId = () =>
        this.setState({
            renderId:
                typeof this.state.renderId === 'number'
                    ? this.state.renderId + 1
                    : 1,
        })

    addResizeHandler = () => {
        window.addEventListener(
            'resize',
            debounce(() => {
                this.getNewRenderId()
            }, 300)
        )
    }

    componentDidMount() {
        this.addResizeHandler()
    }

    componentDidUpdate(prevProps) {
        // open sidebar
        if (this.props.rightSidebarOpen !== prevProps.rightSidebarOpen) {
            this.getNewRenderId()
        }
    }

    render() {
        const { visConfig, visFilters, error } = this.props
        const { renderId } = this.state

        return !visConfig || error ? (
            <StartScreen />
        ) : (
            <VisualizationPlugin
                id={renderId}
                d2={this.context.d2}
                config={visConfig}
                filters={visFilters}
                onChartGenerated={this.onChartGenerated}
                onResponsesReceived={this.onResponsesReceived}
                onError={this.onError}
                style={styles.chartCanvas}
            />
        )
    }
}

Visualization.contextTypes = {
    d2: PropTypes.object,
}

Visualization.propTypes = {
    acAddMetadata: PropTypes.func,
    acSetChart: PropTypes.func,
    acSetLoadError: PropTypes.func,
    error: PropTypes.string,
    rightSidebarOpen: PropTypes.bool,
    visConfig: PropTypes.object,
    visFilters: PropTypes.object,
}

export const visConfigSelector = createSelector(
    [sGetCurrent, sGetVisualization, sGetUiInterpretation],
    (current, visualization, interpretation) =>
        interpretation.id ? visualization : current
)

export const visFiltersSelector = createSelector(
    [sGetUiInterpretation],
    interpretation =>
        interpretation.created
            ? { relativePeriodDate: interpretation.created }
            : {}
)

const mapStateToProps = state => ({
    visConfig: visConfigSelector(state),
    visFilters: visFiltersSelector(state),
    rightSidebarOpen: sGetUiRightSidebarOpen(state),
    error: sGetLoadError(state),
})

export default connect(mapStateToProps, {
    acAddMetadata,
    acSetChart,
    acSetLoadError,
})(Visualization)
