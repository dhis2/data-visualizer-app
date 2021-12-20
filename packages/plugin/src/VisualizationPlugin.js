import React, { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

import { useDataEngine } from '@dhis2/app-runtime'
import { Popper } from '@dhis2/ui'
import { VIS_TYPE_PIVOT_TABLE, convertOuLevelsToUids } from '@dhis2/analytics'

import { apiFetchLegendSets } from './api/legendSets'
import { apiFetchOrganisationUnitLevels } from './api/organisationUnits'
import ContextualMenu from './ContextualMenu'
import ChartPlugin from './ChartPlugin'
import PivotPlugin from './PivotPlugin'
import { fetchData } from './modules/fetchData'

import styles from './styles/VisualizationPlugin.style.js'

const LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM = 'BY_DATA_ITEM'
const LEGEND_DISPLAY_STRATEGY_FIXED = 'FIXED'

export const VisualizationPlugin = ({
    d2,
    visualization,
    filters,
    forDashboard,
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
        setContextualMenuRef(ref)
        setContextualMenuConfig(data)
    }

    const closeContextualMenu = () => setContextualMenuRef(undefined)

    const onContextualMenuItemClick = args => {
        closeContextualMenu()

        onDrill(args)
    }

    const doFetchData = useCallback(async () => {
        const result = await fetchData({
            visualization,
            filters,
            d2,
            forDashboard,
        })

        if (result.responses.length) {
            onResponsesReceived(result.responses)
        }

        return result
    }, [d2, filters, forDashboard, onResponsesReceived, visualization])

    const doFetchLegendSets = useCallback(
        async legendSetIds => {
            if (!legendSetIds.length) {
                return []
            }

            const response = await apiFetchLegendSets(engine, legendSetIds)

            if (response && response.legendSets) {
                return response.legendSets.legendSets
            }
        },
        [engine]
    )

    useEffect(() => {
        const doFetchOuLevels = async () => {
            const ouLevelsData = await apiFetchOrganisationUnitLevels(engine)

            setOuLevels(ouLevelsData.orgUnitLevels.organisationUnitLevels)
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

    const contextualMenuRect =
        contextualMenuRef &&
        contextualMenuRef.current &&
        contextualMenuRef.current.getBoundingClientRect()

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
                    {...props}
                />
            )}
            {contextualMenuRect &&
                createPortal(
                    <div onClick={closeContextualMenu} style={styles.backdrop}>
                        <Popper
                            reference={virtualContextualMenuElement}
                            placement="right"
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
}
VisualizationPlugin.propTypes = {
    d2: PropTypes.object.isRequired,
    visualization: PropTypes.object.isRequired,
    filters: PropTypes.object,
    forDashboard: PropTypes.bool,
    onDrill: PropTypes.func,
    onError: PropTypes.func,
    onLoadingComplete: PropTypes.func,
    onResponsesReceived: PropTypes.func,
}
