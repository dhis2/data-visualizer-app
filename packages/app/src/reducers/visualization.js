export const actionTypes = {
    SET_VISUALIZATION: 'SET_VISUALIZATION',
};

export const DEFAULT_VISUALIZATION = null;

export default (state = DEFAULT_VISUALIZATION, action) => {
    switch (action.type) {
        case actionTypes.SET_VISUALIZATION: {
            return {
                ...action.value,
            };
        }
        default:
            return state;
    }
};

// Selectors

export const sGetVisualization = state => state.visualization;
