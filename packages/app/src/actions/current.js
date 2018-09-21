import { actionTypes } from '../reducers';

export const acSetCurrent = value => ({
    type: actionTypes.SET_CURRENT,
    value,
});

export const acClear = () => ({
    type: actionTypes.CLEAR_CURRENT,
});

export const acSetCurrentFromUi = value => ({
    type: actionTypes.SET_CURRENT_FROM_UI,
    value,
});
