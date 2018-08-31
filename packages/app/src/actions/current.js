import { actionTypes } from '../reducers';

export const acSetCurrent = current => ({
    type: actionTypes.SET_CURRENT,
    value: current,
});
