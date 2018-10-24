import { arrayToIdMap, sortArray } from '../util';
import { SET_DIMENSIONS } from '../reducers/dimensions';
import { apiFetchDimensions } from '../api/dimensions';

const propName = 'displayName';

export const acSetDimensions = dimensions => ({
    type: SET_DIMENSIONS,
    value: arrayToIdMap(sortArray(dimensions, propName)),
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
