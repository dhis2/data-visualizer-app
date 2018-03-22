import { actionTypes } from '../reducers';
import { apiFetchDimensions } from '../api/dimensions';

export const acSetDimensions = value => ({
    type: actionTypes.SET_DIMENSIONS,
    value,
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
        return onSuccess(apiFetchDimensions());
    } catch (err) {
        return onError(err);
    }
};
