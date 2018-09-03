import { combineReducers } from 'redux';
import visualization, * as fromVisualization from './visualization';
import current, * as fromCurrent from './current';
import dimensions, * as fromDimensions from './dimensions';
import snackbar, * as fromSnackbar from './snackbar';
import user, * as fromUser from './user';

// action types

export const actionTypes = {
    ...fromDimensions.actionTypes,
    ...fromSnackbar.actionTypes,
    ...fromUser.actionTypes,
    ...fromVisualization.actionTypes,
    ...fromCurrent.actionTypes,
};

// reducers

export default combineReducers({
    dimensions,
    snackbar,
    user,
    visualization,
    current,
});

// selectors

export { fromDimensions, fromSnackbar, fromVisualization, fromCurrent };
