import {
    getDimensionIdsByAxis,
    getItemIdsByDimension,
    getFilteredLayout,
    getSwapModObj,
} from '../modules/layout';
import {
    getOptionsForUi,
    getOptionsFromVisualization,
} from '../modules/options';
import { COLUMN, YEAR_ON_YEAR } from '../modules/chartTypes';
import { FIXED_DIMENSIONS } from '../modules/fixedDimensions';
import { toArray } from '../modules/array';

export const SET_UI = 'SET_UI';
export const SET_UI_FROM_VISUALIZATION = 'SET_UI_FROM_VISUALIZATION';
export const SET_UI_TYPE = 'SET_UI_TYPE';
export const SET_UI_OPTIONS = 'SET_UI_OPTIONS';
export const SET_UI_LAYOUT = 'SET_UI_LAYOUT';
export const ADD_UI_LAYOUT_DIMENSIONS = 'ADD_UI_LAYOUT_DIMENSIONS';
export const REMOVE_UI_LAYOUT_DIMENSIONS = 'REMOVE_UI_LAYOUT_DIMENSIONS';
export const SET_UI_ITEMS = 'SET_UI_ITEMS';
export const ADD_UI_ITEMS = 'ADD_UI_ITEMS';
export const REMOVE_UI_ITEMS = 'REMOVE_UI_ITEMS';
export const SET_UI_PARENT_GRAPH_MAP = 'SET_UI_PARENT_GRAPH_MAP';
export const ADD_UI_PARENT_GRAPH_MAP = 'ADD_UI_PARENT_GRAPH_MAP';
export const SET_UI_ACTIVE_MODAL_DIALOG = 'SET_UI_ACTIVE_MODAL_DIALOG';
export const SET_UI_YEAR_ON_YEAR_SERIES = 'SET_UI_YEAR_ON_YEAR_SERIES';
export const SET_UI_YEAR_ON_YEAR_CATEGORY = 'SET_UI_YEAR_ON_YEAR_CATEGORY';
export const CLEAR_UI = 'CLEAR_UI';

const dxId = FIXED_DIMENSIONS.dx.id;
const peId = FIXED_DIMENSIONS.pe.id;
const ouId = FIXED_DIMENSIONS.ou.id;

export const DEFAULT_UI = {
    type: COLUMN,
    options: getOptionsForUi(),
    layout: {
        columns: [dxId],
        rows: [peId],
        filters: [ouId],
    },
    itemsByDimension: {
        pe: ['LAST_12_MONTHS'],
        ou: ['USER_ORGUNIT'],
    },
    yearOnYearSeries: ['LAST_5_YEARS'],
    yearOnYearCategory: ['MONTHS_THIS_YEAR'],
    parentGraphMap: {},
    activeModalDialog: null,
};

export default (state = DEFAULT_UI, action) => {
    switch (action.type) {
        case SET_UI: {
            return {
                ...action.value,
            };
        }
        case SET_UI_FROM_VISUALIZATION: {
            return {
                type: action.value.type,
                options: getOptionsFromVisualization(action.value),
                layout: getDimensionIdsByAxis(action.value),
                itemsByDimension: getItemIdsByDimension(action.value),
                parentGraphMap: action.value.parentGraphMap,
            };
        }
        case SET_UI_TYPE: {
            const newState = {
                ...state,
                type: action.value,
            };

            switch (action.value) {
                case YEAR_ON_YEAR: {
                    const items = {
                        ...state.itemsByDimension,
                    };
                    delete items[peId];

                    return {
                        ...newState,
                        layout: {
                            columns: [],
                            rows: [],
                            filters: [
                                ...state.layout.filters,
                                ...state.layout.columns,
                                ...state.layout.rows,
                            ].filter(d => d !== peId),
                        },
                        itemsByDimension: items,
                    };
                }
                default:
                    return newState;
            }
        }
        case SET_UI_OPTIONS: {
            return {
                ...state,
                options: {
                    ...state.options,
                    ...action.value,
                },
            };
        }
        case SET_UI_LAYOUT: {
            return {
                ...state,
                layout: {
                    ...action.value,
                },
            };
        }
        // action.value: mod object (dimensionId:axisName) saying what to add where: { ou: 'rows' }
        // Reducer takes care of swapping if dimension already exists in layout
        case ADD_UI_LAYOUT_DIMENSIONS: {
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
        case REMOVE_UI_LAYOUT_DIMENSIONS: {
            return {
                ...state,
                layout: getFilteredLayout(state.layout, action.value),
            };
        }
        case SET_UI_ITEMS: {
            return {
                ...state,
                itemsByDimension: {
                    ...action.value,
                },
            };
        }
        case ADD_UI_ITEMS: {
            const { dimensionType: type, value: items } = action.value;
            const currentItems = state.itemsByDimension[type] || [];
            const dxItems = [...new Set([...currentItems, ...items])];

            const itemsByDimension = Object.assign(
                {},
                { ...state.itemsByDimension },
                { [type]: dxItems }
            );

            return Object.assign({}, { ...state }, { itemsByDimension });
        }
        case REMOVE_UI_ITEMS: {
            const { dimensionType: type, value: idsToRemove } = action.value;
            const dxItems = (state.itemsByDimension[type] || []).filter(
                id => !idsToRemove.includes(id)
            );

            const itemsByDimension = Object.assign(
                {},
                { ...state.itemsByDimension },
                { [type]: dxItems }
            );

            return Object.assign({}, { ...state }, { itemsByDimension });
        }
        case SET_UI_YEAR_ON_YEAR_SERIES: {
            return {
                ...state,
                yearOnYearSeries: action.value || DEFAULT_UI.yearOnYearSeries,
            };
        }
        case SET_UI_YEAR_ON_YEAR_CATEGORY: {
            return {
                ...state,
                yearOnYearCategory: action.value
                    ? toArray(action.value)
                    : DEFAULT_UI.yearOnYearCategory,
            };
        }
        case SET_UI_PARENT_GRAPH_MAP: {
            return {
                ...state,
                parentGraphMap: action.value,
            };
        }
        case ADD_UI_PARENT_GRAPH_MAP: {
            return {
                ...state,
                parentGraphMap: {
                    ...state.parentGraphMap,
                    ...action.value,
                },
            };
        }
        case SET_UI_ACTIVE_MODAL_DIALOG: {
            return {
                ...state,
                activeModalDialog: action.value || DEFAULT_UI.activeModalDialog,
            };
        }
        case CLEAR_UI:
            return DEFAULT_UI;
        default:
            return state;
    }
};

// Selectors

export const sGetUi = state => state.ui;

export const sGetUiType = state => sGetUi(state).type;
export const sGetUiOptions = state => sGetUi(state).options;
export const sGetUiLayout = state => sGetUi(state).layout;
export const sGetUiItems = state => sGetUi(state).itemsByDimension;
export const sGetUiYearOnYearSeries = state => sGetUi(state).yearOnYearSeries;
export const sGetUiYearOnYearCategory = state =>
    sGetUi(state).yearOnYearCategory;
export const sGetUiParentGraphMap = state => sGetUi(state).parentGraphMap;
export const sGetUiActiveModalDialog = state => sGetUi(state).activeModalDialog;

export const sGetDimensionIdsFromLayout = state =>
    Object.values(sGetUiLayout(state)).reduce(
        (ids, axis) => ids.concat(axis),
        []
    );
