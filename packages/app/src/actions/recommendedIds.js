import {
    SET_RECOMMENDED_IDS,
    SET_PREVIOUS_REQUESTED_IDS,
} from '../reducers/recommendedIds';

import { sGetPreviousRequestedIds } from '../reducers/recommendedIds';
import { apiFetchRecommendedIds } from '../api/dimensions';
import isEqual from 'lodash-es/isEqual';

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

    const previousIds = sGetPreviousRequestedIds(getState());

    const shouldFetchItems =
        !isEqual(value.dx, previousIds.dx) ||
        !isEqual(value.ou, previousIds.ou);

    if (shouldFetchItems) {
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
