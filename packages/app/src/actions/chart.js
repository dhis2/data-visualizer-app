import { actionTypes } from '../reducers';

export const acSetChart = value => ({
    type: actionTypes.SET_CHART,
    value,
});
