import { getAxesFromUi, getOptionsFromUi } from '../modules/current';
import {
    createDimension,
    AXIS_NAME_COLUMNS,
    AXIS_NAME_ROWS,
    AXIS_NAME_FILTERS,
} from '../modules/layout';
import {
    YEAR_OVER_YEAR_LINE,
    YEAR_OVER_YEAR_COLUMN,
} from '../modules/chartTypes';
import { FIXED_DIMENSIONS } from '../modules/fixedDimensions';
import {
    BASE_FIELD_YEARLY_SERIES,
    BASE_FIELD_TYPE,
} from '../modules/fields/baseFields';

export const SET_CURRENT = 'SET_CURRENT';
export const SET_CURRENT_FROM_UI = 'SET_CURRENT_FROM_UI';
export const CLEAR_CURRENT = 'CLEAR_CURRENT';

export const DEFAULT_CURRENT = null;

const dxId = FIXED_DIMENSIONS.dx.id;
const peId = FIXED_DIMENSIONS.pe.id;

const getYearOverYearCurrentFromUi = (state, action) => {
    const ui = action.value;

    const dxItem = ui.itemsByDimension[dxId]
        ? [ui.itemsByDimension[dxId][0]]
        : [];

    return {
        ...state,
        [BASE_FIELD_TYPE]: ui.type,
        ...getOptionsFromUi(ui),
        [AXIS_NAME_COLUMNS]: [createDimension(dxId, dxItem)],
        [AXIS_NAME_ROWS]: [createDimension(peId, ui.yearOverYearCategory)],
        [AXIS_NAME_FILTERS]: getAxesFromUi(ui).filters.filter(
            f => ![dxId, peId].includes(f.dimension)
        ),
        [[BASE_FIELD_YEARLY_SERIES]]: ui.yearOverYearSeries,
    };
};

export default (state = DEFAULT_CURRENT, action) => {
    switch (action.type) {
        case SET_CURRENT: {
            return action.value;
        }
        case SET_CURRENT_FROM_UI: {
            switch (action.value.type) {
                case YEAR_OVER_YEAR_LINE:
                case YEAR_OVER_YEAR_COLUMN:
                    return getYearOverYearCurrentFromUi(state, action);
                default: {
                    const axesFromUi = getAxesFromUi(action.value);
                    const optionsFromUi = getOptionsFromUi(action.value);

                    return {
                        ...state,
                        ...axesFromUi,
                        ...optionsFromUi,
                        [BASE_FIELD_TYPE]: action.value.type,
                    };
                }
            }
        }
        case CLEAR_CURRENT:
            return DEFAULT_CURRENT;
        default:
            return state;
    }
};

// Selectors

export const sGetCurrent = state => state.current;
