import {
    VIS_TYPE_COLUMN,
    VIS_TYPE_BAR,
    VIS_TYPE_STACKED_COLUMN,
    VIS_TYPE_STACKED_BAR,
    VIS_TYPE_PIVOT_TABLE,
    VIS_TYPE_LINE,
    VIS_TYPE_RADAR,
    VIS_TYPE_AREA,
    VIS_TYPE_PIE,
    VIS_TYPE_GAUGE,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
    VIS_TYPE_YEAR_OVER_YEAR_COLUMN,
    VIS_TYPE_SINGLE_VALUE,
} from '@dhis2/analytics'

import pivotTableConfig from './pivotTableConfig'
import columnConfig from './columnConfig'
import stackedColumnConfig from './stackedColumnConfig'
import lineConfig from './lineConfig'
import areaConfig from './areaConfig'
import pieConfig from './pieConfig'
import gaugeConfig from './gaugeConfig'
import singleValueConfig from './singleValueConfig'
import barConfig from './barConfig'
import yoyConfig from './yoyConfig'

export const getOptionsByType = type => {
    switch (type) {
        case VIS_TYPE_COLUMN:
            return columnConfig
        case VIS_TYPE_BAR:
            return barConfig
        case VIS_TYPE_YEAR_OVER_YEAR_LINE:
        case VIS_TYPE_YEAR_OVER_YEAR_COLUMN:
            return yoyConfig
        case VIS_TYPE_STACKED_COLUMN:
        case VIS_TYPE_STACKED_BAR:
            return stackedColumnConfig
        case VIS_TYPE_LINE:
        case VIS_TYPE_RADAR:
            return lineConfig
        case VIS_TYPE_AREA:
            return areaConfig
        case VIS_TYPE_GAUGE:
            return gaugeConfig
        case VIS_TYPE_PIE:
            return pieConfig
        case VIS_TYPE_SINGLE_VALUE:
            return singleValueConfig
        case VIS_TYPE_PIVOT_TABLE:
            return pivotTableConfig
        default:
            // return all the options
            return stackedColumnConfig
    }
}
