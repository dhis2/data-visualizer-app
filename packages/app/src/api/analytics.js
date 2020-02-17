import { DIMENSION_ID_PERIOD } from '@dhis2/analytics'
import { getInstance } from 'd2'

export const apiDownloadImage = async (type, formData) => {
    const d2 = await getInstance()
    const api = d2.Api.getApi()

    const url = `${api.baseUrl}/svg.${type}`

    return api
        .fetch(url, {
            method: 'POST',
            body: formData,
            headers: new Headers(api.defaultHeaders),
        })
        .then(res => res.blob())
}

const addCommonParameters = (req, current, options) => {
    req = req
        .withSkipRounding(current.skipRounding)
        .withAggregationType(current.aggregationType)
    //        .withUserOrgUnit(?) TODO

    if (current.displayProperty) {
        req = req.withDisplayProperty(current.displayProperty)
    }

    if (options.relativePeriodDate) {
        req = req.withRelativePeriodDate(options.relativePeriodDate)
    }

    return req
}

export const apiDownloadTable = async ({
    current,
    format,
    options,
    rows,
    columns,
}) => {
    const d2 = await getInstance()
    const api = d2.Api.getApi()

    let req = new d2.analytics.request()
        .fromModel(current)
        .withFormat(format)
        .withTableLayout()
        .withRows(rows.join(';'))
        .withColumns(columns.join(';'))
        .withMeasureCriteria(current.measureCriteria)
        .withParameters({ completedOnly: current.completedOnly })

    req = addCommonParameters(req, current, options)

    if (current.hideEmptyColumns) {
        req = req.withHideEmptyColumns()
    }

    if (current.hideEmptyRows) {
        req = req.withHideEmptyRows()
    }

    if (current.showHierarchy) {
        req = req.withShowHierarchy()
    }

    const url = new URL(
        `${api.baseUrl}/${req.buildUrl()}`,
        `${window.location.origin}${window.location.pathname}`
    )

    Object.entries(req.buildQuery()).forEach(([key, value]) =>
        url.searchParams.append(key, value)
    )

    return url
}

export const apiDownloadData = async ({
    current,
    format,
    options,
    idScheme,
    path,
}) => {
    const d2 = await getInstance()
    const api = d2.Api.getApi()

    let req = new d2.analytics.request()
        .fromModel(current, path === 'dataValueSet')
        .withFormat(format)
        .withShowHierarchy(current.showHierarchy)
        .withHierarchyMeta(current.showHierarchy)
        .withMeasureCriteria(current.measureCriteria)
        .withIncludeMetadataDetails(true)
        .withIncludeNumDen()
        .withParameters({ completedOnly: current.completedOnly })
    //.withApprovalLevel(current.?) TODO
    req = addCommonParameters(req, current, options)

    if (path) {
        req = req.withPath(path)
    }

    if (idScheme) {
        req = req.withOutputIdScheme(idScheme)
    }

    const url = new URL(
        `${api.baseUrl}/${req.buildUrl()}`,
        `${window.location.origin}${window.location.pathname}`
    )

    Object.entries(req.buildQuery()).forEach(([key, value]) =>
        url.searchParams.append(key, value)
    )

    return url
}

export const apiFetchAnalytics = async (current, options) => {
    const d2 = await getInstance()

    const req = new d2.analytics.request()
        .fromModel(current)
        .withParameters(options)

    const rawResponse = await d2.analytics.aggregate.get(req)

    return [new d2.analytics.response(rawResponse)]
}

export const apiFetchAnalyticsForYearOverYear = async (current, options) => {
    const d2 = await getInstance()

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

    yearlySeriesRes.metaData.dimensions[DIMENSION_ID_PERIOD].forEach(period => {
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
