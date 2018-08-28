export const actionTypes = {
    SET_VISUALIZATION: 'SET_VISUALIZATION',
};

export const DEFAULT_VISUALIZATION = {};

export default (state = DEFAULT_VISUALIZATION, action) => {
    switch (action.type) {
        case actionTypes.SET_VISUALIZATION: {
            return action.value;
        }
        default:
            return state;
    }
};

export const sGetFromState = state => state.visualization;
