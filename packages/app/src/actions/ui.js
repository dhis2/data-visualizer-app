import { actionTypes } from '../reducers';

export const acSetUi = value => ({
    type: actionTypes.SET_UI,
    value,
});

export const acClear = () => ({
    type: actionTypes.CLEAR_UI,
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

export const acSetUiItems = value => ({
    type: actionTypes.SET_UI_ITEMS,
    value,
});

export const acAddUiItem = value => ({
    type: actionTypes.ADD_UI_ITEM,
    value,
});

export const acRemoveUiItem = value => ({
    type: actionTypes.REMOVE_UI_ITEM,
    value,
});
