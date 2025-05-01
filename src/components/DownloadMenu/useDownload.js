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

const getChartOptionsForExportType = (isPdfExport, titleStyle, subtitleStyle) =>
    isPdfExport
        ? {
              /* Custom visualization types (i.e. SingleValue) that need some
               * specific handling for PDF export can read this when they
               * re-render before exporting */
              isPdfExport: true,
              /* To avoid alignment issues set the font to the base family used
               * in the `pdfFont` option */
              chart: {
                  style: { fontFamily: 'Noto Sans' },
              },
              /* Text ellipsis and text shadow are not supported in PDF exports
               * so the corresponding style properties need to be set to their
               * default values when exporting to PDF */
              title: {
                  style: {
                      overflow: 'auto',
                      textOverflow: 'clip',
                      whiteSpace: 'wrap',
                  },
              },
              subtitle: {
                  style: {
                      overflow: 'auto',
                      textOverflow: 'clip',
                      textShadow: 'none',
                      whiteSpace: 'wrap',
                  },
              },
          }
        : {
              isPdfExport: false,
              /* Currently preserving webfonts when exporting to PNG is not
               * working in Highcharts. I filed an issue about that, see
               * https://github.com/highcharts/highcharts/issues/22914
               * For now it is better to first set the font to a websafe font
               * before exporting to avoid alignment issues. The font-family for
               * our charts is:
               * `Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif`
               * The first websafe font among these is Arial. */
              chart: { style: { fontFamily: 'Arial, sans-serif' } },
              /* Text ellipsis and shadow styles do work for PNG export.
               * They need to be explicitely set to the original chart values
               * in case a chart is first exported to PDF and then to PNG */
              title: {
                  style: {
                      overflow: titleStyle.overflow,
                      textOverflow: titleStyle.textOverflow,
                      whiteSpace: titleStyle.whiteSpace,
                  },
              },
              subtitle: {
                  style: {
                      overflow: subtitleStyle.overflow,
                      textOverflow: subtitleStyle.textOverflow,
                      textShadow: subtitleStyle.textShadow,
                      whiteSpace: subtitleStyle.whiteSpace,
                  },
              },
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
            const chartOptions = getChartOptionsForExportType(
                isPdfExport,
                chart.options.title.style,
                chart.options.subtitle.style
            )

            /* In theory it should be possible to specify the chart options in the call
             * to `exportChartLocal` but it doesn't work as expected. One observed issue
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
