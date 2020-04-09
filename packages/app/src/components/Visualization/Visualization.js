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
    MultipleIndicatorAsFilterError,
    NoDataOrDataElementGroupSetError,
    CombinationDEGSRRError,
} from '../../modules/error'
import LoadingMask from '../../widgets/LoadingMask'

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
            switch (response.errorCode) {
                case 'E7114':
                    error = new AssignedCategoriesDataElementsError()
                    break
                case 'E7110':
                    error = new AssignedCategoriesAsFilterError()
                    break
                case 'E7108':
                    error = new MultipleIndicatorAsFilterError()
                    break
                case 'E7102':
                    error = new NoDataOrDataElementGroupSetError(
                        this.props.visualization.type
                    )
                    break
                case 'E7112':
                    error = new CombinationDEGSRRError()
                    break
                default:
                    error = response
            }
        } else {
            error = new GenericServerError()
        }

        this.props.setLoadError(error)
    }

    onChartGenerated = svg => this.props.setChart(svg)

    onResponsesReceived = responses => {
        const forMetadata = {}
        if (
            !responses.some(response => response.rows && response.rows.length)
        ) {
            throw new EmptyResponseError()
        }
        responses.forEach(response => {
            Object.entries(response.metaData.items).forEach(([id, item]) => {
                forMetadata[id] = {
                    id,
                    name: item.name || item.displayName,
                    displayName: item.displayName,
                    dimensionItemType: item.dimensionItemType,
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
        const { visualization, visFilters, error } = this.props
        const { renderId } = this.state

        return !visualization || error ? (
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
                    visualization={visualization}
                    filters={visFilters}
                    onChartGenerated={this.onChartGenerated}
                    onLoadingComplete={this.props.onLoadingComplete}
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
    visFilters: PropTypes.object,
    visualization: PropTypes.object,
    onLoadingComplete: PropTypes.func,
}

export const visualizationSelector = createSelector(
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
    visualization: visualizationSelector(state),
    visFilters: visFiltersSelector(state),
    rightSidebarOpen: sGetUiRightSidebarOpen(state),
    error: sGetLoadError(state),
    isLoading: sGetIsPluginLoading(state),
})

const mapDispatchToProps = dispatch => ({
    onLoadingComplete: () => dispatch(acSetPluginLoading(false)),
    addMetadata: metadata => dispatch(acAddMetadata(metadata)),
    setChart: chart => dispatch(acSetChart(chart)),
    setLoadError: error => dispatch(acSetLoadError(error)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Visualization)
