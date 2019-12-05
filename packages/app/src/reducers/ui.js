import castArray from 'lodash-es/castArray'
import {
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    DIMENSION_ID_ORGUNIT,
    VIS_TYPE_COLUMN,
} from '@dhis2/analytics'

import {
    getFilteredLayout,
    getInverseLayout,
    getRetransfer,
} from '../modules/layout'
import { getOptionsForUi } from '../modules/options'
import { getUiFromVisualization } from '../modules/ui'

export const SET_UI = 'SET_UI'
export const SET_UI_FROM_VISUALIZATION = 'SET_UI_FROM_VISUALIZATION'
export const SET_UI_TYPE = 'SET_UI_TYPE'
export const SET_UI_OPTIONS = 'SET_UI_OPTIONS'
export const SET_UI_LAYOUT = 'SET_UI_LAYOUT'
export const ADD_UI_LAYOUT_DIMENSIONS = 'ADD_UI_LAYOUT_DIMENSIONS'
export const REMOVE_UI_LAYOUT_DIMENSIONS = 'REMOVE_UI_LAYOUT_DIMENSIONS'
export const SET_UI_ITEMS = 'SET_UI_ITEMS'
export const ADD_UI_ITEMS = 'ADD_UI_ITEMS'
export const REMOVE_UI_ITEMS = 'REMOVE_UI_ITEMS'
export const SET_UI_PARENT_GRAPH_MAP = 'SET_UI_PARENT_GRAPH_MAP'
export const ADD_UI_PARENT_GRAPH_MAP = 'ADD_UI_PARENT_GRAPH_MAP'
export const SET_UI_ACTIVE_MODAL_DIALOG = 'SET_UI_ACTIVE_MODAL_DIALOG'
export const SET_UI_YEAR_ON_YEAR_SERIES = 'SET_UI_YEAR_ON_YEAR_SERIES'
export const SET_UI_YEAR_ON_YEAR_CATEGORY = 'SET_UI_YEAR_ON_YEAR_CATEGORY'
export const CLEAR_UI = 'CLEAR_UI'
export const TOGGLE_UI_RIGHT_SIDEBAR_OPEN = 'TOGGLE_UI_RIGHT_SIDEBAR_OPEN'
export const SET_UI_RIGHT_SIDEBAR_OPEN = 'SET_UI_RIGHT_SIDEBAR_OPEN'
export const SET_UI_INTERPRETATION = 'SET_UI_INTERPRETATION'
export const CLEAR_UI_INTERPRETATION = 'CLEAR_UI_INTERPRETATION'
export const SET_AXES = 'SET_AXES'

export const DEFAULT_UI = {
    type: VIS_TYPE_COLUMN,
    options: getOptionsForUi(),
    layout: {
        columns: [DIMENSION_ID_DATA],
        rows: [DIMENSION_ID_PERIOD],
        filters: [DIMENSION_ID_ORGUNIT],
    },
    itemsByDimension: {
        [DIMENSION_ID_ORGUNIT]: [],
        [DIMENSION_ID_PERIOD]: [],
    },
    yearOverYearSeries: ['THIS_YEAR', 'LAST_YEAR'],
    yearOverYearCategory: ['MONTHS_THIS_YEAR'],
    parentGraphMap: {},
    activeModalDialog: null,
    rightSidebarOpen: false,
    interpretation: {},
    axes: null,
}

