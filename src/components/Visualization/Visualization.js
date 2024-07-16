import { DIMENSION_ID_DATA, VIS_TYPE_PIVOT_TABLE } from '@dhis2/analytics'
import debounce from 'lodash-es/debounce'
import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { tSetCurrentFromUi } from '../../actions/current.js'
import { acSetLoadError, acSetPluginLoading } from '../../actions/loader.js'
import { acAddMetadata } from '../../actions/metadata.js'
import {
    acSetUiItems,
    acSetUiDataSorting,
    acAddParentGraphMap,
} from '../../actions/ui.js'
import { ensureAnalyticsResponsesContainData } from '../../modules/analytics.js'
import {
    AssignedCategoriesDataElementsError,
    GenericServerError,
    AssignedCategoriesAsFilterError,
    MultipleIndicatorAsFilterError,
    NoDataOrDataElementGroupSetError,
    CombinationDEGSRRError,
    NoOrgUnitResponseError,
    NoDataError,
    ValueTypeError,
    AnalyticsGenerationError,
    AnalyticsRequestError,
} from '../../modules/error.js'
import { removeLastPathSegment } from '../../modules/orgUnit.js'
import { sGetCurrent } from '../../reducers/current.js'
import { sGetLoadError, sGetIsPluginLoading } from '../../reducers/loader.js'
import { sGetSettingsDisplayProperty } from '../../reducers/settings.js'
import { sGetUiRightSidebarOpen } from '../../reducers/ui.js'
import LoadingMask from '../../widgets/LoadingMask.js'
import { ChartContext } from '../ChartProvider.js'
import { VisualizationPlugin } from '../VisualizationPlugin/VisualizationPlugin.js'
import StartScreen from './StartScreen.js'
import styles from './styles/Visualization.style.js'

export class UnconnectedVisualization extends Component {
    constructor(props) {
        super(props)

        this.state = {
            renderId: null,
        }
    }

    onError = (response) => {
        let error
        if (response) {
            switch (response.details?.errorCode) {
                case 'E7113':
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
                case 'E7124':
                    {
                        if (response?.message?.includes('`dx`')) {
                            error = new NoDataError(
                                this.props.visualization.type
                            )
                        } else if (response?.message?.includes('`ou`')) {
                            error = new NoOrgUnitResponseError()
                        } else {
                            error = new GenericServerError()
                        }
                    }
                    break
                case 'E7144':
                    error = new AnalyticsGenerationError()
                    break
                case 'E7145':
                    error = new AnalyticsRequestError()
                    break
                case 'E2200':
                    error = new NoDataError(this.props.visualization.type)
                    break
                default:
                    error = response
            }
        } else {
            error = new GenericServerError()
        }

        this.props.setLoadError(error)
    }

    onChartGenerated = (chart) => {
        this.context.setChart(chart)
    }

    onDataSorted = (sorting) => {
        this.props.onLoadingStart()

        this.props.setUiDataSorting(sorting)

        // simulate an update for refreshing the visualization
        this.props.setCurrent()
    }

    onResponsesReceived = (responses) => {
        const forMetadata = {}

        responses.forEach((response) => {
            if (
                (response?.metaData?.dimensions || {})[
                    DIMENSION_ID_DATA
                ]?.every(
                    (dim) => response.metaData.items[dim]?.valueType === 'TEXT'
                ) &&
                this.props.visualization.type !== VIS_TYPE_PIVOT_TABLE
            ) {
                throw new ValueTypeError()
            }

            Object.entries(response?.metaData?.items || []).forEach(
                ([id, item]) => {
                    forMetadata[id] = {
                        id,
                        name: item.name || item.displayName,
                        displayName: item.displayName,
                        dimensionItemType: item.dimensionItemType,
                    }
                }
            )
        })

        this.props.addMetadata(forMetadata)

        ensureAnalyticsResponsesContainData(
            responses,
            this.props.visualization.type
        )
    }

    onDrill = (drillData) => {
        if (drillData?.ou) {
            const ou = drillData.ou

            const itemIds = [ou.id]

            if (ou.level) {
                itemIds.push(`LEVEL-${ou.level}`)
            }

            if (ou.path) {
                const path = removeLastPathSegment(ou.path)

                this.props.addParentGraphMap({
                    [ou.id]:
                        path === `/{${ou.id}` ? '' : path.replace(/^\//, ''),
                })
            }

            this.props.setUiItems({
                dimensionId: 'ou',
                itemIds,
            })
        }

        // TODO drillData?.pe

        // simulate an update for refreshing the visualization
        this.props.setCurrent()
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
        const {
            visualization,
            displayProperty,
            error,
            isLoading,
            onLoadingComplete,
        } = this.props
        const { renderId } = this.state

        return !visualization || error ? (
            <StartScreen />
        ) : (
            <Fragment>
                {isLoading ? (
                    <div style={styles.loadingCover}>
                        <LoadingMask />
                    </div>
                ) : null}
                <VisualizationPlugin
                    id={renderId}
                    visualization={visualization}
                    onChartGenerated={this.onChartGenerated}
                    onLoadingComplete={onLoadingComplete}
                    onDataSorted={this.onDataSorted}
                    onResponsesReceived={this.onResponsesReceived}
                    onError={this.onError}
                    onDrill={this.onDrill}
                    style={styles.chartCanvas}
                    displayProperty={displayProperty}
                />
            </Fragment>
        )
    }
}

UnconnectedVisualization.propTypes = {
    addMetadata: PropTypes.func,
    addParentGraphMap: PropTypes.func,
    displayProperty: PropTypes.string,
    error: PropTypes.object,
    isLoading: PropTypes.bool,
    rightSidebarOpen: PropTypes.bool,
    setCurrent: PropTypes.func,
    setLoadError: PropTypes.func,
    setUiDataSorting: PropTypes.func,
    setUiItems: PropTypes.func,
    visualization: PropTypes.object,
    onLoadingComplete: PropTypes.func,
    onLoadingStart: PropTypes.func,
}

UnconnectedVisualization.contextType = ChartContext
// Needed for Jest/Enzyme context mocking to work
UnconnectedVisualization.contextTypes = {
    getChart: PropTypes.func,
    setChart: PropTypes.func,
    isHighchartsChartInstance: PropTypes.func,
}

const mapStateToProps = (state) => ({
    visualization: sGetCurrent(state),
    rightSidebarOpen: sGetUiRightSidebarOpen(state),
    error: sGetLoadError(state),
    isLoading: sGetIsPluginLoading(state),
    displayProperty: sGetSettingsDisplayProperty(state),
})

const mapDispatchToProps = (dispatch) => ({
    onLoadingComplete: () => dispatch(acSetPluginLoading(false)),
    onLoadingStart: () => dispatch(acSetPluginLoading(true)),
    addMetadata: (metadata) => dispatch(acAddMetadata(metadata)),
    addParentGraphMap: (parentGraphMap) =>
        dispatch(acAddParentGraphMap(parentGraphMap)),
    setLoadError: (error) => dispatch(acSetLoadError(error)),
    setUiItems: (data) => dispatch(acSetUiItems(data)),
    setUiDataSorting: (sorting) => dispatch(acSetUiDataSorting(sorting)),
    setCurrent: () => dispatch(tSetCurrentFromUi()),
})

export const Visualization = connect(
    mapStateToProps,
    mapDispatchToProps
)(UnconnectedVisualization)
