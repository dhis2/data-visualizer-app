import {
    SET_UI,
    CLEAR_UI,
    SET_UI_FROM_VISUALIZATION,
    SET_UI_TYPE,
    SET_UI_OPTIONS,
    SET_UI_LAYOUT,
    ADD_UI_LAYOUT_DIMENSIONS,
    REMOVE_UI_LAYOUT_DIMENSIONS,
    SET_UI_ITEMS,
    ADD_UI_ITEMS,
    REMOVE_UI_ITEMS,
    ADD_UI_PARENT_GRAPH_MAP,
    SET_UI_PARENT_GRAPH_MAP,
    SET_UI_ACTIVE_MODAL_DIALOG,
    SET_UI_YEAR_ON_YEAR_SERIES,
    SET_UI_YEAR_ON_YEAR_CATEGORY,
} from '../reducers/ui';

export const acSetUi = value => ({
    type: SET_UI,
    value,
});

export const acClear = () => ({
    type: CLEAR_UI,
});

export const acSetUiFromVisualization = value => ({
    type: SET_UI_FROM_VISUALIZATION,
    value,
});

export const acSetUiType = value => ({
    type: SET_UI_TYPE,
    value,
});

export const acSetUiOptions = value => ({
    type: SET_UI_OPTIONS,
    value,
});

export const acSetUiLayout = value => ({
    type: SET_UI_LAYOUT,
    value,
});

export const acAddUiLayoutDimensions = value => ({
    type: ADD_UI_LAYOUT_DIMENSIONS,
    value,
});

export const acRemoveUiLayoutDimensions = value => ({
    type: REMOVE_UI_LAYOUT_DIMENSIONS,
    value,
});

export const acSetUiItems = value => ({
    type: SET_UI_ITEMS,
    value,
});

export const acAddUiItems = value => ({
    type: ADD_UI_ITEMS,
    value,
});

export const acRemoveUiItems = value => ({
    type: REMOVE_UI_ITEMS,
    value,
});

export const acSetUiYearOnYearSeries = value => ({
    type: SET_UI_YEAR_ON_YEAR_SERIES,
    value,
});

export const acSetUiYearOnYearCategory = value => ({
    type: SET_UI_YEAR_ON_YEAR_CATEGORY,
    value,
});

export const acAddParentGraphMap = value => ({
    type: ADD_UI_PARENT_GRAPH_MAP,
    value,
});

export const acSetParentGraphMap = value => ({
    type: SET_UI_PARENT_GRAPH_MAP,
    value,
});

export const acSetUiActiveModalDialog = value => ({
    type: SET_UI_ACTIVE_MODAL_DIALOG,
    value,
});
