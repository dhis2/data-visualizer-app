import { combineReducers } from 'redux';
import visualization, * as fromVisualization from './visualization';
import current, * as fromCurrent from './current';
import dimensions, * as fromDimensions from './dimensions';
import recommendedIds, * as fromRecommendedIds from './recommendedIds';
import ui, * as fromUi from './ui';
import snackbar, * as fromSnackbar from './snackbar';
import user, * as fromUser from './user';
import loadError, * as fromLoadError from './loadError';

// Action types

export const actionTypes = {
    ...fromVisualization.actionTypes,
    ...fromCurrent.actionTypes,
    ...fromDimensions.actionTypes,
    ...fromRecommendedIds.actionTypes,
    ...fromUi.actionTypes,
    ...fromSnackbar.actionTypes,
    ...fromUser.actionTypes,
    ...fromLoadError.actionTypes,
};

// Reducers

export default combineReducers({
    visualization,
    current,
    dimensions,
    recommendedIds,
    ui,
    snackbar,
    user,
    loadError,
});

// Selectors

export {
    fromVisualization,
    fromCurrent,
    fromDimensions,
    fromRecommendedIds,
    fromUi,
    fromSnackbar,
    fromLoadError,
};
