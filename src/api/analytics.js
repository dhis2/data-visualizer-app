import {
    Analytics,
    layoutGetDimensionItems,
    VIS_TYPE_PIVOT_TABLE,
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    DAILY,
    WEEKLY,
    WEEKS_THIS_YEAR,
} from '@dhis2/analytics'
import {
    METHOD_MODIFIED_Z_SCORE,
    METHOD_STANDARD_Z_SCORE,
    OUTLIER_METHOD_PROP,
    OUTLIER_THRESHOLD_PROP,
} from '../components/VisualizationOptions/Options/OutliersForOutlierTable.js'
import { OUTLIER_MAX_RESULTS_PROP } from '../components/VisualizationOptions/Options/OutliersMaxResults.js'
import {
    getRelativePeriodTypeUsed,
    getOutlierTableDimensionIdHeaderMap,
} from '../modules/analytics.js'
import { getSortingFromVisualization } from '../modules/ui.js'

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

export const getAnalyticsRequestForOutlierTable = ({
    analyticsEngine,
    visualization,
    options,
    forDownload = false,
}) => {
    const dimensionIdHeaderMap = getOutlierTableDimensionIdHeaderMap(options)

    const parameters = {
        ...options,
        maxResults: visualization.outlierAnalysis[OUTLIER_MAX_RESULTS_PROP],
        algorithm:
            visualization.outlierAnalysis[OUTLIER_METHOD_PROP] ===
            METHOD_STANDARD_Z_SCORE
                ? 'Z_SCORE'
                : visualization.outlierAnalysis[OUTLIER_METHOD_PROP],
        threshold: visualization.outlierAnalysis[OUTLIER_THRESHOLD_PROP],
    }

    const columns = visualization.columns || []
    const headers = []

    columns.forEach(({ dimension, items }) => {
        parameters[dimension] = items.map(({ id }) => id).join(',')

        headers.push(forDownload ? dimension : dimensionIdHeaderMap[dimension])

        if (dimension === DIMENSION_ID_DATA) {
            headers.push('cocname')
        }
    })

    headers.push('value')

    switch (visualization.outlierAnalysis.outlierMethod) {
        case METHOD_MODIFIED_Z_SCORE:
            headers.push('median', 'modifiedzscore', 'medianabsdeviation')
            break
        case METHOD_STANDARD_Z_SCORE:
            headers.push('mean', 'zscore', 'stddev')
    }

    headers.push('lowerbound', 'upperbound')

    parameters.headers = headers.join(',')

    // sorting
    const sorting = getSortingFromVisualization(visualization)

    if (sorting) {
        parameters.orderBy = sorting.dimension
        parameters.sortOrder = sorting.direction
    }

    return new analyticsEngine.request().withParameters(parameters)
}

export const apiFetchAnalyticsForOutlierTable = async (
    dataEngine,
    visualization,
    options
) => {
    const analyticsEngine = Analytics.getAnalytics(dataEngine)

    const req = getAnalyticsRequestForOutlierTable({
        analyticsEngine,
        visualization,
        options,
    })

    const rawResponse = await analyticsEngine.aggregate.getOutliersData(req)

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
    if (
        getRelativePeriodTypeUsed(periodItems) === WEEKLY &&
        !periodItems[0].id === WEEKS_THIS_YEAR
    ) {
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
    } else if (getRelativePeriodTypeUsed(periodItems) === DAILY) {
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
            .forEach((year) => {
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

    return Promise.all(requests).then((responses) => ({
        responses: responses.map((res) => new analyticsEngine.response(res)),
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

    yearlySeriesIds.forEach((year) => {
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
    const referenceWeekPeriod =
        referencePeriodRes.metaData.dimensions[periodId].pop()
    const [referenceWeekYear, referenceWeekNumber] =
        referenceWeekPeriod.split('W')
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
            .forEach((period) => {
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
