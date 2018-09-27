export const actionTypes = {
    SET_VISUALIZATION: 'SET_VISUALIZATION',
    CLEAR_VISUALIZATION: 'CLEAR_VISUALIZATION',
};

export const DEFAULT_VISUALIZATION = null;

export default (state = DEFAULT_VISUALIZATION, action) => {
    switch (action.type) {
        case actionTypes.SET_VISUALIZATION: {
            return action.value;
        }
        case actionTypes.CLEAR_VISUALIZATION: {
            return DEFAULT_VISUALIZATION;
        }
        default:
            return state;
    }
};

// Selectors

export const sGetVisualization = state => state.visualization;
