import {
    VIS_TYPE_COLUMN,
    VIS_TYPE_BAR,
    VIS_TYPE_STACKED_COLUMN,
    VIS_TYPE_STACKED_BAR,
    VIS_TYPE_PIVOT_TABLE,
    VIS_TYPE_LINE,
    VIS_TYPE_RADAR,
    VIS_TYPE_AREA,
    VIS_TYPE_STACKED_AREA,
    VIS_TYPE_PIE,
    VIS_TYPE_GAUGE,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
    VIS_TYPE_YEAR_OVER_YEAR_COLUMN,
    VIS_TYPE_SINGLE_VALUE,
} from '@dhis2/analytics'

import pivotTableConfig from './pivotTableConfig'
import pieConfig from './pieConfig'
import gaugeConfig from './gaugeConfig'
import singleValueConfig from './singleValueConfig'
import defaultConfig from './defaultConfig'

export const getOptionsByType = (type, hasDisabledSections) => {
    switch (type) {
        case VIS_TYPE_COLUMN:
            return defaultConfig({
                hasDisabledSections,
                showSeriesAxisOptions: true,
                showSeriesTypeOptions: true,
                isColumnBased: true,
            })
        case VIS_TYPE_BAR:
            return defaultConfig({
                hasDisabledSections,
                showSeriesAxisOptions: true,
                isColumnBased: true,
            })
        case VIS_TYPE_YEAR_OVER_YEAR_COLUMN:
            return defaultConfig({
                hasDisabledSections,
                isColumnBased: true,
            })
        case VIS_TYPE_LINE:
            return defaultConfig({
                hasDisabledSections,
                showSeriesAxisOptions: true,
                showSeriesTypeOptions: true,
            })
        case VIS_TYPE_RADAR:
        case VIS_TYPE_YEAR_OVER_YEAR_LINE:
            return defaultConfig({
                hasDisabledSections,
            })
        case VIS_TYPE_AREA:
            return defaultConfig({
                hasDisabledSections,
                showSeriesAxisOptions: true,
            })
        case VIS_TYPE_STACKED_AREA:
            return defaultConfig({
                hasDisabledSections,
                isStacked: true,
            })
        case VIS_TYPE_GAUGE:
            return gaugeConfig(hasDisabledSections)
        case VIS_TYPE_PIE:
            return pieConfig(hasDisabledSections)
        case VIS_TYPE_SINGLE_VALUE:
            return singleValueConfig(hasDisabledSections)
        case VIS_TYPE_PIVOT_TABLE:
            return pivotTableConfig(hasDisabledSections)
        case VIS_TYPE_STACKED_COLUMN:
        case VIS_TYPE_STACKED_BAR:
        default:
            // default return all the options except series
            return defaultConfig({
                hasDisabledSections,
                isStacked: true,
                isColumnBased: true,
            })
    }
}
