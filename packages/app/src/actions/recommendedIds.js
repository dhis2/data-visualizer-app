import {
    SET_RECOMMENDED_IDS,
    SET_PREVIOUS_REQUESTED_IDS,
} from '../reducers/recommendedIds';

import { sGetPreviousRequestedIds } from '../reducers/recommendedIds';
import { apiFetchRecommendedIds } from '../api/dimensions';
import isEqual from 'lodash-es/isEqual';
import { sGetUiItems } from '../reducers/ui';

export const acSetRecommendedIds = value => ({
    type: SET_RECOMMENDED_IDS,
    value,
});

export const acSetPreviousRequestedIds = value => ({
    type: SET_PREVIOUS_REQUESTED_IDS,
    value,
});

export const tSetRecommendedIds = () => async (dispatch, getState) => {
    const previousIds = sGetPreviousRequestedIds(getState());
    const items = sGetUiItems(getState());

    const onSuccess = fetchedIds => {
        dispatch(acSetPreviousRequestedIds({ dx: items.dx, ou: items.ou }));
        dispatch(acSetRecommendedIds(fetchedIds));
    };

    const onError = error => {
        console.log('Error (apiFetchRecommendedIds): ', error);
    };

    let dxIds = [];
    let ouIds = [];

    if (items.dx && items.dx.length) {
        dxIds = items.dx;
    }

    if (items.ou && items.ou.length) {
        ouIds = items.ou;
    }

    const shouldFetchItems =
        !isEqual(dxIds, previousIds.dx) || !isEqual(ouIds, previousIds.ou);

    if (shouldFetchItems) {
        try {
            const recommendedIds = await apiFetchRecommendedIds(dxIds, ouIds);

            return onSuccess(recommendedIds);
        } catch (err) {
            return onError(err);
        }
    }
};
