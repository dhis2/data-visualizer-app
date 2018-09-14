import { actionTypes } from '../reducers';

export const acSetCurrent = value => ({
    type: actionTypes.SET_CURRENT,
    value,
});

export const acSetCurrentFromUi = value => ({
    type: actionTypes.SET_CURRENT_FROM_UI,
    value,
});
