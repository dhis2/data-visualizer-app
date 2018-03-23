import { actionTypes } from '../reducers';
import { apiFetchDimensions } from '../api/dimensions';
import { arrayToIdMap } from '../util';

export const acSetDimensions = dimensions => ({
    type: actionTypes.SET_DIMENSIONS,
    value: arrayToIdMap(dimensions),
});

export const tSetDimensions = () => async (dispatch, getState) => {
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
