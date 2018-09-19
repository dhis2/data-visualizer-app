import options from '../options';
import { getPropsByKeys } from '../util';
import { getAxesFromUi } from '../current';

export const actionTypes = {
    SET_CURRENT: 'SET_CURRENT',
    SET_CURRENT_FROM_UI: 'SET_CURRENT_FROM_UI',
};

export const DEFAULT_CURRENT = {};

export default (state = DEFAULT_CURRENT, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT:
            return action.value;
        case actionTypes.SET_CURRENT_FROM_UI:
            const axesFromUi = getAxesFromUi(action.value);
            const optionsFromUi = getPropsByKeys(
                action.value.options,
                Object.keys(options)
            );

            return {
                ...state,
                ...axesFromUi, // rows, columns, filters
                ...optionsFromUi,
                type: action.value.type,
            };
        default:
            return state;
    }
};

// Selectors

export const sGetCurrent = state => state.current;
