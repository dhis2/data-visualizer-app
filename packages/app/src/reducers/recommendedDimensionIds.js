export const actionTypes = {
    SET_RECOMMENDED_DIMENSION_IDS: 'SET_RECOMMENDED_DIMENSION_IDS',
};

export const DEFAULT_RECOMMENDED_DIMENSION_IDS = [];

export default (state = DEFAULT_RECOMMENDED_DIMENSION_IDS, action) => {
    switch (action.type) {
        case actionTypes.SET_RECOMMENDED_DIMENSION_IDS: {
            return action.value;
        }
        default:
            return state;
    }
};

// selectors
export const sGetRecommended = state => state.recommendedDimensionIds || [];
