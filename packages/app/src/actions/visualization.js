import { actionTypes } from '../reducers';
import { onError } from './index';
import { apiFetchVisualization } from '../api/visualization';

export const acSetVisualization = visualization => ({
    type: actionTypes.SET_VISUALIZATION,
    value: visualization,
});

export const tSetVisualization = (type, id) => async (dispatch, getState) => {
    const onSuccess = model => {
        const visualization = model.toJSON();
        dispatch(acSetVisualization(visualization));
        return visualization;
    };

    try {
        return onSuccess(await apiFetchVisualization(type, id));
    } catch (err) {
        return onError(err);
    }
};
