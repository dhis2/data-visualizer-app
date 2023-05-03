export const ADD_METADATA = 'ADD_METADATA'

export const DEFAULT_METADATA = {}

export default (state = DEFAULT_METADATA, action) => {
    switch (action.type) {
        case ADD_METADATA: {
            const result = { ...state }
            Object.entries(action.value).forEach(
                ([key, value]) => (result[key] = { ...result[key], ...value })
            )
            return result
        }
        default:
            return state
    }
}

// Selectors

export const sGetMetadata = (state) => state.metadata