export default (state = DEFAULT_UI, action) => {
    switch (action.type) {
        case SET_UI: {
            return {
                ...action.value,
            }
        }
        case SET_UI_FROM_VISUALIZATION: {
            return getUiFromVisualization(action.value, state)
        }
        case SET_UI_TYPE: {
            return {
                ...state,
                type: action.value,
            }
        }
        case SET_UI_OPTIONS: {
            return {
                ...state,
                options: {
                    ...state.options,
                    ...action.value,
                },
            }
        }
        case SET_UI_LAYOUT: {
            return {
                ...state,
                layout: {
                    ...action.value,
                },
            }
        }
        // action.value: transfer object (dimensionId:axisId) saying what to add where: { ou: 'rows' }
        // Reducer takes care of swapping (retransfer) if dimension already exists in layout
        case ADD_UI_LAYOUT_DIMENSIONS: {
            const transfers = {
                ...action.value,
                ...getRetransfer(state.layout, action.value, state.type),
            }

            // Filter out transferred dimension ids (remove from source)
            const newLayout = getFilteredLayout(
                state.layout,
                Object.keys(transfers)
            )

            // Add dimension ids to destination (axisId === null means remove from layout)
            Object.entries(transfers).forEach(([dimensionId, axisId]) => {
                newLayout[axisId] && newLayout[axisId].push(dimensionId)
            })

            return {
                ...state,
                layout: newLayout,
            }
        }
        case REMOVE_UI_LAYOUT_DIMENSIONS: {
            return {
                ...state,
                layout: getFilteredLayout(state.layout, action.value),
            }
        }
        case SET_UI_ITEMS: {
            const { dimensionId, itemIds } = action.value

            return {
                ...state,
                itemsByDimension: {
                    ...state.itemsByDimension,
                    [dimensionId]: itemIds,
                },
            }
        }
        case ADD_UI_ITEMS: {
            const { dimensionId, itemIds } = action.value
            const currentItemIds = state.itemsByDimension[dimensionId] || []
            const dxItems = [...new Set([...currentItemIds, ...itemIds])]

            return {
                ...state,
                itemsByDimension: {
                    ...state.itemsByDimension,
                    [dimensionId]: dxItems,
                },
            }
        }
        case REMOVE_UI_ITEMS: {
            const { dimensionId, itemIdsToRemove } = action.value

            const dxItems = (state.itemsByDimension[dimensionId] || []).filter(
                id => !itemIdsToRemove.includes(id)
            )

            return {
                ...state,
                itemsByDimension: {
                    ...state.itemsByDimension,
                    [dimensionId]: dxItems,
                },
            }
        }
        case SET_UI_YEAR_ON_YEAR_SERIES: {
            return {
                ...state,
                yearOverYearSeries:
                    action.value || DEFAULT_UI.yearOverYearSeries,
            }
        }
        case SET_UI_YEAR_ON_YEAR_CATEGORY: {
            return {
                ...state,
                yearOverYearCategory: action.value
                    ? castArray(action.value)
                    : DEFAULT_UI.yearOverYearCategory,
            }
        }
        case SET_UI_PARENT_GRAPH_MAP: {
            return {
                ...state,
                parentGraphMap: action.value,
            }
        }
        case ADD_UI_PARENT_GRAPH_MAP: {
            return {
                ...state,
                parentGraphMap: {
                    ...state.parentGraphMap,
                    ...action.value,
                },
            }
        }
        case SET_UI_ACTIVE_MODAL_DIALOG: {
            return {
                ...state,
                activeModalDialog: action.value || DEFAULT_UI.activeModalDialog,
            }
        }
        case CLEAR_UI:
            const { rootOrganisationUnit, relativePeriod } = action.value

            return {
                ...DEFAULT_UI,
                itemsByDimension: {
                    ...DEFAULT_UI.itemsByDimension,
                    [DIMENSION_ID_ORGUNIT]: [rootOrganisationUnit.id],
                    [DIMENSION_ID_PERIOD]: [relativePeriod],
                },
                parentGraphMap: {
                    ...DEFAULT_UI.parentGraphMap,
                    [rootOrganisationUnit.id]: '',
                },
            }
        case TOGGLE_UI_RIGHT_SIDEBAR_OPEN:
            return {
                ...state,
                rightSidebarOpen: !state.rightSidebarOpen,
            }
        case SET_UI_RIGHT_SIDEBAR_OPEN:
            return {
                ...state,
                rightSidebarOpen: true,
            }
        case SET_UI_INTERPRETATION:
            return {
                ...state,
                interpretation: action.value,
            }
        case CLEAR_UI_INTERPRETATION:
            return {
                ...state,
                interpretation: DEFAULT_UI.interpretation,
            }
        case SET_AXES:
            return {
                ...state,
                axes: action.value,
            }
        default:
            return state
    }
}

// Selectors

export const sGetUi = state => state.ui

export const sGetUiType = state => sGetUi(state).type
export const sGetUiOptions = state => sGetUi(state).options
export const sGetUiLayout = state => sGetUi(state).layout
export const sGetUiItems = state => sGetUi(state).itemsByDimension
export const sGetUiYearOverYearSeries = state =>
    sGetUi(state).yearOverYearSeries
export const sGetUiYearOverYearCategory = state =>
    sGetUi(state).yearOverYearCategory
export const sGetUiParentGraphMap = state => sGetUi(state).parentGraphMap
export const sGetUiActiveModalDialog = state => sGetUi(state).activeModalDialog
export const sGetUiRightSidebarOpen = state => sGetUi(state).rightSidebarOpen
export const sGetUiInterpretation = state => sGetUi(state).interpretation
export const sGetAxes = state => sGetUi(state).axes

// Selectors level 2

export const getAxisIdByDimensionId = (state, dimensionId) =>
    (getInverseLayout(sGetUiLayout(state)) || {})[dimensionId]

export const sGetUiItemsByDimension = (state, dimension) =>
    sGetUiItems(state)[dimension] || DEFAULT_UI.itemsByDimension[dimension]

export const sGetDimensionIdsFromLayout = state =>
    Object.values(sGetUiLayout(state)).reduce(
        (ids, axis) => ids.concat(axis),
        []
    )

export const sGetAxisSetup = state => {
    const columns = sGetUiLayout(state).columns
    const items = sGetUiItems(state)
    const axes = sGetAxes(state) || {}

    return Array.isArray(items[columns[0]]) && items[columns[0]].length
        ? items[columns[0]].map(id => ({
              id,
              axis: id in axes ? axes[id] : 0,
          }))
        : []
}
