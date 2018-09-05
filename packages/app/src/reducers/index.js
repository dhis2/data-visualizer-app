import { combineReducers } from 'redux';
import visualization, * as fromVisualization from './visualization';
import current, * as fromCurrent from './current';
import dimensions, * as fromDimensions from './dimensions';
import recommendedDimensionIds, * as fromRecommendedDimensionIds from './recommendedDimensionIds';
import ui, * as fromUi from './ui';
import snackbar, * as fromSnackbar from './snackbar';
import user, * as fromUser from './user';

// action types

export const actionTypes = {
    ...fromVisualization.actionTypes,
    ...fromCurrent.actionTypes,
    ...fromDimensions.actionTypes,
    ...fromRecommendedDimensionIds.actionTypes,
    ...fromUi.actionTypes,
    ...fromSnackbar.actionTypes,
    ...fromUser.actionTypes,
};

// reducers

export default combineReducers({
    visualization,
    current,
    dimensions,
    recommendedDimensionIds,
    ui,
    snackbar,
    user,
});

// selectors

export {
    fromVisualization,
    fromCurrent,
    fromDimensions,
    fromRecommendedDimensionIds,
    fromUi,
    fromSnackbar,
};
