import {
    Analytics,
    VIS_TYPE_PIVOT_TABLE,
    layoutGetDimensionItems,
    DIMENSION_ID_PERIOD,
    WEEKS,
} from '@dhis2/analytics'

import { getRelativePeriodTypeUsed } from '../modules/analytics'

const peId = DIMENSION_ID_PERIOD

export const apiFetchAnalytics = async (dataEngine, visualization, options) => {
    const analyticsEngine = Analytics.getAnalytics(dataEngine)

    const req = new analyticsEngine.request()
        .fromVisualization(visualization)
        .withParameters(options)
        .withIncludeNumDen(visualization.type === VIS_TYPE_PIVOT_TABLE)

    const rawResponse = await analyticsEngine.aggregate.get(req)

    return [new analyticsEngine.response(rawResponse)]
}

export const apiFetchAnalyticsForYearOverYear = async (
    dataEngine,
    visualization,
    options
) => {
    const analyticsEngine = Analytics.getAnalytics(dataEngine)

    let yearlySeriesReq = new analyticsEngine.request()
        .addPeriodDimension(visualization.yearlySeries)
        .withSkipData(true)
        .withSkipMeta(false)
        .withIncludeMetadataDetails(true)

    if (options.relativePeriodDate) {
        yearlySeriesReq = yearlySeriesReq.withRelativePeriodDate(
            options.relativePeriodDate
        )
    }

    const yearlySeriesRes = await analyticsEngine.aggregate.fetch(
        yearlySeriesReq
    )

    const periodDates = []
    const yearlySeriesLabels = []

    const now = new Date()
    const currentDay = ('' + now.getDate()).padStart(2, 0)
    const currentMonth = ('' + (now.getMonth() + 1)).padStart(2, 0)

    const peItems = layoutGetDimensionItems(visualization, peId)
    console.log('pe items', peItems)

    // relative week period in use
    if (getRelativePeriodTypeUsed(peItems) === WEEKS) {
        console.log('relative weeks period in use')
        const relativeWeeksData = await prepareRequestsForRelativeWeeks({
            analyticsEngine,
            visualization,
            options,
            yearlySeriesRes,
            currentMonth,
            currentDay,
        })

        periodDates.push(...relativeWeeksData.periodDates)
        yearlySeriesLabels.push(...relativeWeeksData.yearlySeriesLabels)
        // TODO
        // relative day period in use
        // similar to the above to handle the Feb 29 extra day
    } else {
        yearlySeriesRes.metaData.dimensions[peId]
            .sort()
            .reverse()
            .forEach(year => {
                yearlySeriesLabels.push(
                    yearlySeriesRes.metaData.items[year].name
                )

                periodDates.push(`${year}-${currentMonth}-${currentDay}`)
            })
    }

    console.log('periodDates', periodDates)

    // request analytics data/metaData for each year in the serie with its own specific relativePeriodDate
    const requests = periodDates.reduce((list, periodDate) => {
        const req = new analyticsEngine.request()
            .fromVisualization(visualization)
            .withParameters(options)
            .withRelativePeriodDate(periodDate)

        list.push(analyticsEngine.aggregate.get(req))

        return list
    }, [])

    return Promise.all(requests).then(responses => ({
        responses: responses.map(res => new analyticsEngine.response(res)),
        yearlySeriesLabels,
    }))
}

