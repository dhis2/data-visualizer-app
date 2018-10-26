import { getAxesFromUi, getOptionsFromUi } from '../modules/current';
import { createDimension } from '../modules/layout';
import { YEAR_ON_YEAR } from '../chartTypes';
import { FIXED_DIMENSIONS } from '../fixedDimensions';

export const SET_CURRENT = 'SET_CURRENT';
export const SET_CURRENT_FROM_UI = 'SET_CURRENT_FROM_UI';
export const CLEAR_CURRENT = 'CLEAR_CURRENT';

export const DEFAULT_CURRENT = {};

const getYearOnYearCurrentFromUi = (state, action) => ({
    ...state,
    type: action.value.type,
    ...getOptionsFromUi(action.value),
    columns: [
        createDimension(FIXED_DIMENSIONS.pe.id, [
            action.value.yearOnYearCategory,
        ]),
    ],
    rows: [
        createDimension(FIXED_DIMENSIONS.dx.id, [
            action.value.itemsByDimension.dx[0],
        ]),
    ],
    filters: getAxesFromUi(action.value).filters,
    yearlySeries: action.value.yearOnYearSeries,
});

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
