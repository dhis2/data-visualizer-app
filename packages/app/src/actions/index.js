import * as fromDimensions from './dimensions';
import * as fromSnackbar from './snackbar';
import * as fromUser from './user';
import * as fromVisualization from './visualization';
import * as fromCurrent from './current';
import * as fromUi from './ui';

export {
    fromVisualization,
    fromCurrent,
    fromDimensions,
    fromUi,
    fromSnackbar,
    fromUser,
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
    const visualization = await dispatch(
        fromVisualization.tSetVisualization(type, id)
    );

    dispatch(fromCurrent.acSetCurrent(visualization));
    dispatch(fromUi.acSetUiFromVisualization(visualization));
};

export const clearVisualization = dispatch => {
    dispatch(fromVisualization.acClear());
    dispatch(fromCurrent.acClear());
    dispatch(fromUi.acClear());
};
