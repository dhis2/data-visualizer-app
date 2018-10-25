import keyBy from 'lodash-es/keyBy';
import { sortArray } from '../utils/util';
import { SET_DIMENSIONS } from '../reducers/dimensions';
import { apiFetchDimensions } from '../api/dimensions';
import { sGetDisplayNameProperty } from '../reducers/settings';

export const acSetDimensions = dimensions => ({
    type: SET_DIMENSIONS,
    value: keyBy(sortArray(dimensions, 'name'), 'id'),
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
