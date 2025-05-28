import {
    VIS_TYPE_PIVOT_TABLE,
    VIS_TYPE_PIE,
    VIS_TYPE_GAUGE,
    VIS_TYPE_SINGLE_VALUE,
    VIS_TYPE_SCATTER,
    VIS_TYPE_OUTLIER_TABLE,
    isStacked as isStackedType,
    isLegendSetType,
    isMultiType,
    isDualAxisType,
    isColumnBasedType,
    isVerticalType,
} from '@dhis2/analytics'
import defaultConfig, { defaultOptionNames } from './defaultConfig.js'
import gaugeConfig, { gaugeOptionNames } from './gaugeConfig.js'
import outlierTableConfig, {
    outlierTableOptionNames,
} from './outlierTableConfig.js'
import pieConfig, { pieOptionNames } from './pieConfig.js'
import pivotTableConfig, { pivotTableOptionNames } from './pivotTableConfig.js'
import scatterConfig, { scatterOptionNames } from './scatterConfig.js'
import singleValueConfig, {
    singleValueOptionNames,
} from './singleValueConfig.js'

export const OPTION_CUMULAITVE_VALUES = 'cumulativeValues'
export const OPTION_EMPTY_ROW_ITEMS = 'hideEmptyRowItems'
export const OPTION_SORT_ORDER = 'sortOrder'
export const OPTION_SKIP_ROUNDING = 'skipRounding'
export const OPTION_REGRESSION_TYPE = 'regressionType'
export const OPTION_AGGREGATION_TYPE = 'aggregationType'
export const OPTION_COMPLETED_ONLY = 'completedOnly'
export const OPTION_LEGEND = 'legend'
export const OPTION_AXES = 'axes'
export const OPTION_SERIES = 'series'
export const OPTION_SHOW_DATA = 'showData'
export const OPTION_SERIES_KEY = 'seriesKey'
export const OPTION_FONT_DIGIT_GROUP_SEPARATOR = 'digitGroupSeparator'
export const OPTION_FONT_SIZE = 'fontSize'
export const OPTION_FONT_STYLE = 'fontStyle'
export const OPTION_TITLE = 'title'
export const OPTION_HIDE_TITLE = 'hideTitle'
export const OPTION_SUBTITLE = 'subtitle'
export const OPTION_HIDE_SUBTITLE = 'hideSubtitle'
export const OPTION_DISPLAY_DENSITY = 'displayDensity'
export const OPTION_COLOR_SET = 'colorSet'
export const OPTION_SHOW_HIERARCHY = 'showHierarchy'
export const OPTION_MEASURE_CRITERIA = 'measureCriteria'
export const OPTION_OUTLIER_ANALYSIS = 'outlierAnalysis'

export const getOptionsByType = ({
    type,
    hasCumulativeValuesInPt,
    hasDimensionItemsInColumns,
    hasDimensionItemsInRows,
    hasDisabledSections,
    rangeAxisIds,
}) => {
    const isStacked = isStackedType(type)
    const isColumnBased = isColumnBasedType(type)
    const supportsLegends = isLegendSetType(type)
    const supportsMultiAxes = isDualAxisType(type)
    const supportsMultiType = isMultiType(type)
    const isVertical = isVerticalType(type)

    const defaultProps = {
        hasCumulativeValuesInPt,
        hasDisabledSections,
        isStacked,
        isColumnBased,
        supportsLegends,
        supportsMultiAxes,
        supportsMultiType,
        rangeAxisIds,
        isVertical,
    }

    switch (type) {
        case VIS_TYPE_GAUGE:
            return gaugeConfig()
        case VIS_TYPE_PIE:
            return pieConfig()
        case VIS_TYPE_SINGLE_VALUE:
            return singleValueConfig()
        case VIS_TYPE_PIVOT_TABLE:
            return pivotTableConfig({
                hasCumulativeValuesInPt,
                hasDimensionItemsInColumns,
                hasDimensionItemsInRows,
            })
        case VIS_TYPE_SCATTER:
            return scatterConfig()
        case VIS_TYPE_OUTLIER_TABLE:
            return outlierTableConfig()
        default:
            return defaultConfig(defaultProps)
    }
}

export const getOptionNamesByType = (type) => {
    const isColumnBased = isColumnBasedType(type)
    const isStacked = isStackedType(type)
    const supportsLegends = isLegendSetType(type)

    switch (type) {
        case VIS_TYPE_GAUGE:
            return gaugeOptionNames()
        case VIS_TYPE_PIE:
            return pieOptionNames()
        case VIS_TYPE_SINGLE_VALUE:
            return singleValueOptionNames()
        case VIS_TYPE_PIVOT_TABLE:
            return pivotTableOptionNames()
        case VIS_TYPE_SCATTER:
            return scatterOptionNames()
        case VIS_TYPE_OUTLIER_TABLE:
            return outlierTableOptionNames()
        default:
            return defaultOptionNames({
                supportsLegends,
                isColumnBased,
                isStacked,
            })
    }
}
