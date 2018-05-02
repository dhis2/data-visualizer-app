import { actionTypes } from '../reducers';
import { apiFetchVisualization } from '../api/visualization';

export const acSetVisualization = visualization => ({
    type: actionTypes.SET_VISUALIZATION,
    value: visualization,
});

export const tSetVisualization = (type, id) => async (dispatch, getState) => {
    const onSuccess = visualization => {
        dispatch(acSetVisualization(visualization));
    };

    const onError = error => {
        console.log('Error (apiFetchVisualization): ', error);
        return error;
    };

    try {
        const response = await apiFetchVisualization(type, id);
        return onSuccess(response);
    } catch (err) {
        return onError(err);
    }
};
