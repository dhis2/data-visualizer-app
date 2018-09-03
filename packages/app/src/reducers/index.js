import { combineReducers } from 'redux';
import visualization, * as fromVisualization from './visualization';
import current, * as fromCurrent from './current';
import dimensions, * as fromDimensions from './dimensions';
import recommendedDimensionIds, * as fromRecommendedDimensionIds from './recommendedDimensionIds';
import snackbar, * as fromSnackbar from './snackbar';
import user, * as fromUser from './user';

// action types

export const actionTypes = {
    ...fromDimensions.actionTypes,
    ...fromRecommendedDimensionIds.actionTypes,
    ...fromSnackbar.actionTypes,
    ...fromUser.actionTypes,
    ...fromVisualization.actionTypes,
    ...fromCurrent.actionTypes,
};

// reducers

export default combineReducers({
    dimensions,
    recommendedDimensionIds,
    snackbar,
    user,
    visualization,
    current,
});

// selectors

export {
    fromDimensions,
    fromRecommendedDimensionIds,
    fromSnackbar,
    fromVisualization,
    fromCurrent,
};
