import { actionTypes } from '../reducers';
import { apiFetchSystemSettings, apiFetchUserSettings } from '../api/settings';

export const acSetSettings = value => ({
    type: actionTypes.SET_SETTINGS,
    value,
});

export const tSetSettings = () => async dispatch => {
    const onSuccess = settings => {
        console.log('settings', settings);
        dispatch(
            acSetSettings(
                settings.reduce((all, obj) => ({ ...all, ...obj }), {})
            )
        );
    };

    const onError = error => {
        console.log(
            'Error (apiFetchSystemSettings/apiFetchUserSettings): ',
            error
        );
        return error;
    };

    try {
        const settings = await Promise.all([
            apiFetchSystemSettings(),
            apiFetchUserSettings(),
        ]);
        // const systemSettings = await apiFetchSystemSettings();
        // const userSettings = await apiFetchUserSettings();
        return onSuccess(settings);
    } catch (err) {
        return onError(err);
    }
};
