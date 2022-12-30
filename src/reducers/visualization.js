export const SET_VISUALIZATION = 'SET_VISUALIZATION'
export const CLEAR_VISUALIZATION = 'CLEAR_VISUALIZATION'

export const DEFAULT_VISUALIZATION = null

export default (state = DEFAULT_VISUALIZATION, action) => {
    switch (action.type) {
        case SET_VISUALIZATION: {
            return action.value
        }
        case CLEAR_VISUALIZATION: {
            return DEFAULT_VISUALIZATION
        }
        default:
            return state
    }
}

// Selectors

export const sGetVisualization = (state) => state.visualization
export const sGetInterpretations = (state) =>
    state.visualization ? state.visualization.interpretations : []
