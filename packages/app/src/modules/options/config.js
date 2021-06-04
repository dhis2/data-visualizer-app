import {
    VIS_TYPE_PIVOT_TABLE,
    VIS_TYPE_PIE,
    VIS_TYPE_GAUGE,
    VIS_TYPE_SINGLE_VALUE,
    VIS_TYPE_SCATTER,
    isStacked as isStackedType,
    isLegendSetType,
    isMultiType,
    isDualAxisType,
    isColumnBasedType,
    isVerticalType,
} from '@dhis2/analytics'

import pivotTableConfig from './pivotTableConfig'
import pieConfig from './pieConfig'
import gaugeConfig from './gaugeConfig'
import singleValueConfig from './singleValueConfig'
import defaultConfig from './defaultConfig'
import scatterConfig from './scatterConfig'

export const getOptionsByType = (type, hasDisabledSections, rangeAxisIds) => {
    const isStacked = isStackedType(type)
    const isColumnBased = isColumnBasedType(type)
    const supportsLegends = isLegendSetType(type)
    const supportsMultiAxes = isDualAxisType(type)
    const supportsMultiType = isMultiType(type)
    const isVertical = isVerticalType(type)

    const defaultProps = {
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
            return pivotTableConfig()
        case VIS_TYPE_SCATTER:
            return scatterConfig()
        default:
            return defaultConfig(defaultProps)
    }
}
