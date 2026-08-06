import { ADD_METADATA, OVERRIDE_METADATA } from '../reducers/metadata.js'

export const acAddMetadata = (value) => ({
    type: ADD_METADATA,
    value,
})

export const acOverrideMetadata = (value) => ({
    type: OVERRIDE_METADATA,
    value,
})
