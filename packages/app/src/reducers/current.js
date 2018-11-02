import { getAxesFromUi, getOptionsFromUi } from '../modules/current';
import { createDimension } from '../modules/layout';
import {
    YEAR_OVER_YEAR_LINE,
    YEAR_OVER_YEAR_COLUMN,
} from '../modules/chartTypes';
import { FIXED_DIMENSIONS } from '../modules/fixedDimensions';

export const SET_CURRENT = 'SET_CURRENT';
export const SET_CURRENT_FROM_UI = 'SET_CURRENT_FROM_UI';
export const CLEAR_CURRENT = 'CLEAR_CURRENT';

export const DEFAULT_CURRENT = {};

const dxId = FIXED_DIMENSIONS.dx.id;
const peId = FIXED_DIMENSIONS.pe.id;

const getYearOnYearCurrentFromUi = (state, action) => {
    const ui = action.value;

    const dxItem = ui.itemsByDimension[dxId]
        ? [ui.itemsByDimension[dxId][0]]
        : [];

    return {
        ...state,
        type: ui.type,
        ...getOptionsFromUi(ui),
        columns: [createDimension(dxId, dxItem)],
        rows: [createDimension(peId, ui.yearOnYearCategory)],
        filters: getAxesFromUi(ui).filters.filter(
            f => ![dxId, peId].includes(f.dimension)
        ),
        yearlySeries: ui.yearOnYearSeries,
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
                    return getYearOnYearCurrentFromUi(state, action);
                default: {
                    const axesFromUi = getAxesFromUi(action.value);
                    const optionsFromUi = getOptionsFromUi(action.value);

                    return {
                        ...state,
                        ...axesFromUi,
                        ...optionsFromUi,
                        type: action.value.type,
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
