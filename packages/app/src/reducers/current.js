import { getAxesFromUi, getOptionsFromUi } from '../modules/current';
import { createDimension } from '../modules/layout';
import { YEAR_ON_YEAR } from '../modules/chartTypes';
import { FIXED_DIMENSIONS } from '../modules/fixedDimensions';

export const SET_CURRENT = 'SET_CURRENT';
export const SET_CURRENT_FROM_UI = 'SET_CURRENT_FROM_UI';
export const CLEAR_CURRENT = 'CLEAR_CURRENT';

export const DEFAULT_CURRENT = {};

const dxId = FIXED_DIMENSIONS.dx.id;
const peId = FIXED_DIMENSIONS.pe.id;

const getYearOnYearCurrentFromUi = (state, action) => {
    const dxItem = action.value.itemsByDimension[dxId]
        ? action.value.itemsByDimension[dxId][0]
        : [];
    const peItem = action.value.yearOnYearCategory;

    return {
        ...state,
        type: action.value.type,
        ...getOptionsFromUi(action.value),
        columns: [createDimension(dxId, [dxItem])],
        rows: [createDimension(peId, [peItem])],
        filters: getAxesFromUi(action.value).filters.filter(
            f => ![dxId, peId].includes(f.dimension)
        ),
        yearlySeries: action.value.yearOnYearSeries,
    };
};

export default (state = DEFAULT_CURRENT, action) => {
    switch (action.type) {
        case SET_CURRENT: {
            return action.value;
        }
        case SET_CURRENT_FROM_UI: {
            switch (action.value.type) {
                case YEAR_ON_YEAR:
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
