import { apiFetchVisualization } from '../api/visualization';

import * as fromDimensions from './dimensions';
import * as fromSnackbar from './snackbar';
import * as fromUser from './user';
import * as fromVisualization from './visualization';
import * as fromCurrent from './current';
import * as fromUi from './ui';
import * as fromLoadError from './loadError';

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

        return onError('tDoLoadVisualization ', error);
    }
};

export const clearVisualization = dispatch => {
    dispatch(fromLoadError.acClearLoadError());
    dispatch(fromVisualization.acClear());
    dispatch(fromCurrent.acClear());
    dispatch(fromUi.acClear());
};
