import {
    isYearOverYear,
    getRelativePeriodsOptionsById,
    WEEKS,
    DAYS,
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
        const usesRelativeWeeksPeriod = getRelativePeriodsOptionsById(WEEKS)
            .getPeriods()
            .find(p => p.id === peItems[0].id)
        const usesRelativeDaysPeriod = getRelativePeriodsOptionsById(DAYS)
            .getPeriods()
            .find(p => p.id === peItems[0].id)

        const periodKeyAxisIndexMatrix = computeYoYMatrix(
            responses,
            usesRelativeWeeksPeriod,
            usesRelativeDaysPeriod
        )
        const periodKeyAxisIndexMap = periodKeyAxisIndexMatrix.reduce(
            (map, periodKeys, index) => {
                periodKeys.forEach(periodKey => (map[periodKey] = index))

                return map
            },
            {}
        )
        console.log('periodKeyAxisIndexMap', periodKeyAxisIndexMap)

        const xAxisLabels =
            usesRelativeWeeksPeriod || usesRelativeDaysPeriod
                ? computeGenericPeriodNamesFromMatrix(
                      periodKeyAxisIndexMatrix,
                      usesRelativeWeeksPeriod,
                      usesRelativeDaysPeriod
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
