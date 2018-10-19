import { actionTypes } from '../reducers';
import { apiFetchSystemSettings } from '../api/settings';

export const acSetSettings = value => ({
    type: actionTypes.SET_SETTINGS,
    value,
});

export const acAddSettings = value => ({
    type: actionTypes.ADD_SETTINGS,
    value,
});

export const tAddSettings = (...extraSettings) => async dispatch => {
    const onSuccess = fetchedSettings => {
        dispatch(
            acAddSettings(Object.assign({}, fetchedSettings, ...extraSettings))
        );
    };

    const onError = error => {
        console.log('Error (apiFetchSystemSettings): ', error);
        return error;
    };

    try {
        const systemSettings = await apiFetchSystemSettings();
        return onSuccess(systemSettings);
    } catch (err) {
        return onError(err);
    }
};
