import { actionTypes } from '../reducers';
import { onError } from './index';
import { apiFetchVisualization } from '../api/visualization';
import { acSetCurrent } from '../actions/current';

export const acSetVisualization = visualization => ({
    type: actionTypes.SET_VISUALIZATION,
    value: visualization,
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
