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
import defaultConfig from './defaultConfig.js'
import gaugeConfig from './gaugeConfig.jsx'
import outlierTableConfig from './outlierTableConfig.jsx'
import pieConfig from './pieConfig.jsx'
import pivotTableConfig from './pivotTableConfig.jsx'
import scatterConfig from './scatterConfig.jsx'
import singleValueConfig from './singleValueConfig.jsx'

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
            return outlierTableConfig(defaultProps)
        default:
            return defaultConfig(defaultProps)
    }
}
