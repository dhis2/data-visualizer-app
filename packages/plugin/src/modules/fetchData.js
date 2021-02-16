import {
    isYearOverYear,
    DIMENSION_ID_PERIOD,
    layoutGetDimensionItems,
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

export const fetchData = async ({
    dataEngine,
    visualization,
    filters,
    forDashboard,
}) => {
    const options = getRequestOptions(visualization, filters)

    const extraOptions = {
        dashboard: forDashboard,
    }

    if (isYearOverYear(visualization.type)) {
        const {
            responses,
            yearlySeriesLabels,
        } = await apiFetchAnalyticsForYearOverYear(
            dataEngine,
            visualization,
            options
        )

        const peItems = layoutGetDimensionItems(
            visualization,
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
        responses: await apiFetchAnalytics(dataEngine, visualization, options),
        extraOptions,
    }
}
