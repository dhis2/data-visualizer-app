import { ADD_METADATA } from '../reducers/metadata.js'

export const acAddMetadata = value => ({
    type: ADD_METADATA,
    value,
})
