export const actionTypes = {
    SET_DIMENSIONS: 'SET_DIMENSIONS',
};

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

export default (state = DEFAULT_DIMENSIONS, action) => {
    switch (action.type) {
        case actionTypes.SET_DIMENSIONS: {
            return action.value;
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
export const sGetDimensions = state => state.dimensions;
export const sGetRecommended = state => ({});
