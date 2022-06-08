import { Analytics } from '@dhis2/analytics'
import { useConfig, useDataEngine, useDataMutation } from '@dhis2/app-runtime'
import { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { sGetChart } from '../../reducers/chart.js'
import { sGetCurrent } from '../../reducers/current.js'
import {
    sGetUiType,
    sGetUiLayoutColumns,
    sGetUiLayoutRows,
} from '../../reducers/ui.js'
import {
    DOWNLOAD_TYPE_PLAIN,
    DOWNLOAD_TYPE_TABLE,
    FILE_FORMAT_HTML_CSS,
    FILE_FORMAT_CSV,
    FILE_FORMAT_PNG,
    FILE_FORMAT_XLS,
} from './constants.js'

const downloadPngMutation = {
    resource: 'svg.png',
    type: 'create',
    data: ({ formData }) => formData,
}

const downloadPdfMutation = {
    resource: 'svg.pdf',
    type: 'create',
    data: ({ formData }) => formData,
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

const useDownloadMenu = (relativePeriodDate) => {
    const visualization = useSelector(sGetCurrent)
    const visType = useSelector(sGetUiType)
    const chart = useSelector(sGetChart)
    const columns = useSelector(sGetUiLayoutColumns)
    const rows = useSelector(sGetUiLayoutRows)
    const { baseUrl } = useConfig()
    const dataEngine = useDataEngine()
    const analyticsEngine = Analytics.getAnalytics(dataEngine)
    const [isOpen, setIsOpen] = useState(false)

    const openDownloadedFileInBlankTab = useCallback((blob) => {
        const url = URL.createObjectURL(blob)
        window.open(url, '_blank')
    }, [])

    const [getPng] = useDataMutation(downloadPngMutation, {
        onComplete: openDownloadedFileInBlankTab,
    })

    const [getPdf] = useDataMutation(downloadPdfMutation, {
        onComplete: openDownloadedFileInBlankTab,
    })

    const downloadImage = useCallback(
        ({ format }) => {
            if (!visualization) {
                return false
            }

            const formData = {
                filename: visualization.name,
            }

            if (chart) {
                formData.svg = chart
            }

            format === FILE_FORMAT_PNG
                ? getPng({ formData })
                : getPdf({ formData })

            setIsOpen(false)
        },
        [chart, getPdf, getPng, visualization]
    )

    const downloadData = useCallback(
        ({ type, format, idScheme, path }) => {
            if (!visualization) {
                return false
            }

            let req = new analyticsEngine.request()
            let target = '_top'

            switch (type) {
                case DOWNLOAD_TYPE_TABLE:
                    req = req
                        .fromVisualization(visualization)
                        .withFormat(format)
                        .withTableLayout()
                        .withColumns(columns.join(';'))
                        .withRows(rows.join(';'))

                    req = addCommonParameters(req, visualization, {
                        relativePeriodDate,
                    })

                    if (visualization.hideEmptyColumns) {
                        req = req.withHideEmptyColumns()
                    }

                    if (visualization.hideEmptyRows) {
                        req = req.withHideEmptyRows()
                    }

                    if (visualization.showHierarchy) {
                        req = req.withShowHierarchy()
                    }

                    target = format === FILE_FORMAT_HTML_CSS ? '_blank' : '_top'

                    break
                case DOWNLOAD_TYPE_PLAIN:
                    req = req
                        .fromVisualization(
                            visualization,
                            path === 'dataValueSet'
                        )
                        .withFormat(format)
                        .withShowHierarchy(visualization.showHierarchy)
                        .withHierarchyMeta(visualization.showHierarchy)
                        .withIncludeMetadataDetails(true)
                        .withIncludeNumDen()

                    req = addCommonParameters(req, visualization, {
                        relativePeriodDate,
                    })

                    if (path) {
                        req = req.withPath(path)
                    }

                    if (idScheme) {
                        req = req.withOutputIdScheme(idScheme)
                    }

                    target = [FILE_FORMAT_CSV, FILE_FORMAT_XLS].includes(format)
                        ? '_top'
                        : '_blank'
                    break
            }

            const url = new URL(
                `${baseUrl}/api/${req.buildUrl()}`,
                `${window.location.origin}${window.location.pathname}`
            )

            Object.entries(req.buildQuery()).forEach(([key, value]) =>
                url.searchParams.append(key, value)
            )

            window.open(url, target)
            setIsOpen(false)
        },
        [
            analyticsEngine,
            baseUrl,
            columns,
            relativePeriodDate,
            rows,
            visualization,
        ]
    )

    return {
        isOpen,
        toggleOpen: () => setIsOpen(!isOpen),
        disabled: !visualization,
        downloadData,
        downloadImage,
        visType,
    }
}

export { useDownloadMenu }
