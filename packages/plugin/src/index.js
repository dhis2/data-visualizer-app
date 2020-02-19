import React, { useEffect, useState, useCallback } from 'react'
import { VIS_TYPE_PIVOT_TABLE, isYearOverYear } from '@dhis2/analytics'
import { useDataEngine } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'

import { apiFetchLegendSet } from './api/legendSets'
import ChartPlugin from './ChartPlugin'
import PivotPlugin from './PivotPlugin'
import { getOptionsForRequest } from './modules/options'
import {
    apiFetchAnalyticsForYearOverYear,
    apiFetchAnalytics,
} from './api/analytics'
import { computeGenericPeriodNames } from './modules/analytics'

import i18n from '@dhis2/d2-i18n'

const getRequestOptions = (visualization, filters) => {
    const options = getOptionsForRequest().reduce((map, [option, props]) => {
        // only add parameter if value !== default
        if (
            visualization[option] !== undefined &&
            visualization[option] !== props.defaultValue
        ) {
            map[option] = visualization[option]
        }

        return map
    }, {})

    // interpretation filter
    if (filters.relativePeriodDate) {
        options.relativePeriodDate = filters.relativePeriodDate
    }

    // global filters
    // userOrgUnit
    if (filters.userOrgUnit && filters.userOrgUnit.length) {
        const ouIds = filters.userOrgUnit.map(
            ouPath => ouPath.split('/').slice(-1)[0]
        )

        options.userOrgUnit = ouIds.join(';')
    }

    return options
}

const fetchData = async ({ visualization, filters, d2, forDashboard }) => {
    const options = getRequestOptions(visualization, filters)

    const extraOptions = {
        dashboard: forDashboard,
        noData: { text: i18n.t('No data') },
    }

    if (isYearOverYear(visualization.type)) {
        const {
            responses,
            yearlySeriesLabels,
        } = await apiFetchAnalyticsForYearOverYear(d2, visualization, options)

        return {
            responses,
            extraOptions: {
                ...extraOptions,
                yearlySeries: yearlySeriesLabels,
                xAxisLabels: computeGenericPeriodNames(responses),
            },
        }
    }

    const responses = await apiFetchAnalytics(d2, visualization, options)

    return {
        responses,
        extraOptions,
    }
}

const VisualizationPlugin = ({
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

    const doFetchLegendSets = useCallback(async () => {
        if (!visualization.legendSet || !visualization.legendSet.id) {
            return []
        }

        const response = await apiFetchLegendSet(
            engine,
            visualization.legendSet.id
        )

        if (response && response.legendSet) {
            return [response.legendSet]
        }
    }, [engine, visualization.legendSet])

    useEffect(() => {
        setFetchResult(null)
        const doFetchAll = async () => {
            const { responses, extraOptions } = await doFetchData(
                visualization,
                filters,
                forDashboard
            )
            const legendSets = await doFetchLegendSets()

            setFetchResult({
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

    if (!visualization.type || visualization.type === VIS_TYPE_PIVOT_TABLE) {
        return (
            <PivotPlugin
                visualization={visualization}
                responses={fetchResult.responses}
                legendSets={fetchResult.legendSets}
                {...props}
            />
        )
    } else {
        return (
            <ChartPlugin
                visualization={visualization}
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

export default VisualizationPlugin
