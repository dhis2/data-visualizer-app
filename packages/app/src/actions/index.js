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

export const tDoLoadVisualization = (type, id) => async (
    dispatch,
    getState
) => {
    const visualization = await fromVisualization.tSetVisualization(type, id);

    dispatch(fromCurrent.acSetCurrent(visualization));
    dispatch(fromUi.acSetUiFromVisualization(visualization));
};
