import { actionTypes } from '../reducers';
import { onError } from './index';
import { apiFetchVisualization } from '../api/visualization';
import { apiFetchDimensions } from '../api/dimensions';
import { acSetCurrent } from '../actions/current';

export const acSetVisualization = visualization => ({
    type: actionTypes.SET_VISUALIZATION,
    value: visualization,
});

export const acFetchDimensions = dimensions => ({
    type: actionTypes.FETCH_DIMENSIONS,
    value: arrayToIdMap(dimensions),
});

export const tSetVisualization = (type, id) => async (dispatch, getState) => {
    const onSuccess = visualization => {
        dispatch(acSetVisualization(visualization));
        dispatch(acSetCurrent(visualization));
    };

    try {
        const response = await apiFetchVisualization(type, id);
        return onSuccess(response);
    } catch (err) {
        return onError(err);
    }
};

export const tFetchDimensions = () => async dispatch => {
    const onSuccess = dimensions => {
        dispatch(acFetchDimensions(dimensions));
    };

    try {
        const response = await apiFetchDimensions();
        return onSuccess(response.dimensions);
    } catch (err) {
        return onError('Get Dimensions', err);
    }
};
