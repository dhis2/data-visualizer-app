import i18n from '../locales'
import { isYearOverYear } from '@dhis2/analytics'
import {
    apiFetchAnalyticsForYearOverYear,
    apiFetchAnalytics,
} from '../api/analytics'
import { computeGenericPeriodNames } from './analytics'
import { getRequestOptions } from './getRequestOptions'

export const fetchData = async ({
    visualization,
    filters,
    d2,
    forDashboard,
}) => {
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

    return {
        responses: await apiFetchAnalytics(d2, visualization, options),
        extraOptions,
    }
}
