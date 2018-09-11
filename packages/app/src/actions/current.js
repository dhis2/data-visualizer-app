import { actionTypes } from '../reducers';

export const acSetCurrent = value => ({
    type: actionTypes.SET_CURRENT,
    value,
});
