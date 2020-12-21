import { isYearOverYear } from '@dhis2/analytics'
import {
    apiFetchAnalyticsForYearOverYear,
    apiFetchAnalytics,
} from '../api/analytics'
import { computeGenericPeriodNames } from './analytics'
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

        return {
            responses,
            extraOptions: {
                ...extraOptions,
                yearlySeries: yearlySeriesLabels,
                xAxisLabels: computeGenericPeriodNames(responses),
            },
        }
    }

    return {
        responses: await apiFetchAnalytics(dataEngine, visualization, options),
        extraOptions,
    }
}
