import debounce from 'lodash-es/debounce'
import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { acSetChart } from '../../actions/chart.js'
import { tSetCurrentFromUi } from '../../actions/current.js'
import { acSetPluginLoading } from '../../actions/loader.js'
import { acAddMetadata } from '../../actions/metadata.js'
import {
    acSetUiItems,
    acSetUiDataSorting,
    acAddParentGraphMap,
} from '../../actions/ui.js'
import { removeLastPathSegment } from '../../modules/orgUnit.js'
import { sGetCurrent } from '../../reducers/current.js'
import { sGetIsPluginLoading, sGetLoadError } from '../../reducers/loader.js'
import { sGetSettingsDisplayProperty } from '../../reducers/settings.js'
import { sGetUiRightSidebarOpen } from '../../reducers/ui.js'
import LoadingMask from '../../widgets/LoadingMask.js'
import { VisualizationErrorInfo } from '../VisualizationErrorInfo/VisualizationErrorInfo.js'
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

    onChartGenerated = (svg) => this.props.setChart(svg)

    onDataSorted = (sorting) => {
        this.props.onLoadingStart()

        this.props.setUiDataSorting(sorting)

        // simulate an update for refreshing the visualization
        this.props.setCurrent()
    }

    onResponsesReceived = (responses) => {
        const forMetadata = {}

        responses.forEach((response) => {
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

        if (error) {
            return <VisualizationErrorInfo error={error} />
        } else if (!visualization) {
            return <StartScreen />
        } else {
            return (
                <Fragment>
                    {isLoading && (
                        <div style={styles.loadingCover}>
                            <LoadingMask />
                        </div>
                    )}
                    <VisualizationPlugin
                        id={renderId}
                        visualization={visualization}
                        onChartGenerated={this.onChartGenerated}
                        onLoadingComplete={onLoadingComplete}
                        onDataSorted={this.onDataSorted}
                        onResponsesReceived={this.onResponsesReceived}
                        onDrill={this.onDrill}
                        style={styles.chartCanvas}
                        displayProperty={displayProperty}
                    />
                </Fragment>
            )
        }
    }
}

UnconnectedVisualization.propTypes = {
    addMetadata: PropTypes.func,
    addParentGraphMap: PropTypes.func,
    displayProperty: PropTypes.string,
    error: PropTypes.object,
    isLoading: PropTypes.bool,
    rightSidebarOpen: PropTypes.bool,
    setChart: PropTypes.func,
    setCurrent: PropTypes.func,
    setUiDataSorting: PropTypes.func,
    setUiItems: PropTypes.func,
    visualization: PropTypes.object,
    onLoadingComplete: PropTypes.func,
    onLoadingStart: PropTypes.func,
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
    setChart: (chart) => dispatch(acSetChart(chart)),
    setUiItems: (data) => dispatch(acSetUiItems(data)),
    setUiDataSorting: (sorting) => dispatch(acSetUiDataSorting(sorting)),
    setCurrent: () => dispatch(tSetCurrentFromUi()),
})

export const Visualization = connect(
    mapStateToProps,
    mapDispatchToProps
)(UnconnectedVisualization)
