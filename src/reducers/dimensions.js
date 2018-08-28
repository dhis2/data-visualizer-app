import { orObject } from '../util';

export const actionTypes = {
    SET_DIMENSIONS: 'SET_DIMENSIONS',
    GET_DIMENSIONS: 'GET_DIMENSIONS',
    REMOVE_DIMENSIONS: 'REMOVE_DIMENSIONS',
};

export const DEFAULT_DIMENSIONS = {
    0: {
        id: 0,
        dimensionType: 'FIXED_DIMENSION',
        displayName: 'Data',
        selected: false,
    },
    1: {
        id: 1,
        dimensionType: 'FIXED_DIMENSION',
        displayName: 'Period',
        selected: false,
    },
    2: {
        id: 2,
        dimensionType: 'FIXED_DIMENSION',
        displayName: 'Organisation Unit',
        selected: false,
    },
};

/**
 *  TODO:   Fra egne tanker:
 *              Fiks fetch recommended
 *              Fiks Recommended icon
 *              Fiks update dimension til API
 *
 *          Fra Dokument:
 *              Only dimensions available to the user are displayed
 *              Dimensions can be drag and dropped to the layout toolbar.
 *
 */
export default (state = DEFAULT_DIMENSIONS, action) => {
    switch (action.type) {
        case actionTypes.SET_DIMENSIONS: {
            return {
                ...state,
                [action.value]: { ...state[action.value], selected: true },
            };
        }
        case actionTypes.GET_DIMENSIONS: {
            return { ...state, ...action.value };
        }
        case actionTypes.REMOVE_DIMENSIONS: {
            return {
                ...state,
                [action.value]: { ...state[action.value], selected: false },
            };
        }
        default:
            return state;
    }
};

// selectors

/**
 * Selector which returns dimensions from the state object
 * If state.dimensions is null, then the dimensions api request
 * has not yet completed. If state.dimensions is an empty object
 * then the dimensions api request is complete, and there are no
 * dimensions
 *
 * @function
 * @param {Object} state The current state
 * @returns {Array}
 */
export const sGetFromState = state => orObject(state.dimensions);
