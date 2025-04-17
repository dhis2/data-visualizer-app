import { Analytics, VIS_TYPE_OUTLIER_TABLE } from '@dhis2/analytics'
import { useConfig, useDataEngine } from '@dhis2/app-runtime'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { getAnalyticsRequestForOutlierTable } from '../../api/analytics.js'
import { getNotoPdfFontForLocale } from '../../modules/getNotoPdfFontForLocale/index.js'
import { sGetCurrent } from '../../reducers/current.js'
import { sGetSettingsDisplayProperty } from '../../reducers/settings.js'
import {
    sGetUiType,
    sGetUiLayoutColumns,
    sGetUiLayoutRows,
} from '../../reducers/ui.js'
import { useChartContext } from '../ChartProvider.js'
import { useUserSettings } from '../UserSettingsProvider.js'
import {
    DOWNLOAD_TYPE_PLAIN,
    DOWNLOAD_TYPE_TABLE,
    FILE_FORMAT_HTML_CSS,
    FILE_FORMAT_CSV,
    FILE_FORMAT_XLS,
    FILE_FORMAT_PDF,
} from './constants.js'

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

const useDownload = (relativePeriodDate) => {
    const displayProperty = useSelector(sGetSettingsDisplayProperty)
    const visualization = useSelector(sGetCurrent)
    const visType = useSelector(sGetUiType)
    const columns = useSelector(sGetUiLayoutColumns)
    const rows = useSelector(sGetUiLayoutRows)
    const { baseUrl } = useConfig()
    const { dbLocale } = useUserSettings()
    const dataEngine = useDataEngine()
    const { getChart } = useChartContext()
    const analyticsEngine = Analytics.getAnalytics(dataEngine)

    const doDownloadImage = useCallback(
        ({ format }) => {
            const chart = getChart()

            if (!visualization || !chart) {
                return false
            }

            const isPdfExport = format === FILE_FORMAT_PDF
            const chartOptions = isPdfExport
                ? {
                      /* Custom visualization types (i.e. SingleValue) that need some
                       * specific handling for PDF export can read this when they
                       * re-render before exporting. */
                      isPdfExport,
                      chart: { style: { fontFamily: 'Noto Sans' } },
                      /* Text ellipsis is not supported in PDF exports so we need to
                       * let the title and subtitle text overflow when exporting to PDF */
                      title: {
                          style: {
                              whiteSpace: 'wrap',
                              overflow: 'auto',
                          },
                      },
                      subtitle: {
                          style: {
                              whiteSpace: 'wrap',
                              overflow: 'auto',
                          },
                      },
                  }
                : {
                      // Set to false if not a PDF export
                      isPdfExport,
                      /* Currently preserving webfonts when exporting to PNG is not
                       * working in Highcharts. I filed an issue about that, see
                       * https://github.com/highcharts/highcharts/issues/22914
                       * For now it is better to first set the font to a native
                       * PDF font before exporting to avoid alignment issues.*/
                      chart: { style: { fontFamily: 'Verdana' } },
                      // Text ellipsis styles do work for PNG export
                      title: {
                          style: {
                              whiteSpace: chart.options.title.style.whiteSpace,
                              overflow: chart.options.title.style.overflow,
                          },
                      },
                      subtitle: {
                          style: {
                              whiteSpace:
                                  chart.options.subtitle.style.whiteSpace,
                              overflow: chart.options.subtitle.style.overflow,
                          },
                      },
                  }

            /* In theory it should be possible to specify the chart options in the call
             * to `exportChartLocal` but it doesn't work as expected. One issue I observed
             * was that the SV visualization ended up in the wrong font */
            chart.update({ exporting: { chartOptions } })

            chart.exportChartLocal({
                filename: visualization.name,
                type: isPdfExport ? 'application/pdf' : 'image/png',
                pdfFont: isPdfExport
                    ? getNotoPdfFontForLocale(dbLocale)
                    : undefined,
            })
        },
        [dbLocale, getChart, visualization]
    )

    const doDownloadData = useCallback(
        ({ type, format, idScheme, path }) => {
            if (!visualization) {
                return false
            }

            let req = new analyticsEngine.request()
            let target = '_top'

            if (visType === VIS_TYPE_OUTLIER_TABLE) {
                // only DOWNLOAD_TYPE_PLAIN is enabled
                // open JSON in new tab
                target = [FILE_FORMAT_CSV, FILE_FORMAT_XLS].includes(format)
                    ? '_top'
                    : '_blank'

                req = getAnalyticsRequestForOutlierTable({
                    analyticsEngine,
                    visualization,
                    options: {
                        showHierarchy: visualization.showHierarchy,
                        skipRounding: visualization.skipRounding,
                    },
                    forDownload: true,
                })

                if (relativePeriodDate) {
                    req = req.withRelativePeriodDate(relativePeriodDate)
                }

                if (displayProperty) {
                    req = req.withDisplayProperty(displayProperty)
                }

                req = req
                    .withFormat(format)
                    .withOutputIdScheme(idScheme)
                    .withPath('outlierDetection')
            } else {
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

                        target =
                            format === FILE_FORMAT_HTML_CSS ? '_blank' : '_top'

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

                        target = [FILE_FORMAT_CSV, FILE_FORMAT_XLS].includes(
                            format
                        )
                            ? '_top'
                            : '_blank'
                        break
                }
            }

            const url = new URL(
                `${baseUrl}/api/${req.buildUrl()}`,
                `${window.location.origin}${window.location.pathname}`
            )

            Object.entries(req.buildQuery()).forEach(([key, value]) =>
                url.searchParams.append(key, value)
            )

            window.open(url, target)
        },
        [
            analyticsEngine,
            baseUrl,
            columns,
            displayProperty,
            relativePeriodDate,
            rows,
            visualization,
            visType,
        ]
    )

    return {
        disabled: !visualization,
        doDownloadData,
        doDownloadImage,
        visType,
    }
}

export { useDownload }
