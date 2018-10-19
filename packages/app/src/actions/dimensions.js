import { arrayToIdMap, sortArray } from '../util';
import { actionTypes } from '../reducers';
import { apiFetchDimensions } from '../api/dimensions';

export const acSetDimensions = dimensions => ({
    type: actionTypes.SET_DIMENSIONS,
    value: arrayToIdMap(sortArray(dimensions, 'name')),
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
