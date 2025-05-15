import {
    COLOR_SET_DEFAULT,
    colorSets,
    VIS_TYPE_LINE,
    VIS_TYPE_RADAR,
} from '@dhis2/analytics'

export function computeChartOptionsForExport(
    isPdfExport,
    visType,
    chartOptions
) {
    if (isPdfExport) {
        const chartExportOptions = {
            /* Custom visualization types (i.e. SingleValue) that need some
             * specific handling for PDF export can read this when they
             * re-render before exporting */
            isPdfExport: true,
            /* The font-family selected here impacts text alignment in the PDF
             * that is produced. We set it to Helvetica here because this is a
             * standard PDF font and a fallback font of our app. In theory it
             * would make more sense to select base font-family Noto Sans which
             * is actually used in the generated PDF, but for some reason that
             * proved to result in poorer text alignment than Helvetica.
             * Specifically we observed label/legend text overlap. */
            chart: {
                style: { fontFamily: 'Helvetica' },
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

        /* Lines with a pattern are not exported to PDF correctly, see
         * https://github.com/highcharts/highcharts/issues/23032
         * For now we just fall back to the default color scheme for
         * PDF exports for the afftected chart types */
        if (
            (visType === VIS_TYPE_LINE || visType === VIS_TYPE_RADAR) &&
            chartOptions.series.some(
                ({ color }) => typeof color.patternIndex === 'number'
            )
        ) {
            const { colors } = colorSets[COLOR_SET_DEFAULT]
            const series = []
            let colorIndex = 0
            chartOptions.series.forEach(() => {
                series.push({ color: colors[colorIndex] })
                colorIndex =
                    colorIndex === colors.length - 1 ? 0 : colorIndex + 1
            })
            chartExportOptions.series = series
        }

        return chartExportOptions
    } else {
        const titleStyle = chartOptions.title.style
        const subtitleStyle = chartOptions.subtitle.style

        return {
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
    }
}
