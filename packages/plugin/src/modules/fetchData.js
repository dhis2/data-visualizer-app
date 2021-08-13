import {
    isYearOverYear,
    DIMENSION_ID_PERIOD,
    layoutGetDimensionItems,
    ALL_DYNAMIC_DIMENSION_ITEMS,
} from '@dhis2/analytics'
import {
    apiFetchAnalyticsForYearOverYear,
    apiFetchAnalytics,
} from '../api/analytics'
import {
    computeGenericPeriodNames,
    computeYoYMatrix,
    computeGenericPeriodNamesFromMatrix,
    getRelativePeriodTypeUsed,
} from './analytics'
import { getRequestOptions } from './getRequestOptions'

const removeItemAllFromAxisItems = axis =>
    (axis || []).map(ai => ({
        ...ai,
        items: ai?.items?.filter(
            item => item.id !== ALL_DYNAMIC_DIMENSION_ITEMS
        ),
    }))

export const fetchData = async ({
    dataEngine,
    visualization,
    filters,
    forDashboard,
    userSettings,
}) => {
    const adaptedVisualization = {
        ...visualization,
        columns: removeItemAllFromAxisItems(visualization.columns),
        rows: removeItemAllFromAxisItems(visualization.rows),
        filters: removeItemAllFromAxisItems(visualization.filters),
    }

    const options = getRequestOptions(
        adaptedVisualization,
        filters,
        userSettings
    )

    const extraOptions = {
        dashboard: forDashboard,
    }

    if (isYearOverYear(adaptedVisualization.type)) {
        const { responses, yearlySeriesLabels } =
            await apiFetchAnalyticsForYearOverYear(
                dataEngine,
                adaptedVisualization,
                options
            )

        const peItems = layoutGetDimensionItems(
            adaptedVisualization,
            DIMENSION_ID_PERIOD
        )

        const relativePeriodTypeUsed = getRelativePeriodTypeUsed(peItems)

        const periodKeyAxisIndexMatrix = computeYoYMatrix(
            responses,
            relativePeriodTypeUsed
        )
        const periodKeyAxisIndexMap = periodKeyAxisIndexMatrix.reduce(
            (map, periodKeys, index) => {
                periodKeys.forEach(periodKey => (map[periodKey] = index))

                return map
            },
            {}
        )

        const xAxisLabels = relativePeriodTypeUsed
            ? computeGenericPeriodNamesFromMatrix(
                  periodKeyAxisIndexMatrix,
                  relativePeriodTypeUsed
              )
            : computeGenericPeriodNames(responses)

        return {
            responses,
            extraOptions: {
                ...extraOptions,
                yearlySeries: yearlySeriesLabels,
                xAxisLabels,
                periodKeyAxisIndexMap,
            },
        }
    }

    return {
        responses: await apiFetchAnalytics(
            dataEngine,
            adaptedVisualization,
            options
        ),
        extraOptions,
    }
}
