import {
    OPTION_AGGREGATION_TYPE,
    OPTION_AXES,
    OPTION_COLOR_SET,
    OPTION_COMPLETED_ONLY,
    OPTION_CUMULATIVE_VALUES,
    OPTION_FONT_STYLE,
    OPTION_HIDE_EMPTY_ROW_ITEMS,
    OPTION_HIDE_SUBTITLE,
    OPTION_HIDE_TITLE,
    OPTION_LEGEND,
    OPTION_MEASURE_CRITERIA,
    OPTION_NO_SPACE_BETWEEN_COLUMNS,
    OPTION_PERCENT_STACKED_VALUES,
    OPTION_REGRESSION_TYPE,
    OPTION_SERIES,
    OPTION_SERIES_KEY,
    OPTION_SHOW_DATA,
    OPTION_SKIP_ROUNDING,
    OPTION_SORT_ORDER,
    OPTION_SUBTITLE,
    OPTION_TITLE,
} from '../options.js'
import getAdvancedSection from './sections/advanced.js'
import getChartStyleSection from './sections/chartStyle.js'
import getColorSetSection from './sections/colorSet.js'
import getDisplaySection from './sections/display.js'
import getDomainAxisSection from './sections/domainAxis.js'
import getLinesSection from './sections/lines.js'
import getRangeAxisSection from './sections/rangeAxis.js'
import getTitlesSection from './sections/titles.js'
import getAxesTab from './tabs/axes.js'
import getDataTab from './tabs/data.js'
import getLegendTab from './tabs/legend.js'
import getLimitValuesTab from './tabs/limitValues.js'
import getSeriesTab from './tabs/series.js'
import getStyleTab from './tabs/style.js'

export default ({
    hasDisabledSections,
    supportsMultiAxes,
    supportsMultiType,
    isColumnBased,
    isStacked,
    supportsLegends,
    rangeAxisIds = [],
    isVertical,
} = {}) => [
    getDataTab([
        getDisplaySection(isStacked),
        getLinesSection(hasDisabledSections, 'RANGE_0'),
        getAdvancedSection(),
    ]),
    ...(supportsLegends ? [getLegendTab({ hideStyleOptions: true })] : []),
    getAxesTab([
        ...rangeAxisIds.map((id) =>
            getRangeAxisSection({
                axisId: `RANGE_${id}`,
                isVertical,
                showLines: hasDisabledSections,
                hasCustomAxes:
                    rangeAxisIds.length > 1 ||
                    rangeAxisIds.some((id) => id > 0),
            })
        ),
        getDomainAxisSection({ axisId: 'DOMAIN_0', isVertical }),
    ]),
    getSeriesTab({
        showAxisOptions: supportsMultiAxes,
        showTypeOptions: supportsMultiType,
    }),
    getStyleTab([
        getChartStyleSection(isColumnBased),
        getTitlesSection(),
        getColorSetSection(hasDisabledSections),
    ]),
    getLimitValuesTab(),
]

export const defaultOptionNames = ({
    isStacked,
    supportsLegends,
    isColumnBased,
}) => {
    const options = [
        // Data tab
        OPTION_CUMULATIVE_VALUES,
        OPTION_HIDE_EMPTY_ROW_ITEMS,
        OPTION_SORT_ORDER,
        OPTION_SKIP_ROUNDING,
        OPTION_REGRESSION_TYPE,
        OPTION_AGGREGATION_TYPE,
        OPTION_COMPLETED_ONLY,
        // Axes tab
        OPTION_AXES,
        // Series tab
        OPTION_SERIES,
        // Style tab
        OPTION_SHOW_DATA,
        OPTION_SERIES_KEY,
        OPTION_FONT_STYLE,
        OPTION_TITLE,
        OPTION_HIDE_TITLE,
        OPTION_SUBTITLE,
        OPTION_HIDE_SUBTITLE,
        OPTION_COLOR_SET,
        // Limit values tab
        OPTION_MEASURE_CRITERIA,
    ]

    if (isStacked) {
        options.push(OPTION_PERCENT_STACKED_VALUES)
    }

    if (supportsLegends) {
        options.push(OPTION_LEGEND)
    }

    if (isColumnBased) {
        options.push(OPTION_NO_SPACE_BETWEEN_COLUMNS)
    }

    return options
}
