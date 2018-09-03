import { onError } from './index';
import { arrayToIdMap } from '../util';
import { actionTypes } from '../reducers';
import { apiFetchRecommended, apiFetchDimensions } from '../api/dimensions';

export const acSetDimensions = dimensions => ({
    type: actionTypes.SET_DIMENSIONS,
    value: arrayToIdMap(dimensions),
});

export const tSetDimensions = () => async dispatch => {
    const onSuccess = dimensions => {
        dispatch(acSetDimensions(dimensions));
    };

    const onError = error => {
        console.log('Error (apiFetchDimensions): ', error);
        return error;
    };

    try {
        const response = await apiFetchDimensions();
        return onSuccess(response.dimensions);
    } catch (err) {
        return onError(err);
    }
};

// recommended dimensions
export const acSetRecommended = value => ({
    type: actionTypes.RECEIVED_RECOMMENDED,
    value,
});

export const tSetRecommendedDimensions = () => async dispatch => {
    try {
        const recommendedIds = await apiFetchRecommended(null, null);
        dispatch(acSetRecommended(recommendedIds));
    } catch (err) {
        return onError('Set Dimensions', err);
    }
};
