export const RECEIVED_SNACKBAR_MESSAGE = 'RECEIVED_SNACKBAR_MESSAGE'
export const CLEAR_SNACKBAR = 'CLEAR_SNACKBAR'

export const DEFAULT_SNACKBAR = {
    message: null,
    duration: null,
}

export default (state = DEFAULT_SNACKBAR, action) => {
    switch (action.type) {
        case RECEIVED_SNACKBAR_MESSAGE: {
            return { ...state, ...action.value }
        }
        case CLEAR_SNACKBAR: {
            return DEFAULT_SNACKBAR
        }
        default:
            return state
    }
}

// Selectors

export const sGetSnackbar = (state) => state.snackbar
