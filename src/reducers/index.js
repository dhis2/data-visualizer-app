import { combineReducers } from 'redux';
import dimensions, * as fromDimensions from './dimensions';
import snackbar, * as fromSnackbar from './snackbar';
import user, * as fromUser from './user';

// action types

export const actionTypes = {
    ...fromDimensions.actionTypes,
    ...fromSnackbar.actionTypes,
    ...fromUser.actionTypes,
};

// reducers

export default combineReducers({
    dimensions,
    snackbar,
    user,
});

// selectors

export { fromDimensions, fromSnackbar };
