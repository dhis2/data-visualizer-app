import { combineReducers } from 'redux';

export const actionTypes = {
    FETCH_DIMENSIONS: 'FETCH_DIMENSIONS',
    RECEIVED_DIMENSION: 'RECEIVED_DIMENSION',
    RECEIVED_RECOMMENDED: 'RECIEVED_RECOMMENDED_DIMENSION',
};

export const DEFAULT_RECOMMENDED_DIMENSIONS = [];

export const DEFAULT_DIMENSIONS = {
    0: {
        id: 0,
        displayName: 'Data',
        selected: false,
    },
    1: {
        id: 1,
        displayName: 'Period',
        selected: false,
    },
    2: {
        id: 2,
        displayName: 'Organisation Unit',
        selected: false,
    },
};

const selected = (state = DEFAULT_DIMENSIONS, action) => {
    switch (action.type) {
        case actionTypes.RECEIVED_DIMENSION: {
            return {
                ...state,
                [action.value.id]: {
                    ...state[action.value.id],
                    selected: action.value.selected,
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

const recommendedDims = (state = DEFAULT_RECOMMENDED_DIMENSIONS, action) => {
    switch (action.type) {
        case actionTypes.RECEIVED_RECOMMENDED: {
            return action.value;
        }
        default:
            return state;
    }
};

export default combineReducers({
    selected,
    recommendedDims,
});
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
export const sGetFromState = state => state.dimensions;

export const sGetSelected = state => sGetFromState(state).selected;

export const sGetRecommended = state => sGetFromState(state).recommendedDims;
