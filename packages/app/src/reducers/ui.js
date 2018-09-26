import {
    getDimensionIdsByAxis,
    getItemIdsByDimension,
    getFilteredLayout,
    getSwapModObj,
} from '../layout';
import { getOptionsForUi, getOptionsFromVisualization } from '../options';
import { COLUMN } from '../components/VisualizationTypeSelector/visualizationTypes';

export const actionTypes = {
    SET_UI: 'SET_UI',
    SET_UI_FROM_VISUALIZATION: 'SET_UI_FROM_VISUALIZATION',
    SET_UI_TYPE: 'SET_UI_TYPE',
    SET_UI_OPTIONS: 'SET_UI_OPTIONS',
    SET_UI_LAYOUT: 'SET_UI_LAYOUT',
    ADD_UI_LAYOUT_DIMENSIONS: 'ADD_UI_LAYOUT_DIMENSIONS',
    SET_UI_ITEMS: 'SET_UI_ITEMS',
    REMOVE_UI_LAYOUT_DIMENSION: 'REMOVE_UI_LAYOUT_DIMENSION',
};

export const DEFAULT_UI = {
    type: COLUMN,
    options: getOptionsForUi(),
    layout: {
        columns: ['dx'],
        rows: ['pe'],
        filters: ['ou'],
    },
    itemsByDimension: {
        dx: [],
        pe: ['LAST_12_MONTHS'],
        ou: ['USER_ORGUNIT'],
    },
};

export default (state = DEFAULT_UI, action) => {
    switch (action.type) {
        case actionTypes.SET_UI: {
            return {
                ...action.value,
            };
        }
        case actionTypes.SET_UI_FROM_VISUALIZATION: {
            return {
                type: action.value.type,
                options: getOptionsFromVisualization(action.value),
                layout: getDimensionIdsByAxis(action.value),
                itemsByDimension: getItemIdsByDimension(action.value),
            };
        }
        case actionTypes.SET_UI_TYPE: {
            return {
                ...state,
                type: action.value,
            };
        }
        case actionTypes.SET_UI_OPTIONS: {
            return {
                ...state,
                options: {
                    ...state.options,
                    ...action.value,
                },
            };
        }
        case actionTypes.SET_UI_LAYOUT: {
            return {
                ...state,
                layout: {
                    ...action.value,
                },
            };
        }
        // action.value: mod object (dimensionId:axisName) saying what to add where: { ou: 'rows' }
        // Reducer takes care of swapping if dimension already exists in layout
        case actionTypes.ADD_UI_LAYOUT_DIMENSIONS: {
            const modObjWithSwap = {
                ...action.value,
                ...getSwapModObj(state.layout, action.value),
            };

            const newLayout = getFilteredLayout(
                state.layout,
                Object.keys(modObjWithSwap)
            );

            Object.entries(modObjWithSwap).forEach(
                ([dimensionId, axisName]) => {
                    if (['columns', 'rows'].includes(axisName)) {
                        newLayout[axisName] = [dimensionId];
                    } else {
                        newLayout[axisName].push(dimensionId);
                    }
                }
            );

            return {
                ...state,
                layout: newLayout,
            };
        }
        case actionTypes.REMOVE_UI_LAYOUT_DIMENSION: {
            return {
                ...state,
                layout: getFilteredLayout(state.layout, action.value),
            };
        }
        case actionTypes.SET_UI_ITEMS: {
            return {
                ...state,
                itemsByDimension: {
                    ...action.value,
                },
            };
        }
        default:
            return state;
    }
};

// Selectors

export const sGetUi = state => state.ui;

export const sGetUiOptions = state => sGetUi(state).options;
export const sGetUiLayout = state => sGetUi(state).layout;
export const sGetUiItems = state => sGetUi(state).itemsByDimension;
export const sGetUiType = state => sGetUi(state).type;

export const sGetDimensionIdsFromLayout = state =>
    Object.values(sGetUiLayout(state)).reduce(
        (ids, axis) => ids.concat(axis),
        []
    );
