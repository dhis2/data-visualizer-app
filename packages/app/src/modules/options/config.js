import {
    COLUMN,
    BAR,
    STACKED_COLUMN,
    STACKED_BAR,
    PIVOT_TABLE,
    LINE,
    RADAR,
    AREA,
    PIE,
    GAUGE,
    YEAR_OVER_YEAR_LINE,
    YEAR_OVER_YEAR_COLUMN,
    SINGLE_VALUE,
} from '../chartTypes';

import pivotTableConfig from './pivotTableConfig';
import columnConfig from './columnConfig';
import stackedColumnConfig from './stackedColumnConfig';
import lineConfig from './lineConfig';
import areaConfig from './areaConfig';
import pieConfig from './pieConfig';

export const getOptionsByType = type => {
    switch (type) {
        case COLUMN:
        case BAR:
        case YEAR_OVER_YEAR_LINE:
        case YEAR_OVER_YEAR_COLUMN:
            return columnConfig;
        case STACKED_COLUMN:
        case STACKED_BAR:
            return stackedColumnConfig;
        case LINE:
        case RADAR:
            return lineConfig;
        case AREA:
            return areaConfig;
        case PIE:
        case GAUGE:
        case SINGLE_VALUE:
            return pieConfig;
        case PIVOT_TABLE:
            return pivotTableConfig;
        default:
            // return all the options
            return stackedColumnConfig;
    }
};
