import {
    SET_VISUALIZATION,
    CLEAR_VISUALIZATION,
} from '../reducers/visualization';

export const acSetVisualization = visualization => ({
    type: SET_VISUALIZATION,
    value: visualization,
    dataStatisticsId: visualization.id,
});

export const acClear = () => ({
    type: CLEAR_VISUALIZATION,
});
