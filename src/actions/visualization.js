import { getDimensionMetadataFromVisualization } from '../modules/visualization.js'
import {
    SET_VISUALIZATION,
    CLEAR_VISUALIZATION,
} from '../reducers/visualization.js'

export const acSetVisualization = (visualization) => {
    const metadata = getDimensionMetadataFromVisualization(visualization)

    return {
        type: SET_VISUALIZATION,
        value: visualization,
        metadata,
    }
}

export const acClear = () => ({
    type: CLEAR_VISUALIZATION,
})
