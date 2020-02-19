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

    if (current.approvalLevel) {
        req = req.withApprovalLevel(current.approvalLevel)
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
        .withHierarchyMeta(current.showHierarchy)
        .withMeasureCriteria(current.measureCriteria)
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
