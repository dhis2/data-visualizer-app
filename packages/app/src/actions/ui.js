import { actionTypes } from '../reducers';
//import { acSetRecommendedIds } from './recommendedIds';
//import { apiFetchRecommendedIds } from '../api/dimensions';

export const acSetUi = value => ({
    type: actionTypes.SET_UI,
    value,
});

export const acSetUiFromVisualization = value => ({
    type: actionTypes.SET_UI_FROM_VISUALIZATION,
    value,
});

export const acSetUiType = value => ({
    type: actionTypes.SET_UI_TYPE,
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

export const acAddUiLayoutDimensions = value => ({
    type: actionTypes.ADD_UI_LAYOUT_DIMENSIONS,
    value,
});

export const acRemoveUiLayoutDimensions = value => ({
    type: actionTypes.REMOVE_UI_LAYOUT_DIMENSION,
    value,
});

export const acSetUiItems = value => {
    console.log(value);
    return {
        type: actionTypes.SET_UI_ITEMS,
        value,
    };
};
