export const SET_RECOMMENDED_IDS = 'SET_RECOMMENDED_IDS'

export const DEFAULT_RECOMMENDED_IDS = []

export default (state = DEFAULT_RECOMMENDED_IDS, action) => {
    switch (action.type) {
        case SET_RECOMMENDED_IDS: {
            return action.value || DEFAULT_RECOMMENDED_IDS
        }
        default:
            return state
    }
}

// Selectors
export const sGetRecommendedIds = (state) => state.recommendedIds
