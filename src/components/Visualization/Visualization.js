import { DIMENSION_ID_DATA, VIS_TYPE_PIVOT_TABLE } from '@dhis2/analytics'
import debounce from 'lodash-es/debounce'
import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { acSetChart } from '../../actions/chart.js'
import { tSetCurrentFromUi } from '../../actions/current.js'
import { acSetLoadError, acSetPluginLoading } from '../../actions/loader.js'
import { acAddMetadata } from '../../actions/metadata.js'
import { acSetUiItems, acAddParentGraphMap } from '../../actions/ui.js'
import {
    AssignedCategoriesDataElementsError,
    GenericServerError,
    EmptyResponseError,
    AssignedCategoriesAsFilterError,
    MultipleIndicatorAsFilterError,
    NoDataOrDataElementGroupSetError,
    CombinationDEGSRRError,
    NoOrgUnitResponseError,
    NoDataError,
    DataTypeError,
} from '../../modules/error.js'
import { removeLastPathSegment } from '../../modules/orgUnit.js'
import { sGetCurrent } from '../../reducers/current.js'
import { sGetLoadError, sGetIsPluginLoading } from '../../reducers/loader.js'
import { sGetSettingsDisplayNameProperty } from '../../reducers/settings.js'
import { sGetUiRightSidebarOpen } from '../../reducers/ui.js'
import LoadingMask from '../../widgets/LoadingMask.js'
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
                default:
                    error = response
            }
        } else {
            error = new GenericServerError()
        }

        this.props.setLoadError(error)
    }

    onChartGenerated = (svg) => this.props.setChart(svg)

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
                throw new DataTypeError()
            }

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

        if (
            !responses.some((response) => response.rows && response.rows.length)
        ) {
            throw new EmptyResponseError()
        }
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
            userSettings,
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
                    onResponsesReceived={this.onResponsesReceived}
                    onError={this.onError}
                    onDrill={this.onDrill}
                    style={styles.chartCanvas}
                    userSettings={userSettings}
                />
            </Fragment>
        )
    }
}

UnconnectedVisualization.propTypes = {
    addMetadata: PropTypes.func,
    addParentGraphMap: PropTypes.func,
    error: PropTypes.object,
    isLoading: PropTypes.bool,
    rightSidebarOpen: PropTypes.bool,
    setChart: PropTypes.func,
    setCurrent: PropTypes.func,
    setLoadError: PropTypes.func,
    setUiItems: PropTypes.func,
    userSettings: PropTypes.object,
    visualization: PropTypes.object,
    onLoadingComplete: PropTypes.func,
}

export const userSettingsSelector = createSelector(
    [sGetSettingsDisplayNameProperty],
    (displayProperty) => ({
        displayProperty,
    })
)

const mapStateToProps = (state) => ({
    visualization: sGetCurrent(state),
    rightSidebarOpen: sGetUiRightSidebarOpen(state),
    error: sGetLoadError(state),
    isLoading: sGetIsPluginLoading(state),
    userSettings: userSettingsSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
    onLoadingComplete: () => dispatch(acSetPluginLoading(false)),
    addMetadata: (metadata) => dispatch(acAddMetadata(metadata)),
    addParentGraphMap: (parentGraphMap) =>
        dispatch(acAddParentGraphMap(parentGraphMap)),
    setChart: (chart) => dispatch(acSetChart(chart)),
    setLoadError: (error) => dispatch(acSetLoadError(error)),
    setUiItems: (data) => dispatch(acSetUiItems(data)),
    setCurrent: () => dispatch(tSetCurrentFromUi()),
})

export const Visualization = connect(
    mapStateToProps,
    mapDispatchToProps
)(UnconnectedVisualization)
