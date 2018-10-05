import { getAxesFromUi, getOptionsFromUi } from '../current';

export const actionTypes = {
    SET_CURRENT: 'SET_CURRENT',
    SET_CURRENT_FROM_UI: 'SET_CURRENT_FROM_UI',
    CLEAR_CURRENT: 'CLEAR_CURRENT',
};

export const DEFAULT_CURRENT = {};

export default (state = DEFAULT_CURRENT, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT: {
            return action.value;
        }
        case actionTypes.SET_CURRENT_FROM_UI: {
            const axesFromUi = getAxesFromUi(action.value);
            const optionsFromUi = getOptionsFromUi(action.value);

            return {
                ...state,
                ...axesFromUi,
                ...optionsFromUi,
                type: action.value.type,
            };
        }
        case actionTypes.CLEAR_CURRENT:
            return DEFAULT_CURRENT;
        default:
            return state;
    }
};

// Selectors

export const sGetCurrent = state => state.current;
