const peId = 'pe'

export const apiFetchAnalytics = async (d2, current, options) => {
    const req = new d2.analytics.request()
        .fromModel(current)
        .withParameters(options)

    const rawResponse = await d2.analytics.aggregate.get(req)

    return [new d2.analytics.response(rawResponse)]
}

export const apiFetchAnalyticsForYearOverYear = async (
    d2,
    current,
    options
) => {
    let yearlySeriesReq = new d2.analytics.request()
        .addPeriodDimension(current.yearlySeries)
        .withSkipData(true)
        .withSkipMeta(false)
        .withIncludeMetadataDetails(true)

    if (options.relativePeriodDate) {
        yearlySeriesReq = yearlySeriesReq.withRelativePeriodDate(
            options.relativePeriodDate
        )
    }

    const yearlySeriesRes = await d2.analytics.aggregate.fetch(yearlySeriesReq)

    const requests = []
    const yearlySeriesLabels = []

    const now = new Date()
    const currentDay = ('' + now.getDate()).padStart(2, 0)
    const currentMonth = ('' + (now.getMonth() + 1)).padStart(2, 0)

    yearlySeriesRes.metaData.dimensions[peId].forEach(period => {
        yearlySeriesLabels.push(yearlySeriesRes.metaData.items[period].name)

        const startDate = `${period}-${currentMonth}-${currentDay}`

        const req = new d2.analytics.request()
            .fromModel(current)
            .withParameters(options)
            .withRelativePeriodDate(startDate)

        requests.push(d2.analytics.aggregate.get(req))
    })

    return Promise.all(requests).then(responses => ({
        responses: responses.map(res => new d2.analytics.response(res)),
        yearlySeriesLabels,
    }))
}
