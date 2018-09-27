import { actionTypes } from '../reducers';

export const acSetVisualization = visualization => ({
    type: actionTypes.SET_VISUALIZATION,
    value: visualization,
});

export const acClear = () => ({
    type: actionTypes.CLEAR_VISUALIZATION,
});
