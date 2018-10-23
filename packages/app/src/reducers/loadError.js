export const SET_LOAD_ERROR = 'SET_LOAD_ERROR';
export const CLEAR_LOAD_ERROR = 'CLEAR_LOAD_ERROR';

export const DEFAULT_LOAD_ERROR = null;

export default (state = DEFAULT_LOAD_ERROR, action) => {
    switch (action.type) {
        case SET_LOAD_ERROR: {
            return action.value;
        }
        case CLEAR_LOAD_ERROR:
            return DEFAULT_LOAD_ERROR;
        default:
            return state;
    }
};

// Selectors
export const sGetLoadError = state => state.loadError;
