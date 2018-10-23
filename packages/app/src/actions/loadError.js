import { SET_LOAD_ERROR, CLEAR_LOAD_ERROR } from '../reducers/loadError';

export const acSetLoadError = value => ({
    type: SET_LOAD_ERROR,
    value,
});

export const acClearLoadError = () => ({ type: CLEAR_LOAD_ERROR });
