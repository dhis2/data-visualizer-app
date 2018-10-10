import i18n from '@dhis2/d2-i18n';

import {
    apiFetchVisualization,
    apiSaveVisualization,
} from '../api/visualization';

import * as fromDimensions from './dimensions';
import * as fromSnackbar from './snackbar';
import * as fromUser from './user';
import * as fromVisualization from './visualization';
import * as fromCurrent from './current';
import * as fromUi from './ui';
import * as fromLoadError from './loadError';

import { sGetCurrent } from '../reducers/current';

import history from '../history';

export {
    fromVisualization,
    fromCurrent,
    fromDimensions,
    fromUi,
    fromSnackbar,
    fromUser,
    fromLoadError,
};

export const onError = (action, error) => {
    console.log(`Error in action ${action}: ${error}`);
    return error;
};

// visualization, current, ui

export const tDoLoadVisualization = (type, id) => async (
    dispatch,
    getState
) => {
    const onSuccess = model => {
        const visualization = model.toJSON();

        dispatch(fromLoadError.acClearLoadError());
        dispatch(fromVisualization.acSetVisualization(visualization));
        dispatch(fromCurrent.acSetCurrent(visualization));
        dispatch(fromUi.acSetUiFromVisualization(visualization));
    };

    try {
        return onSuccess(await apiFetchVisualization(type, id));
    } catch (error) {
        dispatch(fromLoadError.acSetLoadError(error));
        dispatch(fromVisualization.acClear());
        dispatch(fromCurrent.acClear());
        dispatch(fromUi.acClear());

        return onError('tDoLoadVisualization', error);
    }
};

export const clearVisualization = dispatch => {
    dispatch(fromLoadError.acClearLoadError());
    dispatch(fromVisualization.acClear());
    dispatch(fromCurrent.acClear());
    dispatch(fromUi.acClear());
};

export const tDoSaveVisualization = (
    type,
    { name, description },
    copy
) => async (dispatch, getState) => {
    const onSuccess = res => {
        if (res.status === 'OK' && res.response.uid) {
            if (copy) {
                history.push(`/${res.response.uid}`);
            } else {
                history.replace(`/${res.response.uid}`);
            }
        }
    };

    try {
        const visualization = { ...sGetCurrent(getState()) };

        // remove the id to trigger a POST request and save a new AO
        if (copy) {
            delete visualization.id;
        }

        if (name) {
            visualization.name = name;
        }

        if (description) {
            visualization.description = description;
        }

        return onSuccess(await apiSaveVisualization(type, visualization));
    } catch (error) {
        return onError('tDoSaveVisualization', error);
    }
};

export const tDoDeleteVisualization = () => (dispatch, getState) => {
    const current = sGetCurrent(getState());

    dispatch(
        fromSnackbar.acReceivedSnackbarMessage({
            message: i18n.t('"{{what}}" successfully deleted.', {
                what: current.name,
            }),
            open: true,
            duration: 2000,
        })
    );

    history.push('/');
};
