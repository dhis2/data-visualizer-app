import { actionTypes } from '../reducers';

export const acSetUi = ui => ({
    type: actionTypes.SET_IU,
    value: ui,
});

export const acSetUiFromVisualization = value => ({
    type: actionTypes.SET_UI_FROM_VISUALIZATION,
    value,
});

export const acSetUiOptions = value => ({
    type: actionTypes.SET_IU_OPTIONS,
    value,
});

export const acSetUiLayout = value => ({
    type: actionTypes.SET_IU_LAYOUT,
    value,
});

export const acSetUiItems = (id, value) => ({
    type: actionTypes.SET_IU_ITEMS,
    id,
    value,
});
