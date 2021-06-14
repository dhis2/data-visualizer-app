import {
    VIS_TYPE_PIVOT_TABLE,
    apiFetchOrganisationUnitLevels,
    convertOuLevelsToUids,
    DIMENSION_ID_ORGUNIT,
} from '@dhis2/analytics'
import { useDataEngine } from '@dhis2/app-runtime'
import { Popper } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { apiFetchLegendSets } from './api/legendSets'
import ChartPlugin from './ChartPlugin'
import ContextualMenu from './ContextualMenu'
import { fetchData } from './modules/fetchData'
import PivotPlugin from './PivotPlugin'
import styles from './styles/VisualizationPlugin.style.js'

const LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM = 'BY_DATA_ITEM'
const LEGEND_DISPLAY_STRATEGY_FIXED = 'FIXED'

export const VisualizationPlugin = ({
    visualization,
    filters,
    forDashboard,
    userSettings,
    onError,
    onLoadingComplete,
    onResponsesReceived,
    onDrill,
    ...props
}) => {
    const engine = useDataEngine()
    const [ouLevels, setOuLevels] = useState(undefined)
    const [fetchResult, setFetchResult] = useState(null)
    const [contextualMenuRef, setContextualMenuRef] = useState(undefined)
    const [contextualMenuConfig, setContextualMenuConfig] = useState({})

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

            switch (visualization.legendDisplayStrategy) {
                case LEGEND_DISPLAY_STRATEGY_FIXED:
                    if (visualization.legendSet && visualization.legendSet.id) {
                        legendSetIds.push(visualization.legendSet.id)
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

    return (
        <>
            {!fetchResult.visualization.type ||
            fetchResult.visualization.type === VIS_TYPE_PIVOT_TABLE ? (
                <PivotPlugin
                    visualization={convertOuLevelsToUids(
                        ouLevels,
                        fetchResult.visualization
                    )}
                    responses={fetchResult.responses}
                    legendSets={fetchResult.legendSets}
                    onToggleContextualMenu={
                        onDrill ? onToggleContextualMenu : undefined
                    }
                    {...props}
                />
            ) : (
                <ChartPlugin
                    visualization={convertOuLevelsToUids(
                        ouLevels,
                        fetchResult.visualization
                    )}
                    responses={fetchResult.responses}
                    extraOptions={fetchResult.extraOptions}
                    legendSets={fetchResult.legendSets}
                    onToggleContextualMenu={
                        onDrill ? onToggleContextualMenu : undefined
                    }
                    {...props}
                />
            )}
            {contextualMenuRect &&
                createPortal(
                    <div onClick={closeContextualMenu} style={styles.backdrop}>
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
    onError: Function.prototype,
    onLoadingComplete: Function.prototype,
    onResponsesReceived: Function.prototype,
    visualization: {},
    userSettings: {},
}
VisualizationPlugin.propTypes = {
    visualization: PropTypes.object.isRequired,
    filters: PropTypes.object,
    forDashboard: PropTypes.bool,
    userSettings: PropTypes.object,
    onDrill: PropTypes.func,
    onError: PropTypes.func,
    onLoadingComplete: PropTypes.func,
    onResponsesReceived: PropTypes.func,
}
