import { SET_RECOMMENDED_IDS } from '../reducers/recommendedIds.js'

export const acSetRecommendedIds = (value) => ({
    type: SET_RECOMMENDED_IDS,
    value,
})
