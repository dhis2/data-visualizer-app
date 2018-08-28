import { arrayToIdMap } from '../util';
import { onError } from './index';
import { actionTypes } from '../reducers';
import { apiFetchDimensions, apiFetchRecommended } from '../api/dimensions';

export const acGetDimensions = dimensions => ({
    type: actionTypes.GET_DIMENSIONS,
    value: arrayToIdMap(dimensions),
});

export const acSetDimension = value => ({
    type: actionTypes.RECEIVED_DIMENSION,
    value,
});

const updateDimensionsInStore = (dimension, dispatch) => {
    dispatch(acSetDimension(dimension));
};

export const tGetDimensions = () => async dispatch => {
    const onSuccess = dimensions => {
        dispatch(acGetDimensions(dimensions));
    };

    try {
        const response = await apiFetchDimensions();
        return onSuccess(response.dimensions);
    } catch (err) {
        return onError(err);
    }
};

export const tSetDimensions = dimensions => async dispatch => {
    try {
        await apiFetchRecommended(dimensions);
        return updateDimensionsInStore(dimensions, dispatch);
    } catch (err) {
        return onError('Set Dimensions', err);
    }
};
