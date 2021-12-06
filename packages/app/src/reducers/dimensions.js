import { getPredefinedDimensions } from '@dhis2/analytics'

export const SET_DIMENSIONS = 'SET_DIMENSIONS'
export const SET_SELECTED_DIMENSION = 'SET_SELECTED_DIMENSION'

export const DEFAULT_DIMENSIONS = getPredefinedDimensions()

export default (state = DEFAULT_DIMENSIONS, action) => {
    switch (action.type) {
        case SET_DIMENSIONS: {
            return {
                ...DEFAULT_DIMENSIONS,
                ...action.value,
            }
        }
        default:
            return state
    }
}

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
export const sGetDimensions = (state) => state.dimensions
