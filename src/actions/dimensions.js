import { onError } from './index';
import { actionTypes } from '../reducers';
import { apiFetchRecommended } from '../api/dimensions';

export const acSetDimension = value => ({
    type: actionTypes.RECEIVED_DIMENSION,
    value,
});

const updateDimensionsInStore = (dimension, dispatch) => {
    dispatch(acSetDimension(dimension));
};

export const tSetDimensions = dimensions => async dispatch => {
    try {
        await apiFetchRecommended(dimensions);
        return updateDimensionsInStore(dimensions, dispatch);
    } catch (err) {
        return onError('Set Dimensions', err);
    }
};
