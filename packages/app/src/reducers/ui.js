import {
    getFilteredLayout,
    getSwapModObj,
    AXIS_NAME_COLUMNS,
    AXIS_NAME_ROWS,
} from '../modules/layout';
import { getOptionsForUi } from '../modules/options';
import { COLUMN } from '../modules/chartTypes';
import { FIXED_DIMENSIONS } from '../modules/fixedDimensions';
import { toArray } from '../modules/array';
import { getUiFromVisualization } from '../modules/ui';

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
export const TOGGLE_UI_RIGHT_SIDEBAR_OPEN = 'TOGGLE_UI_RIGHT_SIDEBAR_OPEN';
export const OPEN_UI_RIGHT_SIDEBAR_OPEN = 'OPEN_UI_RIGHT_SIDEBAR_OPEN';
export const SET_UI_INTERPRETATION = 'SET_UI_INTERPRETATION';
export const CLEAR_UI_INTERPRETATION = 'CLEAR_UI_INTERPRETATION';

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
    itemsByDimension: {},
    yearOverYearSeries: ['LAST_5_YEARS'],
    yearOverYearCategory: ['MONTHS_THIS_YEAR'],
    parentGraphMap: {},
    activeModalDialog: null,
    rightSidebarOpen: false,
    interpretation: {},
};

export default (state = DEFAULT_UI, action) => {
    switch (action.type) {
        case SET_UI: {
            return {
                ...action.value,
            };
        }
        case SET_UI_FROM_VISUALIZATION: {
            return getUiFromVisualization(action.value, state);
        }
        case SET_UI_TYPE: {
            return {
                ...state,
                type: action.value,
            };
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
                    if (
                        [AXIS_NAME_COLUMNS, AXIS_NAME_ROWS].includes(axisName)
                    ) {
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

            return {
                ...state,
                itemsByDimension: {
                    ...state.itemsByDimension,
                    [type]: dxItems,
                },
            };
        }
        case REMOVE_UI_ITEMS: {
            const { dimensionType: type, value: idsToRemove } = action.value;
            const dxItems = (state.itemsByDimension[type] || []).filter(
                id => !idsToRemove.includes(id)
            );

            return {
                ...state,
                itemsByDimension: {
                    ...state.itemsByDimension,
                    [type]: dxItems,
                },
            };
        }
        case SET_UI_YEAR_ON_YEAR_SERIES: {
            return {
                ...state,
                yearOverYearSeries:
                    action.value || DEFAULT_UI.yearOverYearSeries,
            };
        }
        case SET_UI_YEAR_ON_YEAR_CATEGORY: {
            return {
                ...state,
                yearOverYearCategory: action.value
                    ? toArray(action.value)
                    : DEFAULT_UI.yearOverYearCategory,
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
            const { rootOrganisationUnit, relativePeriod } = action.value;

            return {
                ...DEFAULT_UI,
                itemsByDimension: {
                    ...DEFAULT_UI.itemsByDimension,
                    [ouId]: [rootOrganisationUnit.id],
                    [peId]: [relativePeriod],
                },
                parentGraphMap: {
                    ...DEFAULT_UI.parentGraphMap,
                    [rootOrganisationUnit.id]: `/${rootOrganisationUnit.id}`,
                },
            };
        case TOGGLE_UI_RIGHT_SIDEBAR_OPEN:
            return {
                ...state,
                rightSidebarOpen: !state.rightSidebarOpen,
            };
        case OPEN_UI_RIGHT_SIDEBAR_OPEN:
            return {
                ...state,
                rightSidebarOpen: true,
            };
        case SET_UI_INTERPRETATION:
            return {
                ...state,
                interpretation: action.value,
            };
        case CLEAR_UI_INTERPRETATION:
            return {
                ...state,
                interpretation: DEFAULT_UI.interpretation,
            };
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
export const sGetUiYearOverYearSeries = state =>
    sGetUi(state).yearOverYearSeries;
export const sGetUiYearOverYearCategory = state =>
    sGetUi(state).yearOverYearCategory;
export const sGetUiParentGraphMap = state => sGetUi(state).parentGraphMap;
export const sGetUiActiveModalDialog = state => sGetUi(state).activeModalDialog;
export const sGetUiRightSidebarOpen = state => sGetUi(state).rightSidebarOpen;
export const sGetUiInterpretation = state => sGetUi(state).interpretation;

export const sGetDimensionIdsFromLayout = state =>
    Object.values(sGetUiLayout(state)).reduce(
        (ids, axis) => ids.concat(axis),
        []
    );
