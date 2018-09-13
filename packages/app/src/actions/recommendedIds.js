import { actionTypes } from '../reducers/recommendedIds';

export const acSetRecommendedIds = value => ({
    type: actionTypes.SET_DIMENSIONS,
    value,
});
