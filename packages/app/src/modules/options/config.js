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
import columnConfig from './columnConfig'
import stackedColumnConfig from './stackedColumnConfig'
import lineConfig from './lineConfig'
import areaConfig from './areaConfig'
import pieConfig from './pieConfig'
import gaugeConfig from './gaugeConfig'
import singleValueConfig from './singleValueConfig'
import barConfig from './barConfig'
import yearOverYearConfig from './yearOverYearConfig'

export const getOptionsByType = (type, hasCustomAxes) => {
    switch (type) {
        case VIS_TYPE_COLUMN:
            return columnConfig(hasCustomAxes)
        case VIS_TYPE_BAR:
            return barConfig(hasCustomAxes)
        case VIS_TYPE_YEAR_OVER_YEAR_LINE:
        case VIS_TYPE_YEAR_OVER_YEAR_COLUMN:
            return yearOverYearConfig(hasCustomAxes)
        case VIS_TYPE_STACKED_COLUMN:
        case VIS_TYPE_STACKED_BAR:
            return stackedColumnConfig(hasCustomAxes)
        case VIS_TYPE_LINE:
        case VIS_TYPE_RADAR:
            return lineConfig(hasCustomAxes)
        case VIS_TYPE_AREA:
        case VIS_TYPE_STACKED_AREA:
            return areaConfig(hasCustomAxes)
        case VIS_TYPE_GAUGE:
            return gaugeConfig(hasCustomAxes)
        case VIS_TYPE_PIE:
            return pieConfig(hasCustomAxes)
        case VIS_TYPE_SINGLE_VALUE:
            return singleValueConfig(hasCustomAxes)
        case VIS_TYPE_PIVOT_TABLE:
            return pivotTableConfig(hasCustomAxes)
        default:
            // return all the options
            return stackedColumnConfig(hasCustomAxes)
    }
}
