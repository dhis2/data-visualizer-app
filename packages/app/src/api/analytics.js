import { Analytics } from '@dhis2/analytics'
import { getInstance } from 'd2'

export const apiDownloadImage = async ({ baseUrl, type, formData }) => {
    const d2 = await getInstance()
    const api = d2.Api.getApi()

    const url = `${baseUrl}/api/svg.${type}`

    return api
        .fetch(url, {
            method: 'POST',
            body: formData,
            headers: new Headers(api.defaultHeaders),
        })
        .then(res => res.blob())
}

const addCommonParameters = (req, visualization, options) => {
    req = req
        .withSkipRounding(visualization.skipRounding)
        .withAggregationType(visualization.aggregationType)
        .withMeasureCriteria(visualization.measureCriteria)
        .withParameters({ completedOnly: visualization.completedOnly })
    //        .withUserOrgUnit(?) TODO

    if (visualization.displayProperty) {
        req = req.withDisplayProperty(visualization.displayProperty)
    }

    if (visualization.approvalLevel) {
        req = req.withApprovalLevel(visualization.approvalLevel)
    }

    if (options.relativePeriodDate) {
        req = req.withRelativePeriodDate(options.relativePeriodDate)
    }

    return req
}

export const apiDownloadTable = ({
    dataEngine,
    baseUrl,
    visualization,
    format,
    options,
    rows,
    columns,
}) => {
    const analyticsEngine = Analytics.getAnalytics(dataEngine)

    let req = new analyticsEngine.request()
        .fromVisualization(visualization)
        .withFormat(format)
        .withTableLayout()
        .withRows(rows.join(';'))
        .withColumns(columns.join(';'))

    req = addCommonParameters(req, visualization, options)

    if (visualization.hideEmptyColumns) {
        req = req.withHideEmptyColumns()
    }

    if (visualization.hideEmptyRows) {
        req = req.withHideEmptyRows()
    }

    if (visualization.showHierarchy) {
        req = req.withShowHierarchy()
    }

    const url = new URL(
        `${baseUrl}/api/${req.buildUrl()}`,
        `${window.location.origin}${window.location.pathname}`
    )

    Object.entries(req.buildQuery()).forEach(([key, value]) =>
        url.searchParams.append(key, value)
    )

    return url
}

export const apiDownloadData = ({
    baseUrl,
    dataEngine,
    visualization,
    format,
    options,
    idScheme,
    path,
}) => {
    const analyticsEngine = Analytics.getAnalytics(dataEngine)

    let req = new analyticsEngine.request()
        .fromVisualization(visualization, path === 'dataValueSet')
        .withFormat(format)
        .withShowHierarchy(visualization.showHierarchy)
        .withHierarchyMeta(visualization.showHierarchy)
        .withIncludeMetadataDetails(true)
        .withIncludeNumDen()
    //.withApprovalLevel(visualization.?) TODO
    req = addCommonParameters(req, visualization, options)

    if (path) {
        req = req.withPath(path)
    }

    if (idScheme) {
        req = req.withOutputIdScheme(idScheme)
    }

    const url = new URL(
        `${baseUrl}/api/${req.buildUrl()}`,
        `${window.location.origin}${window.location.pathname}`
    )

    Object.entries(req.buildQuery()).forEach(([key, value]) =>
        url.searchParams.append(key, value)
    )

    return url
}
