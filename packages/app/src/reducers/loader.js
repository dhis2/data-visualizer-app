export const SET_LOAD_ERROR = 'SET_LOAD_ERROR'
export const CLEAR_LOAD_ERROR = 'CLEAR_LOAD_ERROR'
export const SET_LOADING = 'SET_LOADING'
export const SET_PLUGIN_LOADING = 'SET_PLUGIN_LOADING'

export const DEFAULT_LOADING = {
    isLoading: false,
    loadingError: null,
    isPluginLoading: true,
}

export default (state = DEFAULT_LOADING, action) => {
    switch (action.type) {
        case SET_LOAD_ERROR: {
            return {
                ...state,
                loadingError: action.value,
            }
        }
        case CLEAR_LOAD_ERROR:
            return {
                ...state,
                loadingError: DEFAULT_LOADING.loadingError,
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.value,
            }
        case SET_PLUGIN_LOADING:
            return {
                ...state,
                isPluginLoading: action.value,
            }
        default:
            return state
    }
}

// Selectors
export const sGetLoadError = (state) => state.loader.loadingError
export const sGetIsLoading = (state) => state.loader.isLoading
export const sGetIsPluginLoading = (state) => state.loader.isPluginLoading
