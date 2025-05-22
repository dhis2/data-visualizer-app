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
