import { actionTypes } from '../reducers';

export const acSetUi = ui => ({
    type: actionTypes.SET_IU,
    value: ui,
});

export const acSetUiFromVisualization = visualization => ({
    type: actionTypes.SET_IU_FROM_VISUALIZATION,
    value: visualization,
});

export const acSetUiOptions = options => ({
    type: actionTypes.SET_IU_OPTIONS,
    value: options,
});

export const acSetUiLayout = layout => ({
    type: actionTypes.SET_IU_LAYOUT,
    value: layout,
});

export const acSetUiItems = (id, items) => ({
    type: actionTypes.SET_IU_ITEMS,
    id,
    value: items,
});
