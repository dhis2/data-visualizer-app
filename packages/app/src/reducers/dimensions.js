import { FIXED_DIMENSIONS } from '../fixedDimensions';

export const actionTypes = {
    SET_DIMENSIONS: 'SET_DIMENSIONS',
};

export const DEFAULT_DIMENSIONS = FIXED_DIMENSIONS;

export default (state = DEFAULT_DIMENSIONS, action) => {
    switch (action.type) {
        case actionTypes.SET_DIMENSIONS: {
            return Object.assign({}, FIXED_DIMENSIONS, { ...action.value });
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

export const sGetSelected = () => [];
