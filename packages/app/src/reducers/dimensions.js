import { FIXED_DIMENSIONS } from '@dhis2/analytics';

export const SET_DIMENSIONS = 'SET_DIMENSIONS';
export const SET_SELECTED_DIMENSION = 'SET_SELECTED_DIMENSION';

const getDefaultDimensions = () => {
    return Object.keys(FIXED_DIMENSIONS).reduce((acc, key) => {
        const dimObj = {
            id: FIXED_DIMENSIONS[key].id,
            iconName: FIXED_DIMENSIONS[key].iconName,
            name: FIXED_DIMENSIONS[key].name(),
        };
        acc[key] = dimObj;
        return acc;
    }, {});
};

export default (state = getDefaultDimensions(), action) => {
    switch (action.type) {
        case SET_DIMENSIONS: {
            return {
                ...getDefaultDimensions(),
                ...action.value,
            };
        }
        default:
            return state;
    }
};

// Selectors

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
