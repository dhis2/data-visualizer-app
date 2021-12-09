import {
    SET_VISUALIZATION,
    CLEAR_VISUALIZATION,
} from '../reducers/visualization.js'

export const acSetVisualization = (visualization) => ({
    type: SET_VISUALIZATION,
    value: visualization,
})

export const acClear = () => ({
    type: CLEAR_VISUALIZATION,
})
