import {
    VIS_TYPE_OUTLIER_TABLE,
    VIS_TYPE_PIVOT_TABLE,
    apiFetchOrganisationUnitLevels,
    convertOuLevelsToUids,
    DIMENSION_ID_ORGUNIT,
    LegendKey,
    LEGEND_DISPLAY_STRATEGY_FIXED,
    LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
    isLegendSetType,
    VIS_TYPE_LINE,
    DIMENSION_ID_DATA,
    layoutGetDimensionItems,
    USER_ORG_UNIT,
    USER_ORG_UNIT_CHILDREN,
    USER_ORG_UNIT_GRANDCHILDREN,
} from '@dhis2/analytics'
import { useDataEngine } from '@dhis2/app-runtime'
import { Button, IconLegend24, Layer } from '@dhis2/ui'
import cx from 'classnames'
import cloneDeep from 'lodash-es/cloneDeep'
import PropTypes from 'prop-types'
import React, { useEffect, useState, useCallback } from 'react'
import { apiFetchLegendSets } from '../../api/legendSets.js'
import { ensureAnalyticsResponsesContainData } from '../../modules/analytics.js'
import { getDisabledOptions } from '../../modules/disabledOptions.js'
import {
    AssignedCategoriesDataElementsError,
    GenericServerError,
    AssignedCategoriesAsFilterError,
    MultipleIndicatorAsFilterError,
    NoDataOrDataElementGroupSetError,
    CombinationDEGSRRError,
    NoOrgUnitResponseError,
    NoOrgUnitAccessError,
    NoDataError,
    AnalyticsGenerationError,
    AnalyticsRequestError,
    ValueTypeError,
} from '../../modules/error.js'
import { fetchData } from '../../modules/fetchData.js'
import getDefaultMetadata from '../../modules/metadata.js'
import { getOptionsFromVisualization } from '../../modules/options.js'
import { VisualizationErrorInfo } from '../VisualizationErrorInfo/VisualizationErrorInfo.jsx'
import ChartPlugin from './ChartPlugin.jsx'
import ContextualMenu from './ContextualMenu.jsx'
import OutlierTablePlugin from './OutlierTablePlugin.jsx'
import PivotPlugin from './PivotPlugin.jsx'
import styles from './styles/VisualizationPlugin.module.css'

