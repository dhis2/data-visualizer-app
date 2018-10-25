import {
    SET_RECOMMENDED_IDS,
    SET_PREVIOUS_REQUESTED_IDS,
} from '../reducers/recommendedIds';

import { sGetPreviousRequestedIds } from '../reducers/recommendedIds';
import { apiFetchRecommendedIds } from '../api/dimensions';
import { arrayIsEqual } from '../util';

export const acSetRecommendedIds = value => ({
    type: SET_RECOMMENDED_IDS,
    value,
});

export const acSetPreviousRequestedIds = value => ({
    type: SET_PREVIOUS_REQUESTED_IDS,
    value,
});

export const tSetRecommendedIds = value => async (dispatch, getState) => {
    const onSuccess = fetchedIds => {
        dispatch(acSetPreviousRequestedIds(value));
        dispatch(acSetRecommendedIds(fetchedIds));
    };

    const onError = error => {
        console.log('Error (apiFetchRecommendedIds): ', error);
    };

    const previousRecommended = sGetPreviousRequestedIds(getState());

    const isEqual =
        arrayIsEqual(value.dx, previousRecommended.dx) &&
        arrayIsEqual(value.ou, previousRecommended.ou);

    if (!isEqual) {
        try {
            const recommendedIds = await apiFetchRecommendedIds(
                value.dx,
                value.ou
            );

            return onSuccess(recommendedIds);
        } catch (err) {
            return onError(err);
        }
    }
};
