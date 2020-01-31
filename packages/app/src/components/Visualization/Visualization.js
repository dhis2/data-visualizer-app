import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import debounce from 'lodash-es/debounce'

import styles from './styles/Visualization.style'
import VisualizationPlugin from '@dhis2/data-visualizer-plugin'
import { sGetVisualization } from '../../reducers/visualization'
import { sGetCurrent } from '../../reducers/current'
import { sGetUiRightSidebarOpen, sGetUiInterpretation } from '../../reducers/ui'
import { sGetLoadError, sGetIsPluginLoading } from '../../reducers/loader'

import { acAddMetadata } from '../../actions/metadata'
import { acSetChart } from '../../actions/chart'
import { acSetLoadError, acSetPluginLoading } from '../../actions/loader'

import StartScreen from './StartScreen'
import {
    AssignedCategoriesDataElementsError,
    GenericServerError,
    EmptyResponseError,
    AssignedCategoriesAsFilterError,
} from '../../modules/error'
import LoadingMask from './LoadingMask'

export class Visualization extends Component {
    constructor(props) {
        super(props)

        this.state = {
            renderId: null,
        }
    }

    onError = response => {
        let error
        if (response) {
            if (response.errorCode === 'E7114') {
                error = new AssignedCategoriesDataElementsError()
            } else if (response.errorCode === 'E7110') {
                error = new AssignedCategoriesAsFilterError()
            } else {
                error = response
            }
        } else {
            error = new GenericServerError()
        }

        this.props.setLoadError(error)
        this.props.onLoadingFinished()
    }

    onChartGenerated = svg => this.props.setChart(svg)

    onResponsesReceived = responses => {
        const forMetadata = {}

        responses.forEach(response => {
            if (!response.rows || !response.rows.length) {
                throw new EmptyResponseError()
            }
            Object.entries(response.metaData.items).forEach(([id, item]) => {
                forMetadata[id] = {
                    id,
                    name: item.name || item.displayName,
                    displayName: item.displayName,
                }
            })
        })

        this.props.addMetadata(forMetadata)
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
            <Fragment>
                {this.props.isLoading ? (
                    <div style={styles.loadingCover}>
                        <LoadingMask />
                    </div>
                ) : null}
                <VisualizationPlugin
                    id={renderId}
                    d2={this.context.d2}
                    config={visConfig}
                    filters={visFilters}
                    onChartGenerated={this.onChartGenerated}
                    onLoadingComplete={this.props.onLoadingFinished}
                    onResponsesReceived={this.onResponsesReceived}
                    onError={this.onError}
                    style={styles.chartCanvas}
                />
            </Fragment>
        )
    }
}

Visualization.contextTypes = {
    d2: PropTypes.object,
}

Visualization.propTypes = {
    addMetadata: PropTypes.func,
    error: PropTypes.object,
    isLoading: PropTypes.bool,
    rightSidebarOpen: PropTypes.bool,
    setChart: PropTypes.func,
    setLoadError: PropTypes.func,
    visConfig: PropTypes.object,
    visFilters: PropTypes.object,
    onLoadingFinished: PropTypes.func,
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
    isLoading: sGetIsPluginLoading(state),
})

const mapDispatchToProps = dispatch => ({
    onLoadingFinished: () => dispatch(acSetPluginLoading(false)),
    addMetadata: metadata => dispatch(acAddMetadata(metadata)),
    setChart: chart => dispatch(acSetChart(chart)),
    setLoadError: error => dispatch(acSetLoadError(error)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Visualization)
