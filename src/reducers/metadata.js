import getDefaultMetadata from '../modules/metadata.js'

export const ADD_METADATA = 'ADD_METADATA'

export const DEFAULT_METADATA = getDefaultMetadata()

export default (state = DEFAULT_METADATA, action) => {
    switch (action.type) {
        case ADD_METADATA: {
            const result = { ...state }
            Object.entries(action.value).forEach(([key, value]) => {
                // Default metadata is translated by the client, so never overwrite with values from the server
                if (value.id in DEFAULT_METADATA) {
                    return
                }

                result[key] = { ...result[key], ...value }
            })
            return result
        }
        default:
            return state
    }
}

// Selectors

export const sGetMetadata = (state) => state.metadata
