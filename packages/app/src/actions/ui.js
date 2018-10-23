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
    type: actionTypes.REMOVE_UI_LAYOUT_DIMENSIONS,
    value,
});

export const acSetUiItems = value => ({
    type: actionTypes.SET_UI_ITEMS,
    value,
});

export const acAddUiItems = value => ({
    type: actionTypes.ADD_UI_ITEMS,
    value,
});

export const acRemoveUiItems = value => ({
    type: actionTypes.REMOVE_UI_ITEMS,
    value,
});

export const acAddParentGraphMap = value => ({
    type: actionTypes.ADD_UI_PARENT_GRAPH_MAP,
    value,
});

export const acSetParentGraphMap = value => ({
    type: actionTypes.SET_UI_PARENT_GRAPH_MAP,
    value,
});

export const acSetUiActiveModalDialog = value => ({
    type: actionTypes.SET_UI_ACTIVE_MODAL_DIALOG,
    value,
});
