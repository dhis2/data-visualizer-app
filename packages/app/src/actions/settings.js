import { actionTypes } from '../reducers';
import { apiFetchSystemSettings, apiFetchUserSettings } from '../api/settings';
import { getPropsByKeys } from '../util';
import { USER_SETTINGS } from '../settings';

export const acSetSettings = value => ({
    type: actionTypes.SET_SETTINGS,
    value,
});

export const tSetSettings = () => async dispatch => {
    const onSuccess = (ss, us) => {
        console.log(ss, getPropsByKeys(us, USER_SETTINGS));
        dispatch(
            acSetSettings({
                ...ss,
                ...getPropsByKeys(us, USER_SETTINGS),
            })
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
        const systemSettings = await apiFetchSystemSettings();
        const userSettings = await apiFetchUserSettings();
        return onSuccess(systemSettings, userSettings);
    } catch (err) {
        return onError(err);
    }
};
