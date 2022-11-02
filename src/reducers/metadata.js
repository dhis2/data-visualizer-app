export const ADD_METADATA = 'ADD_METADATA'

export const DEFAULT_METADATA = {}

export default (state = DEFAULT_METADATA, action) => {
    switch (action.type) {
        case ADD_METADATA: {
            return {
                ...state,
                ...action.value,
            }
        }
        default:
            return state
    }
}

// Selectors

export const sGetMetadata = (state) => state.metadata
