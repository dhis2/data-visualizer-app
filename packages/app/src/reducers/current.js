import {
    getAxesFromUi,
    getOptionsFromUi,
    getPieCurrentFromUi,
    getYearOverYearCurrentFromUi,
} from '../modules/current';
import {
    YEAR_OVER_YEAR_LINE,
    YEAR_OVER_YEAR_COLUMN,
    PIE,
    GAUGE,
} from '../modules/chartTypes';
import { BASE_FIELD_TYPE } from '../modules/fields/baseFields';

export const SET_CURRENT = 'SET_CURRENT';
export const SET_CURRENT_FROM_UI = 'SET_CURRENT_FROM_UI';
export const CLEAR_CURRENT = 'CLEAR_CURRENT';

export const DEFAULT_CURRENT = null;

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
