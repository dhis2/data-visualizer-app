import { actionTypes } from '../reducers';
import { apiFetchDimensions } from '../api/dimensions';

export const acSetDimensions = value => ({
    type: actionTypes.SET_DIMENSIONS,
    value,
});

export const tSetDimensions = () => async (dispatch, getState) => {
    const onSuccess = () => {};

    const onError = error => {
        console.log('Error (apiFetchDimensions): ', error);
        return error;
    };

    try {
        const collection = await apiFetchDimensions();
        dispatch(acSetDimensions(collection.toArray()));

        return onSuccess();
    } catch (err) {
        return onError(err);
    }
};
