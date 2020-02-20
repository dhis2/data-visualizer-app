import React, { useEffect, useState, useCallback } from 'react'
import { VIS_TYPE_PIVOT_TABLE } from '@dhis2/analytics'
import { useDataEngine } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'

import { apiFetchLegendSets } from './api/legendSets'
import ChartPlugin from './ChartPlugin'
import PivotPlugin from './PivotPlugin'
import { fetchData } from './modules/fetchData'

const LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM = 'BY_DATA_ITEM'

export const VisualizationPlugin = ({
    d2,
    visualization,
    filters,
    forDashboard,
    onError,
    onLoadingComplete,
    onResponsesReceived,
    ...props
}) => {
    const engine = useDataEngine()
    const [fetchResult, setFetchResult] = useState(null)

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
        setFetchResult(null)
        const doFetchAll = async () => {
            const { responses, extraOptions } = await doFetchData(
                visualization,
                filters,
                forDashboard
            )

            const legendSetIds = []

            if (
                visualization.legendDisplayStrategy ===
                LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM
            ) {
                // parse responses to extract legendSet ids from metaData
                // multiple responses are only for YOY which does not support legends
                // safe to use only the 1st
                const dxIds = responses[0].metaData.dimensions.dx

                dxIds.forEach(dxId => {
                    const legendSetId =
                        responses[0].metaData.items[dxId].legendSet

                    if (legendSetId) {
                        legendSetIds.push(legendSetId)
                    }
                })
            } else if (visualization.legendSet && visualization.legendSet.id) {
                legendSetIds.push(visualization.legendSet.id)
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

    if (!fetchResult) {
        return null
    }

    if (
        !fetchResult.visualization.type ||
        fetchResult.visualization.type === VIS_TYPE_PIVOT_TABLE
    ) {
        return (
            <PivotPlugin
                visualization={fetchResult.visualization}
                responses={fetchResult.responses}
                legendSets={fetchResult.legendSets}
                {...props}
            />
        )
    } else {
        return (
            <ChartPlugin
                visualization={fetchResult.visualization}
                responses={fetchResult.responses}
                extraOptions={fetchResult.extraOptions}
                legendSets={fetchResult.legendSets}
                {...props}
            />
        )
    }
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
    onError: PropTypes.func,
    onLoadingComplete: PropTypes.func,
    onResponsesReceived: PropTypes.func,
}
