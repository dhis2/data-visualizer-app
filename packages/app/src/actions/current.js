import {
    SET_CURRENT,
    SET_CURRENT_FROM_UI,
    CLEAR_CURRENT,
} from '../reducers/current';

export const acSetCurrent = value => ({
    type: SET_CURRENT,
    value,
});

export const acClear = () => ({
    type: CLEAR_CURRENT,
});

export const acSetCurrentFromUi = value => ({
    type: SET_CURRENT_FROM_UI,
    value,
});
