export const RECEIVED_SNACKBAR_MESSAGE = 'RECEIVED_SNACKBAR_MESSAGE';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

export const DEFAULT_SNACKBAR = {
    message: {},
    duration: null,
    open: false,
};

export default (state = DEFAULT_SNACKBAR, action) => {
    switch (action.type) {
        case RECEIVED_SNACKBAR_MESSAGE: {
            return { ...state, ...action.value };
        }
        case CLOSE_SNACKBAR: {
            return DEFAULT_SNACKBAR;
        }
        default:
            return state;
    }
};

// Selectors

export const sGetSnackbar = state => state.snackbar;
