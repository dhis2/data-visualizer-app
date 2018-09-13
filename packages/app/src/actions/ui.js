import { actionTypes } from '../reducers';
import { acSetRecommendedIds } from './recommendedIds';
import { apiFetchRecommendedIds } from '../api/dimensions';

export const acSetUi = value => ({
    type: actionTypes.SET_UI,
    value,
});

export const acSetUiFromVisualization = value => ({
    type: actionTypes.SET_UI_FROM_VISUALIZATION,
    value,
});

export const acSetUiOptions = value => ({
    type: actionTypes.SET_UI_OPTIONS,
    value,
});

export const acSetUiLayout = value => ({
    type: actionTypes.SET_UI_LAYOUT,
    value,
});

export const acAddUiLayoutDimension = (axisId, dimensionId) => ({
    type: actionTypes.ADD_UI_LAYOUT_DIMENSION,
    axisId,
    dimensionId,
});

export const acSetUiItems = (id, value) => ({
    type: actionTypes.SET_UI_ITEMS,
    id,
    value,
});

export const acSetUiType = value => ({
    type: actionTypes.SET_UI_TYPE,
    value,
});
