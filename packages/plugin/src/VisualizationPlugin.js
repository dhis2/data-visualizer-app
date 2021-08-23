import {
    VIS_TYPE_PIVOT_TABLE,
    apiFetchOrganisationUnitLevels,
    convertOuLevelsToUids,
    DIMENSION_ID_ORGUNIT,
    LegendKey,
    LEGEND_DISPLAY_STRATEGY_FIXED,
    LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
    isLegendSetType,
    VIS_TYPE_LINE,
} from '@dhis2/analytics'
import { useDataEngine } from '@dhis2/app-runtime'
import { Popper, Button, IconLegend24 } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { apiFetchLegendSets } from './api/legendSets'
import ChartPlugin from './ChartPlugin'
import ContextualMenu from './ContextualMenu'
import { fetchData } from './modules/fetchData'
import PivotPlugin from './PivotPlugin'
import styles from './styles/VisualizationPlugin.module.css'

export const VisualizationPlugin = ({
    visualization,
    filters,
    forDashboard,
    id,
    style,
    userSettings,
    onChartGenerated,
    onError,
    onLoadingComplete,
    onResponsesReceived,
    onDrill,
}) => {
    const engine = useDataEngine()
    const [ouLevels, setOuLevels] = useState(undefined)
    const [fetchResult, setFetchResult] = useState(null)
    const [contextualMenuRef, setContextualMenuRef] = useState(undefined)
    const [contextualMenuConfig, setContextualMenuConfig] = useState({})
    const [showLegendKey, setShowLegendKey] = useState(false)
    const [renderId, setRenderId] = useState(0)

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
                item =>
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
                column => column.dimension === DIMENSION_ID_ORGUNIT
            )
        ) {
            const ouId = Object.values(
                fetchResult.responses[0].metaData.items
            ).find(
                item =>
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

    const onContextualMenuItemClick = args => {
        closeContextualMenu()

        onDrill(args)
    }

    const doFetchData = useCallback(async () => {
        const result = await fetchData({
            dataEngine: engine,
            visualization,
            filters,
            forDashboard,
            userSettings,
        })

        if (result.responses.length) {
            onResponsesReceived(result.responses)
        }

        return result
    }, [
        engine,
        filters,
        forDashboard,
        userSettings,
        onResponsesReceived,
        visualization,
    ])

    const doFetchLegendSets = useCallback(
        async legendSetIds => {
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
        setFetchResult(null)

        const doFetchAll = async () => {
            const { responses, extraOptions } = await doFetchData(
                visualization,
                filters,
                forDashboard
            )

            const legendSetIds = []

            switch (visualization.legend?.strategy) {
                case LEGEND_DISPLAY_STRATEGY_FIXED:
                    if (visualization.legend?.set?.id) {
                        legendSetIds.push(visualization.legend.set.id)
                    }
                    break
                case LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM: {
                    // parse responses to extract legendSet ids from metaData
                    // multiple responses are only for YOY which does not support legends
                    // safe to use only the 1st
                    // dx dimensions might not be present, the empty array covers that case
                    const dxIds = responses[0].metaData.dimensions.dx || []

                    dxIds.forEach(dxId => {
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
                visualization,
                legendSets,
                responses,
                extraOptions,
            })
            setShowLegendKey(visualization.legend?.showKey)
            onLoadingComplete()
        }

        doFetchAll().catch(error => {
            onError(error)
        })

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [visualization, filters, forDashboard])

    if (!fetchResult || !ouLevels) {
        return null
    }

    const contextualMenuRect = contextualMenuRef?.getBoundingClientRect()

    const virtualContextualMenuElement = contextualMenuRect
        ? { getBoundingClientRect: () => contextualMenuRect }
        : null

    let legendSets = []
    switch (visualization.legend?.strategy) {
        case LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM:
            {
                if (
                    !fetchResult.visualization.columns.some(
                        item => item.dimension === 'dx'
                    )
                ) {
                    break
                }
                const legendSetItemMap = Object.values(
                    fetchResult.responses[0].metaData.items
                )
                    .filter(item =>
                        fetchResult.legendSets
                            .map(legendSet => legendSet.id)
                            .includes(item.legendSet)
                    )
                    .map(item => ({
                        itemId: item.uid,
                        legendSet: item.legendSet,
                    }))

                const unsupportedDimensions = visualization.series
                    ?.filter(serie => serie.type === VIS_TYPE_LINE)
                    .map(item => item.dimensionItem)

                legendSets = fetchResult.legendSets.filter(legendSet =>
                    legendSetItemMap
                        .filter(
                            item => !unsupportedDimensions.includes(item.itemId)
                        )
                        .map(supportedLegendSet => supportedLegendSet.legendSet)
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
    const transformedStyle =
        forDashboard && hasLegendSet
            ? {
                  ...style,
                  width: style.width - (showLegendKey ? 200 : 36),
                  // 200: width of legend key component with margin and scrollbar
                  // 36: width of the toggle button with margin
              }
            : style

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

    return (
        <>
            <div className={styles.container}>
                {!fetchResult.visualization.type ||
                fetchResult.visualization.type === VIS_TYPE_PIVOT_TABLE ? (
                    <PivotPlugin
                        visualization={convertOuLevelsToUids(
                            ouLevels,
                            fetchResult.visualization
                        )}
                        responses={fetchResult.responses}
                        legendSets={legendSets}
                        onToggleContextualMenu={
                            onDrill ? onToggleContextualMenu : undefined
                        }
                        id={id}
                        style={transformedStyle}
                    />
                ) : (
                    <ChartPlugin
                        visualization={convertOuLevelsToUids(
                            ouLevels,
                            fetchResult.visualization
                        )}
                        responses={fetchResult.responses}
                        extraOptions={fetchResult.extraOptions}
                        legendSets={legendSets}
                        onToggleContextualMenu={
                            onDrill ? onToggleContextualMenu : undefined
                        }
                        id={forDashboard ? renderId : id}
                        onChartGenerated={onChartGenerated}
                        style={transformedStyle}
                    />
                )}
            </div>
            {getLegendKey()}
            {contextualMenuRect &&
                createPortal(
                    <div
                        onClick={closeContextualMenu}
                        className={styles.backdrop}
                    >
                        <Popper
                            reference={virtualContextualMenuElement}
                            placement="right-start"
                        >
                            <ContextualMenu
                                config={contextualMenuConfig}
                                ouLevels={ouLevels}
                                onClick={onContextualMenuItemClick}
                            />
                        </Popper>
                    </div>,
                    document.body
                )}
        </>
    )
}

VisualizationPlugin.defaultProps = {
    filters: {},
    forDashboard: false,
    onChartGenerated: Function.prototype,
    onError: Function.prototype,
    onLoadingComplete: Function.prototype,
    onResponsesReceived: Function.prototype,
    style: {},
    visualization: {},
    userSettings: {},
}
VisualizationPlugin.propTypes = {
    visualization: PropTypes.object.isRequired,
    filters: PropTypes.object,
    forDashboard: PropTypes.bool,
    id: PropTypes.number,
    style: PropTypes.object,
    userSettings: PropTypes.object,
    onChartGenerated: PropTypes.func,
    onDrill: PropTypes.func,
    onError: PropTypes.func,
    onLoadingComplete: PropTypes.func,
    onResponsesReceived: PropTypes.func,
}
