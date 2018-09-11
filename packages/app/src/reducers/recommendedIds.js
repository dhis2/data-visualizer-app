export const actionTypes = {
    SET_RECOMMENDED_IDS: 'SET_RECOMMENDED_IDS',
};

export const DEFAULT_RECOMMENDED_IDS = [];

export default (state = DEFAULT_RECOMMENDED_IDS, action) => {
    switch (action.type) {
        case actionTypes.SET_RECOMMENDED_IDS: {
            return action.value;
        }
        default:
            return state;
    }
};

// Selectors
export const sGetRecommendedIds = state => state.recommendedIds;
