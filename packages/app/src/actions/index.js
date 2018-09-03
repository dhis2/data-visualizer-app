import * as fromDimensions from './dimensions';
import * as fromSnackbar from './snackbar';
import * as fromUser from './user';
import * as fromVisualization from './visualization';
import * as fromCurrent from './current';

export {
    fromDimensions,
    fromSnackbar,
    fromUser,
    fromVisualization,
    fromCurrent,
};

export const onError = (action, error) => {
    console.log(`Error in action ${action}: ${error}`);
    return error;
};
