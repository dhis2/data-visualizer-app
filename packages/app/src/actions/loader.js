import {
    SET_LOAD_ERROR,
    CLEAR_LOAD_ERROR,
    SET_LOADING,
} from '../reducers/loader'

export const acSetLoadError = value => ({
    type: SET_LOAD_ERROR,
    value,
})

export const acClearLoadError = () => ({ type: CLEAR_LOAD_ERROR })

export const acSetLoading = value => ({
    type: SET_LOADING,
    value,
})
