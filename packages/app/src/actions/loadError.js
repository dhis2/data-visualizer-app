import { actionTypes } from '../reducers';

export const acSetLoadError = value => ({
    type: actionTypes.SET_LOAD_ERROR,
    value,
});

export const acClearLoadError = () => ({ type: actionTypes.CLEAR_LOAD_ERROR });
