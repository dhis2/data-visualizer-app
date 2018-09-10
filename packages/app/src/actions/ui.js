import { actionTypes } from '../reducers';

export const acSetUi = value => ({
    type: actionTypes.SET_UI,
    value: value,
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

export const acSetUiItems = (id, value) => ({
    type: actionTypes.SET_UI_ITEMS,
    id,
    value,
});
