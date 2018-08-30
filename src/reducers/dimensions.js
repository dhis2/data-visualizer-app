import { orObject } from '../util';

export const actionTypes = {
    FETCH_DIMENSIONS: 'FETCH_DIMENSIONS',
    RECEIVED_DIMENSION: 'RECEIVED_DIMENSION',
    RECEIVED_RECOMMENDED: 'RECIEVED_RECOMMENDED_DIMENSION',
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

export default (state = DEFAULT_DIMENSIONS, action) => {
    switch (action.type) {
        case actionTypes.RECEIVED_DIMENSION: {
            console.log(action.value);
            return {
                ...state,
                [action.value.id]: {
                    ...state[action.value.id],
                    selected: action.value.selected,
                },
            };
        }
        case actionTypes.RECEIVED_RECOMMENDED: {
            return {
                ...state,
                [action.value.id]: {
                    ...state[action.value.id],
                    isRecommended: action.value.isRecommended,
                },
            };
        }
        case actionTypes.FETCH_DIMENSIONS: {
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