// special handling for when a relative weeks period is selected as category
// this takes care of data alignment issues between different years when one of the years have 53 weeks
// and more in general when the returned weeks for different years are not exactly the same range
// and data points must be "shifted" in the right position
// See https://jira.dhis2.org/browse/DHIS2-9729
const prepareRequestsForRelativeWeeks = async ({
    analyticsEngine,
    visualization,
    options,
    yearlySeriesRes,
    currentMonth,
    currentDay,
}) => {
    const yearlySeriesLabels = []
    const periodDates = []

    const yearlySeriesIds = yearlySeriesRes.metaData.dimensions[peId]
        .slice()
        .sort()
        .reverse()

    // 1. request metadata of last year of the serie (with relativePeriodDate === today)
    // 2. extract the last week number of the LAST_x_WEEKS period
    // 3. request metadata for the same week number for each one of the other years of the serie
    // 3. compute relativePeriodDate for each other year of the serie:
    //    this is done by adding 1 day to the endDate of the week period obtained above
    // 4. request analytics data/metaData for each year in the serie with its own specific relativePeriodDate
    const referencePeriodYear = yearlySeriesIds.shift()
    console.log('ref period year', referencePeriodYear)

    yearlySeriesLabels.push(
        yearlySeriesRes.metaData.items[referencePeriodYear].name
    )

    periodDates.push(`${referencePeriodYear}-${currentMonth}-${currentDay}`)

    // 1. request metadata of last year of the serie (with relativePeriodDate === today)
    const referencePeriodReq = new analyticsEngine.request()
        .fromVisualization(visualization)
        .withParameters(options)
        .withRelativePeriodDate(
            `${referencePeriodYear}-${currentMonth}-${currentDay}`
        )
        .withSkipData(true)
        .withSkipMeta(false)

    const referencePeriodRes = await analyticsEngine.aggregate.fetch(
        referencePeriodReq
    )

    console.log('ref period res', referencePeriodRes)

    // 2. extract the last week number of the LAST_x_WEEKS period
    //    special handling for the week 53 case as not all years have 53 weeks
    const referenceWeekPeriod = referencePeriodRes.metaData.dimensions[
        peId
    ].pop()
    const [referenceWeekYear, referenceWeekNumber] = referenceWeekPeriod.split(
        'W'
    )
    console.log('ref week number', referenceWeekNumber)
    const referenceWeekYearDelta = referencePeriodYear - referenceWeekYear
    console.log('ref week year delta', referenceWeekYearDelta)

    const weekPeriods = yearlySeriesIds.reduce((periods, year) => {
        yearlySeriesLabels.push(yearlySeriesRes.metaData.items[year].name)

        periods.push(`${year - referenceWeekYearDelta}W${referenceWeekNumber}`)

        // edge case for week 53, not all years have it, so request also week 52
        if (referenceWeekNumber === '53') {
            periods.push(`${year - referenceWeekYearDelta}W52`)
        }

        return periods
    }, [])
    console.log('week periods', weekPeriods)

    if (weekPeriods.length) {
        // 3. request metadata for the same week number for each one of the other years of the serie
        const weekPeriodsReq = new analyticsEngine.request()
            .addPeriodDimension(weekPeriods)
            .withSkipData(true)
            .withSkipMeta(false)
            .withIncludeMetadataDetails(true)

        const weekPeriodsRes = await analyticsEngine.aggregate.fetch(
            weekPeriodsReq
        )
        console.log('res week periods', weekPeriodsRes)

        // 3. compute relativePeriodDate for each other year of the serie:
        //    this is done by adding 1 day to the endDate of the week period obtained above
        const seenYears = []

        weekPeriodsRes.metaData.dimensions[peId]
            .sort()
            .reverse()
            .forEach(period => {
                const year = period.substr(0, 4)

                // make sure we only take W53 or W52 whichever is available
                if (!seenYears.includes(year)) {
                    const periodDate = new Date(
                        weekPeriodsRes.metaData.items[period].endDate
                    )
                    periodDate.setDate(periodDate.getDate() + 1)

                    periodDates.push(
                        `${periodDate.getFullYear()}-${(
                            '' +
                            (periodDate.getMonth() + 1)
                        ).padStart(2, 0)}-${(
                            '' + periodDate.getDate()
                        ).padStart(2, 0)}`
                    )

                    seenYears.unshift(year)
                }
            })
    }

    return { yearlySeriesLabels, periodDates }
}
