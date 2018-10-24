import { arrayToIdMap, sortArray } from '../util';
import { actionTypes } from '../reducers';
import { apiFetchDimensions } from '../api/dimensions';
import { sGetDisplayNameProperty } from '../reducers/settings';

export const acSetDimensions = dimensions => ({
    type: actionTypes.SET_DIMENSIONS,
    value: arrayToIdMap(sortArray(dimensions, 'name')),
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
        const displayNameProp = sGetDisplayNameProperty(getState());
        const dimensions = await apiFetchDimensions(displayNameProp);
        return onSuccess(dimensions);
    } catch (err) {
        return onError(err);
    }
};