export const VisualizationPlugin = ({
    visualization: originalVisualization,
    displayProperty,
    filters,
    forDashboard,
    id,
    isInModal,
    style,
    onChartGenerated,
    onLoadingComplete,
    onDataSorted,
    onResponsesReceived,
    onDrill,
}) => {
    const engine = useDataEngine()
    const [error, setError] = useState(null)
    const [visualization, setVisualization] = useState(null)
    const [ouLevels, setOuLevels] = useState(undefined)
    const [fetchResult, setFetchResult] = useState(null)
    const [contextualMenuRef, setContextualMenuRef] = useState(undefined)
    const [contextualMenuConfig, setContextualMenuConfig] = useState({})
    const [showLegendKey, setShowLegendKey] = useState(false)
    const [renderId, setRenderId] = useState(id)
    const [size, setSize] = useState({ width: 0, height: 0 })

    const containerCallbackRef = useCallback((node) => {
        if (
            node === null ||
            // This avoids a state update when closing the intepretations modal
            (node.clientWidth === 0 && node.clientHeight === 0)
        ) {
            return
        }

        const adjustSize = () =>
            setSize({
                width: node.clientWidth,
                height: node.clientHeight,
            })

        const sizeObserver = new window.ResizeObserver(adjustSize)
        sizeObserver.observe(node)

        adjustSize()

        return sizeObserver.disconnect
    }, [])

    useEffect(() => setRenderId(id), [id])

    const incremementRenderId = () => setRenderId(renderId + 1)

    const onToggleContextualMenu = (ref, data) => {
        if (data.ouId) {
            setContextualMenuConfig(data)
            setContextualMenuRef(ref)
        } else if (
            data.category &&
            ((visualization.rows.length === 1 &&
                visualization.rows[0].dimension === DIMENSION_ID_ORGUNIT) ||
                (visualization.rows.length === 2 &&
                    visualization.rows[1].dimension === DIMENSION_ID_ORGUNIT))
        ) {
            const ouId = Object.values(
                fetchResult.responses[0].metaData.items
            ).find(
                (item) =>
                    item.name === data.category &&
                    fetchResult.responses[0].metaData.dimensions[
                        DIMENSION_ID_ORGUNIT
                    ].includes(item.uid)
            )?.uid
            setContextualMenuConfig({ ouId })
            setContextualMenuRef(ref)
        } else if (
            data.category &&
            visualization.columns.some(
                (column) => column.dimension === DIMENSION_ID_ORGUNIT
            )
        ) {
            const ouId = Object.values(
                fetchResult.responses[0].metaData.items
            ).find(
                (item) =>
                    item.name === data.series &&
                    fetchResult.responses[0].metaData.dimensions[
                        DIMENSION_ID_ORGUNIT
                    ].includes(item.uid)
            )?.uid
            setContextualMenuConfig({ ouId })
            setContextualMenuRef(ref)
        }
    }

    const closeContextualMenu = () => setContextualMenuRef(undefined)

    const onContextualMenuItemClick = (args) => {
        closeContextualMenu()

        onDrill(args)
    }

    const formatError = ({ error: responseError, visType }) => {
        let error
        if (responseError) {
            switch (responseError.details?.errorCode) {
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
                    error = new NoDataOrDataElementGroupSetError(visType)
                    break
                case 'E7112':
                    error = new CombinationDEGSRRError()
                    break
                case 'E7120':
                    error = new NoOrgUnitAccessError()
                    break
                case 'E7124':
                    if (responseError.message?.includes('`dx`')) {
                        error = new NoDataError(visType)
                    } else if (responseError.message?.includes('`ou`')) {
                        error = new NoOrgUnitResponseError()
                    } else {
                        error = new GenericServerError()
                    }
                    break
                case 'E7144':
                    error = new AnalyticsGenerationError()
                    break
                case 'E7145':
                    error = new AnalyticsRequestError()
                    break
                case 'E2200':
                    error = new NoDataError(visType)
                    break
                default:
                    error = responseError
            }
        } else {
            error = new GenericServerError()
        }

        return error
    }

    const doFetchData = useCallback(
        async (visualization, filters, forDashboard) => {
            const result = await fetchData({
                dataEngine: engine,
                visualization,
                filters,
                forDashboard,
                displayProperty,
            })

            if (result.responses.length) {
                try {
                    ensureAnalyticsResponsesContainData(
                        result.responses,
                        visualization.type
                    )

                    result.responses.forEach((response) => {
                        if (
                            response?.metaData?.dimensions?.[
                                DIMENSION_ID_DATA
                            ]?.every(
                                (dim) =>
                                    response.metaData.items[dim]?.valueType ===
                                    'TEXT'
                            ) &&
                            visualization.type !== VIS_TYPE_PIVOT_TABLE
                        ) {
                            throw new ValueTypeError()
                        }
                    })
                } catch (error) {
                    setError(error)
                }

                onResponsesReceived(result.responses)
            }

            return result
        },
        [engine, displayProperty, onResponsesReceived]
    )

    const doFetchLegendSets = useCallback(
        async (legendSetIds) => {
            if (!legendSetIds.length) {
                return []
            }

            const legendSets = await apiFetchLegendSets(engine, legendSetIds)

            return legendSets
        },
        [engine]
    )

    useEffect(() => {
        const doFetchOuLevels = async () => {
            const ouLevels = await apiFetchOrganisationUnitLevels(engine)

            setOuLevels(ouLevels)
        }

        doFetchOuLevels()
    }, [engine])

    useEffect(() => {
        setError(null)
        setFetchResult(null)
        setVisualization(null)

        // filter out disabled options
        const disabledOptions = getDisabledOptions({
            visType: originalVisualization.type,
            options: getOptionsFromVisualization(originalVisualization),
        })

        const filteredVisualization = cloneDeep(originalVisualization)

        // inject translated user orgunit names
        const ouItems = layoutGetDimensionItems(
            filteredVisualization,
            DIMENSION_ID_ORGUNIT
        )

        if (ouItems.length) {
            const defaultMetaData = getDefaultMetadata()
            const userOuIds = [
                USER_ORG_UNIT,
                USER_ORG_UNIT_CHILDREN,
                USER_ORG_UNIT_GRANDCHILDREN,
            ]

            ouItems.forEach((ouItem) => {
                userOuIds.forEach((userOuId) => {
                    if (ouItem.id === userOuId) {
                        ouItem.name = defaultMetaData[userOuId].name
                    }
                })
            })
        }

        Object.keys(disabledOptions).forEach(
            (option) => delete filteredVisualization[option]
        )

        const doFetchAll = async () => {
            const { responses, extraOptions } = await doFetchData(
                filteredVisualization,
                filters,
                forDashboard
            )

            // parse responses to extract dx ids from metaData
            // multiple responses are only for YOY which does not support legends or custom icon
            // safe to use only the 1st
            // dx dimensions might not be present, the empty array covers that case
            const dxIds = responses[0].metaData.dimensions?.dx || []

            // DHIS2-10496: show icon on the side of the single value if an icon is assigned in Maintenance app and
            // the "Show data item icon" option is set in DV options
            if (
                Boolean(filteredVisualization.icons?.length) &&
                dxIds[0] &&
                responses[0].metaData.items[dxIds[0]]?.style?.icon
            ) {
                const originalIcon = await fetch(
                    responses[0].metaData.items[dxIds[0]].style.icon,
                    { method: 'GET', credentials: 'include' }
                ).then((dxIconResponse) => {
                    if (dxIconResponse.status !== 200) {
                        return '<svg></svg>'
                    } else {
                        return dxIconResponse.text()
                    }
                })

                // This allows for color override of the icon using the parent color
                // needed when a legend color or contrast color is applied
                const adaptedIcon = originalIcon.replaceAll(
                    '#333333',
                    'currentColor'
                )

                extraOptions.icon = adaptedIcon
            }

            const legendSetIds = []

            switch (filteredVisualization.legend?.strategy) {
                case LEGEND_DISPLAY_STRATEGY_FIXED:
                    if (filteredVisualization.legend?.set?.id) {
                        legendSetIds.push(filteredVisualization.legend.set.id)
                    }
                    break
                case LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM: {
                    dxIds.forEach((dxId) => {
                        const legendSetId =
                            responses[0].metaData.items[dxId].legendSet

                        if (legendSetId) {
                            legendSetIds.push(legendSetId)
                        }
                    })

                    break
                }
            }

            const legendSets = await doFetchLegendSets(legendSetIds)

            setFetchResult({
                visualization: filteredVisualization,
                legendSets,
                responses,
                extraOptions,
            })
            setShowLegendKey(filteredVisualization.legend?.showKey)
        }

        doFetchAll()
            .catch((error) => setError(error))
            // since errors are rendered here, always call loading complete
            .finally(() => onLoadingComplete())

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [originalVisualization, filters, forDashboard])

    useEffect(() => {
        if (fetchResult?.visualization && ouLevels) {
            setVisualization(
                convertOuLevelsToUids(ouLevels, fetchResult.visualization)
            )
        }
    }, [fetchResult?.visualization, ouLevels])

    // render error within the plugin so it's used in both app and plugin consumers (ie. dashboard)
    if (error) {
        return (
            <VisualizationErrorInfo
                error={formatError({
                    error,
                    visType: originalVisualization.type,
                })}
            />
        )
    }

    if (!fetchResult || !visualization || !ouLevels) {
        return null
    }

    const contextualMenuRect = contextualMenuRef?.getBoundingClientRect()

    const virtualContextualMenuElement = contextualMenuRect
        ? { getBoundingClientRect: () => contextualMenuRect }
        : null

    let legendSets = []
    switch (fetchResult.visualization.legend?.strategy) {
        case LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM:
            {
                if (
                    fetchResult.visualization.type !== VIS_TYPE_PIVOT_TABLE &&
                    !fetchResult.visualization.columns.some(
                        (item) => item.dimension === DIMENSION_ID_DATA
                    )
                ) {
                    break
                }
                const legendSetItemMap = Object.values(
                    fetchResult.responses[0].metaData.items
                )
                    .filter((item) =>
                        fetchResult.legendSets
                            .map((legendSet) => legendSet.id)
                            .includes(item.legendSet)
                    )
                    .map((item) => ({
                        itemId: item.uid,
                        legendSet: item.legendSet,
                    }))

                const unsupportedDimensions = (
                    fetchResult.visualization.series || []
                )
                    .filter((serie) => serie.type === VIS_TYPE_LINE)
                    .map((item) => item.dimensionItem)

                legendSets = fetchResult.legendSets.filter((legendSet) =>
                    legendSetItemMap
                        .filter(
                            (item) =>
                                !unsupportedDimensions.includes(item.itemId)
                        )
                        .map(
                            (supportedLegendSet) => supportedLegendSet.legendSet
                        )
                        .includes(legendSet.id)
                )
            }
            break
        case LEGEND_DISPLAY_STRATEGY_FIXED:
            legendSets = fetchResult.legendSets
            break
    }
    const hasLegendSet =
        legendSets?.length > 0 &&
        isLegendSetType(fetchResult.visualization.type)

    let transformedStyle = style
    if (forDashboard && hasLegendSet) {
        transformedStyle = {
            ...style,
            width: style.width || size.width - (showLegendKey ? 200 : 36),
            // 200: width of legend key component with margin and scrollbar
            // 36: width of the toggle button with margin
        }
    } else if (isInModal) {
        transformedStyle = {
            ...style,
            width: style.width || size.width,
            height: style.height || size.height,
        }
    }

    // force wdth and height when no value available otherwise the PivotTable container sets 0 as height hiding the table content
    // and Highcharts does not render correctly the chart/legend
    if (!transformedStyle.height) {
        transformedStyle.height = size.height || '100%'
    }

    if (!transformedStyle.width) {
        transformedStyle.width = size.width || '100%'
    }

    const getLegendKey = () => {
        if (hasLegendSet && forDashboard) {
            return (
                <>
                    {showLegendKey && (
                        <div
                            className={styles.legendKey}
                            data-test="visualization-legend-key"
                        >
                            <div
                                className={cx(
                                    styles.wrapper,
                                    styles.buttonMargin
                                )}
                            >
                                <LegendKey legendSets={legendSets} />
                            </div>
                        </div>
                    )}
                    <div className={styles.legendKeyToggle}>
                        <Button
                            small
                            secondary
                            onClick={() => {
                                setShowLegendKey(!showLegendKey)
                                incremementRenderId()
                            }}
                            icon={<IconLegend24 />}
                            toggled={showLegendKey}
                        />
                    </div>
                </>
            )
        } else if (hasLegendSet && fetchResult.visualization.legend?.showKey) {
            return (
                <div
                    className={styles.legendKey}
                    data-test="visualization-legend-key"
                >
                    <div className={styles.wrapper}>
                        <LegendKey legendSets={legendSets} />
                    </div>
                </div>
            )
        }
    }

    const renderPlugin = () => {
        if (
            !fetchResult.visualization.type ||
            fetchResult.visualization.type === VIS_TYPE_PIVOT_TABLE
        ) {
            return (
                <PivotPlugin
                    visualization={visualization}
                    responses={fetchResult.responses}
                    legendSets={legendSets}
                    onToggleContextualMenu={
                        onDrill ? onToggleContextualMenu : undefined
                    }
                    id={id}
                    style={transformedStyle}
                />
            )
        } else if (fetchResult.visualization.type === VIS_TYPE_OUTLIER_TABLE) {
            return (
                <OutlierTablePlugin
                    visualization={visualization}
                    responses={fetchResult.responses}
                    filters={filters}
                    id={id}
                    style={transformedStyle}
                    onDataSorted={onDataSorted}
                />
            )
        } else {
            return (
                <ChartPlugin
                    visualization={visualization}
                    responses={fetchResult.responses}
                    extraOptions={fetchResult.extraOptions}
                    legendSets={legendSets}
                    onToggleContextualMenu={
                        onDrill ? onToggleContextualMenu : undefined
                    }
                    id={forDashboard ? renderId : id}
                    onChartGenerated={onChartGenerated}
                />
            )
        }
    }

    return (
        <div
            className={cx(styles.container, {
                [styles.modal]: isInModal,
            })}
            ref={containerCallbackRef}
        >
            <div className={styles.chartWrapper}>{renderPlugin()}</div>
            {getLegendKey()}
            {contextualMenuRect && (
                <Layer
                    onClick={closeContextualMenu}
                    dataTest={'visualization-drill-down-backdrop'}
                >
                    <ContextualMenu
                        reference={virtualContextualMenuElement}
                        config={contextualMenuConfig}
                        ouLevels={ouLevels}
                        onClick={onContextualMenuItemClick}
                        dataTest={'visualization-drill-down-menu'}
                    />
                </Layer>
            )}
        </div>
    )
}

VisualizationPlugin.defaultProps = {
    displayProperty: 'name',
    filters: {},
    forDashboard: false,
    onChartGenerated: Function.prototype,
    onLoadingComplete: Function.prototype,
    onDataSorted: Function.prototype,
    onResponsesReceived: Function.prototype,
    style: {},
    visualization: {},
}
VisualizationPlugin.propTypes = {
    displayProperty: PropTypes.string.isRequired,
    visualization: PropTypes.object.isRequired,
    filters: PropTypes.object,
    forDashboard: PropTypes.bool,
    id: PropTypes.number,
    isInModal: PropTypes.bool,
    style: PropTypes.object,
    onChartGenerated: PropTypes.func,
    onDataSorted: PropTypes.func,
    onDrill: PropTypes.func,
    onLoadingComplete: PropTypes.func,
    onResponsesReceived: PropTypes.func,
}
