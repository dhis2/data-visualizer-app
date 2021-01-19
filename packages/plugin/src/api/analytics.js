import { Analytics, VIS_TYPE_PIVOT_TABLE } from '@dhis2/analytics'

const peId = 'pe'

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

    const requests = []
    const yearlySeriesLabels = []

    const now = new Date()
    const currentDay = ('' + now.getDate()).padStart(2, 0)
    const currentMonth = ('' + (now.getMonth() + 1)).padStart(2, 0)

    yearlySeriesRes.metaData.dimensions[peId].forEach(period => {
        yearlySeriesLabels.push(yearlySeriesRes.metaData.items[period].name)

        const startDate = `${period}-${currentMonth}-${currentDay}`

        const req = new analyticsEngine.request()
            .fromVisualization(visualization)
            .withParameters(options)
            .withRelativePeriodDate(startDate)

        requests.push(analyticsEngine.aggregate.get(req))
    })

    return Promise.all(requests).then(responses => ({
        responses: responses.map(res => new analyticsEngine.response(res)),
        yearlySeriesLabels,
    }))
}
