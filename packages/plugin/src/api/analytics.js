import {
    Analytics,
    VIS_TYPE_PIVOT_TABLE,
    layoutGetDimensionItems,
    DIMENSION_ID_PERIOD,
    DAYS,
    WEEKS,
} from '@dhis2/analytics'

import { getRelativePeriodTypeUsed } from '../modules/analytics'

const periodId = DIMENSION_ID_PERIOD

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

    const periodItems = layoutGetDimensionItems(visualization, periodId)

    // relative week period in use
    if (getRelativePeriodTypeUsed(periodItems) === WEEKS) {
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
    } else if (getRelativePeriodTypeUsed(periodItems) === DAYS) {
        const relativeDaysData = prepareRequestsForRelativeDays({
            yearlySeriesRes,
            currentMonth,
            currentDay,
        })

        periodDates.push(...relativeDaysData.periodDates)
        yearlySeriesLabels.push(...relativeDaysData.yearlySeriesLabels)
    } else {
        yearlySeriesRes.metaData.dimensions[periodId]
            .sort()
            .reverse()
            .forEach(year => {
                yearlySeriesLabels.push(
                    yearlySeriesRes.metaData.items[year].name
                )

                periodDates.push(`${year}-${currentMonth}-${currentDay}`)
            })
    }

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

const prepareRequestsForRelativeDays = ({
    yearlySeriesRes,
    currentMonth,
    currentDay,
}) => {
    const yearlySeriesLabels = []
    const periodDates = []

    const yearlySeriesIds = yearlySeriesRes.metaData.dimensions[periodId]
        .slice()
        .sort()
        .reverse()

    const isFeb29 = currentMonth === '02' && currentDay === '29'

    yearlySeriesIds.forEach(year => {
        yearlySeriesLabels.push(yearlySeriesRes.metaData.items[year].name)

        const isLeapYear = new Date(year, 1, 29).getDate() === 29

        // 1. check if current date is feb 29
        // 2. check if current year is NOT a leap year
        if (isFeb29 && !isLeapYear) {
            // 3. use feb 28 for that year as relativePeriodDate
            periodDates.push(`${year}-02-28`)
        } else {
            periodDates.push(`${year}-${currentMonth}-${currentDay}`)
        }
    })

    return { yearlySeriesLabels, periodDates }
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

    const yearlySeriesIds = yearlySeriesRes.metaData.dimensions[periodId]
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

    // 2. extract the last week number of the LAST_x_WEEKS period
    //    special handling for the week 53 case as not all years have 53 weeks
    const referenceWeekPeriod = referencePeriodRes.metaData.dimensions[
        periodId
    ].pop()
    const [referenceWeekYear, referenceWeekNumber] = referenceWeekPeriod.split(
        'W'
    )
    const referenceWeekYearDelta = referencePeriodYear - referenceWeekYear

    const weekPeriods = yearlySeriesIds.reduce((periods, year) => {
        yearlySeriesLabels.push(yearlySeriesRes.metaData.items[year].name)

        periods.push(`${year - referenceWeekYearDelta}W${referenceWeekNumber}`)

        // edge case for week 53, not all years have it, so request also week 52
        if (referenceWeekNumber === '53') {
            periods.push(`${year - referenceWeekYearDelta}W52`)
        }

        return periods
    }, [])

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

        // 3. compute relativePeriodDate for each other year of the serie:
        //    this is done by adding 1 day to the endDate of the week period obtained above
        const seenYears = []

        weekPeriodsRes.metaData.dimensions[periodId]
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
