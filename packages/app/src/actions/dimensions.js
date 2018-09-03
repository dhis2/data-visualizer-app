import { arrayToIdMap } from '../util';
import { actionTypes } from '../reducers';
import { apiFetchDimensions } from '../api/dimensions';

export const acSetDimension = value => ({
    type: actionTypes.RECEIVED_DIMENSION,
    value,
});

export const tSetDimensions = () => async dispatch => {
    const onSuccess = dimensions => {
        dispatch(acSetDimensions(dimensions));
    };

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
