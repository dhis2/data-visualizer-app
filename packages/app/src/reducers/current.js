import {
    getAxesFromUi,
    getOptionsFromUi,
    getPieCurrentFromUi,
    getYearOverYearCurrentFromUi,
    getSingleValueCurrentFromUi,
    getSeriesItemsFromUi,
} from '../modules/current';
import {
    YEAR_OVER_YEAR_LINE,
    YEAR_OVER_YEAR_COLUMN,
    PIE,
    GAUGE,
    SINGLE_VALUE,
} from '../modules/chartTypes';
import { BASE_FIELD_TYPE } from '../modules/fields/baseFields';

export const SET_CURRENT = 'SET_CURRENT';
export const SET_CURRENT_FROM_UI = 'SET_CURRENT_FROM_UI';
export const CLEAR_CURRENT = 'CLEAR_CURRENT';

export const DEFAULT_CURRENT = null;

const getDefaultFromUi = (state, action) => {
    const axesFromUi = getAxesFromUi(action.value);
    const optionsFromUi = getOptionsFromUi(action.value);
    const seriesItems = getSeriesItemsFromUi(action.value);

    return {
        ...state,
        [BASE_FIELD_TYPE]: action.value.type,
        ...axesFromUi,
        ...optionsFromUi,
        seriesItems,
    };
};

export default (state = DEFAULT_CURRENT, action) => {
    switch (action.type) {
        case SET_CURRENT: {
            return action.value;
        }
        case SET_CURRENT_FROM_UI: {
            switch (action.value.type) {
                case PIE:
                case GAUGE:
                    return getPieCurrentFromUi(state, action);
                case SINGLE_VALUE:
                    return getSingleValueCurrentFromUi(state, action);
                case YEAR_OVER_YEAR_LINE:
                case YEAR_OVER_YEAR_COLUMN:
                    return getYearOverYearCurrentFromUi(state, action);
                default: {
                    return getDefaultFromUi(state, action);
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
export const sGetCurrentFromUi = state => {
    const ui = state.ui;

    switch (ui.type) {
        case PIE:
        case GAUGE:
            return getPieCurrentFromUi(state, { value: ui });
        case SINGLE_VALUE:
            return getSingleValueCurrentFromUi(state, { value: ui });
        case YEAR_OVER_YEAR_LINE:
        case YEAR_OVER_YEAR_COLUMN:
            return getYearOverYearCurrentFromUi(state, { value: ui });
        default: {
            return getDefaultFromUi(state, { value: ui });
        }
    }
};
