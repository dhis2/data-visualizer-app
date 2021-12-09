import {
    SET_LOAD_ERROR,
    CLEAR_LOAD_ERROR,
    SET_LOADING,
    SET_PLUGIN_LOADING,
} from '../reducers/loader.js'

export const acSetLoadError = (value) => ({
    type: SET_LOAD_ERROR,
    value,
})

export const acClearLoadError = () => ({ type: CLEAR_LOAD_ERROR })

export const acSetLoading = (value) => ({
    type: SET_LOADING,
    value,
})

export const acSetPluginLoading = (value) => ({
    type: SET_PLUGIN_LOADING,
    value,
})
