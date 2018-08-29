import { orObject } from '../util';

export const actionTypes = {
    RECEIVED_DIMENSION: 'RECEIVED_DIMENSION',
    GET_DIMENSIONS: 'GET_DIMENSIONS',
};

export const DEFAULT_DIMENSIONS = {
    0: {
        id: 0,
        displayName: 'Data',
        selected: false,
        isRecommended: false,
    },
    1: {
        id: 1,
        displayName: 'Period',
        selected: false,
        isRecommended: false,
    },
    2: {
        id: 2,
        displayName: 'Organisation Unit',
        selected: false,
        isRecommended: false,
    },
};

/**
 *  TODO: FLytt get_DIMENSION til visualization.
 */
export default (state = DEFAULT_DIMENSIONS, action) => {
    switch (action.type) {
        case actionTypes.RECEIVED_DIMENSION: {
            return {
                ...state,
                [action.value]: {
                    ...state[action.value],
                    selected: !state[action.value].selected,
                },
            };
        }
        case actionTypes.GET_DIMENSIONS: {
            return { ...state, ...action.value };
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
