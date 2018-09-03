import { onError } from './index';
import { actionTypes } from '../reducers';
import { apiFetchRecommended } from '../api/dimensions';

export const acSetDimension = value => ({
    type: actionTypes.RECEIVED_DIMENSION,
    value,
});

export const acSetRecommended = value => ({
    type: actionTypes.RECEIVED_RECOMMENDED,
    value,
});

const updateDimensionsInStore = (selectedDim, recommendedDim, dispatch) => {
    dispatch(acSetDimension(selectedDim));
    dispatch(acSetRecommended(recommendedDim));
};

export const tSetDimensions = dimension => async dispatch => {
    try {
        const recommendedIds = await apiFetchRecommended(null, null);
        return updateDimensionsInStore(dimension, recommendedIds, dispatch);
    } catch (err) {
        return onError('Set Dimensions', err);
    }
};
