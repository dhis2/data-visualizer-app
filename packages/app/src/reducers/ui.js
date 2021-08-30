/*eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/

import {
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    DIMENSION_ID_ORGUNIT,
    DIMENSION_ID_ASSIGNED_CATEGORIES,
    canDimensionBeAddedToAxis,
    defaultVisType,
    defaultFontStyle,
    FONT_STYLE_LEGEND,
    FONT_STYLE_VISUALIZATION_TITLE,
    FONT_STYLE_VISUALIZATION_SUBTITLE,
    FONT_STYLE_AXIS_LABELS,
    FONT_STYLE_HORIZONTAL_AXIS_TITLE,
    FONT_STYLE_VERTICAL_AXIS_TITLE,
    FONT_STYLE_REGRESSION_LINE_LABEL,
} from '@dhis2/analytics'
import objectClean from 'd2-utilizr/lib/objectClean'
import castArray from 'lodash-es/castArray'
import {
    TITLE_AUTO,
    TITLE_CUSTOM,
} from '../components/VisualizationOptions/Options/AxisTitle'
import {
    getFilteredLayout,
    getInverseLayout,
    getRetransfer,
} from '../modules/layout'
import {
    getOptionsForUi,
    OPTION_AXIS_DECIMALS,
    OPTION_SHOW_SERIES_KEY,
    OPTION_AXIS_MAX_VALUE,
    OPTION_AXIS_MIN_VALUE,
    OPTION_AXIS_STEPS,
    OPTION_AXIS_TITLE,
    OPTION_AXIS_TITLE_TEXT_MODE,
    OPTION_BASE_LINE_TITLE,
    OPTION_BASE_LINE_VALUE,
    OPTION_BASE_LINE_TITLE_FONT_STYLE,
    OPTION_TARGET_LINE_VALUE,
    OPTION_TARGET_LINE_TITLE_FONT_STYLE,
    OPTION_TARGET_LINE_TITLE,
    OPTION_BASE_LINE_ENABLED,
    OPTION_TARGET_LINE_ENABLED,
    OPTION_SHOW_LEGEND_KEY,
    OPTION_LEGEND_DISPLAY_STRATEGY,
    OPTION_LEGEND_SET,
    OPTION_LEGEND_DISPLAY_STYLE,
} from '../modules/options'
import {
    getAdaptedUiByType,
    getUiFromVisualization,
    SERIES_ITEM_TYPE_PROP,
} from '../modules/ui'

export const SET_UI = 'SET_UI'
export const SET_UI_FROM_VISUALIZATION = 'SET_UI_FROM_VISUALIZATION'
export const SET_UI_TYPE = 'SET_UI_TYPE'
export const SET_UI_OPTIONS = 'SET_UI_OPTIONS'
export const SET_UI_OPTION = 'SET_UI_OPTION'
export const SET_UI_OPTION_FONT_STYLE = 'SET_UI_OPTION_FONT_STYLE'
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
export const SET_UI_ITEM_ATTRIBUTES = 'SET_UI_ITEM_ATTRIBUTES'
export const REMOVE_UI_ITEM_ATTRIBUTES = 'REMOVE_UI_ITEM_ATTRIBUTES'
export const CLEAR_UI = 'CLEAR_UI'
export const TOGGLE_UI_RIGHT_SIDEBAR_OPEN = 'TOGGLE_UI_RIGHT_SIDEBAR_OPEN'
export const SET_UI_RIGHT_SIDEBAR_OPEN = 'SET_UI_RIGHT_SIDEBAR_OPEN'
export const SET_UI_INTERPRETATION = 'SET_UI_INTERPRETATION'
export const CLEAR_UI_INTERPRETATION = 'CLEAR_UI_INTERPRETATION'
export const CLEAR_SERIES_TYPE = 'CLEAR_SERIES_TYPE'
export const UPDATE_UI_SERIES_ITEM = 'UPDATE_UI_SERIES_ITEM'

export const DEFAULT_UI = {
    type: defaultVisType,
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
    yearOverYearSeries: [],
    yearOverYearCategory: [],
    itemAttributes: [],
    parentGraphMap: {},
    activeModalDialog: null,
    rightSidebarOpen: false,
    interpretation: {},
    outlierAnalysis: null,
}

export const PRESELECTED_YEAR_OVER_YEAR_SERIES = ['THIS_YEAR', 'LAST_YEAR']
export const PRESELECTED_YEAR_OVER_YEAR_CATEGORY = ['MONTHS_THIS_YEAR']

const getPreselectedUi = options => {
    const { rootOrganisationUnit, relativePeriod, digitGroupSeparator } =
        options

    const rootOrganisationUnits = []
    const parentGraphMap = { ...DEFAULT_UI.parentGraphMap }

    if (rootOrganisationUnit && rootOrganisationUnit.id) {
        rootOrganisationUnits.push(rootOrganisationUnit.id)

        parentGraphMap[rootOrganisationUnit.id] = ''
    }

    return {
        ...DEFAULT_UI,
        options: {
            ...DEFAULT_UI.options,
            digitGroupSeparator,
        },
        itemsByDimension: {
            ...DEFAULT_UI.itemsByDimension,
            [DIMENSION_ID_ORGUNIT]: rootOrganisationUnits,
            [DIMENSION_ID_PERIOD]: [relativePeriod],
        },
        yearOverYearSeries: PRESELECTED_YEAR_OVER_YEAR_SERIES,
        yearOverYearCategory: PRESELECTED_YEAR_OVER_YEAR_CATEGORY,
        parentGraphMap,
    }
}

export default (state = DEFAULT_UI, action) => {
    switch (action.type) {
        case SET_UI: {
            return {
                ...action.value,
            }
        }
        case SET_UI_FROM_VISUALIZATION: {
            return getAdaptedUiByType(
                getUiFromVisualization(action.value, state)
            )
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
        case SET_UI_OPTION: {
            const options = {
                axes: state.options.axes || [],
                seriesKey: state.options.seriesKey || {},
                fontStyle: state.options.fontStyle || {},
                legend: state.options.legend || {},
            }
            const value = action.value.value
            const optionId = action.value.optionId
            const [axisType, axisIndex] = (action.value.axisId || '').split('_')
            const fontStyleOption = action.value.fontStyleOption

            switch (optionId) {
                case OPTION_AXIS_DECIMALS:
                case OPTION_AXIS_STEPS:
                case OPTION_AXIS_MAX_VALUE:
                case OPTION_AXIS_MIN_VALUE: {
                    options.axes = pushAxis(options.axes, {
                        ...getAxis(options.axes, Number(axisIndex), axisType),
                        [optionId]: value,
                    })
                    break
                }
                case OPTION_SHOW_SERIES_KEY:
                    options.seriesKey = {
                        ...options.seriesKey,
                        hidden: value,
                    }
                    break
                case OPTION_LEGEND_DISPLAY_STRATEGY:
                    options.legend = {
                        ...options.legend,
                        strategy: value,
                    }
                    break
                case OPTION_LEGEND_DISPLAY_STYLE:
                    options.legend = {
                        ...options.legend,
                        style: value,
                    }
                    break
                case OPTION_SHOW_LEGEND_KEY:
                    options.legend = {
                        ...options.legend,
                        showKey: value,
                    }
                    break
                case OPTION_LEGEND_SET:
                    options.legend = {
                        ...options.legend,
                        set: value,
                    }
                    break
                case OPTION_AXIS_TITLE: {
                    const axis = getAxis(
                        options.axes,
                        Number(axisIndex),
                        axisType
                    )
                    options.axes = pushAxis(options.axes, {
                        ...axis,
                        title: {
                            ...axis.title,
                            text: value,
                        },
                    })
                    break
                }
                case OPTION_AXIS_TITLE_TEXT_MODE: {
                    const axis = getAxis(
                        options.axes,
                        Number(axisIndex),
                        axisType
                    )
                    options.axes = pushAxis(options.axes, {
                        ...axis,
                        title: {
                            ...axis.title,
                            textMode: [TITLE_CUSTOM, TITLE_AUTO].includes(value)
                                ? value
                                : null,
                        },
                    })
                    break
                }
                case OPTION_BASE_LINE_ENABLED:
                case OPTION_TARGET_LINE_ENABLED: {
                    const prop =
                        optionId === OPTION_BASE_LINE_ENABLED
                            ? 'baseLine'
                            : 'targetLine'
                    options.axes = pushAxis(options.axes, {
                        ...getAxis(options.axes, Number(axisIndex), axisType),
                        [prop]: value
                            ? {
                                  enabled: value,
                              }
                            : null,
                    })
                    break
                }
                case OPTION_BASE_LINE_TITLE:
                case OPTION_TARGET_LINE_TITLE: {
                    const prop =
                        optionId === OPTION_BASE_LINE_TITLE
                            ? 'baseLine'
                            : 'targetLine'
                    const axis = getAxis(
                        options.axes,
                        Number(axisIndex),
                        axisType
                    )
                    axis[prop] = {
                        ...axis[prop],
                        title: {
                            ...axis[prop]?.title,
                            text: value || undefined,
                        },
                    }
                    options.axes = pushAxis(options.axes, axis)
                    break
                }
                case OPTION_BASE_LINE_VALUE:
                case OPTION_TARGET_LINE_VALUE: {
                    const prop =
                        optionId === OPTION_BASE_LINE_VALUE
                            ? 'baseLine'
                            : 'targetLine'
                    const axis = getAxis(
                        options.axes,
                        Number(axisIndex),
                        axisType
                    )
                    axis[prop] = {
                        ...axis[prop],
                        value: value || value === 0 ? value : undefined,
                    }
                    options.axes = pushAxis(options.axes, axis)
                    break
                }
                case OPTION_BASE_LINE_TITLE_FONT_STYLE:
                case OPTION_TARGET_LINE_TITLE_FONT_STYLE: {
                    const prop =
                        optionId === OPTION_BASE_LINE_TITLE_FONT_STYLE
                            ? 'baseLine'
                            : 'targetLine'
                    const axis = getAxis(
                        options.axes,
                        Number(axisIndex),
                        axisType
                    )
                    axis[prop].title = {
                        ...axis[prop].title,
                        fontStyle: {
                            ...axis[prop].title?.fontStyle,
                            [fontStyleOption]:
                                defaultFontStyle[
                                    FONT_STYLE_REGRESSION_LINE_LABEL
                                ][fontStyleOption] !== value
                                    ? value
                                    : undefined,
                        },
                    }
                    options.axes = pushAxis(options.axes, axis)
                    break
                }

                case FONT_STYLE_VERTICAL_AXIS_TITLE:
                case FONT_STYLE_HORIZONTAL_AXIS_TITLE: {
                    const axis = getAxis(
                        options.axes,
                        Number(axisIndex),
                        axisType
                    )
                    axis.title = {
                        ...axis.title,
                        fontStyle: {
                            ...axis.title?.fontStyle,
                            [fontStyleOption]:
                                defaultFontStyle[optionId][fontStyleOption] !==
                                value
                                    ? value
                                    : undefined,
                        },
                    }
                    options.axes = pushAxis(options.axes, axis)
                    break
                }
                case FONT_STYLE_AXIS_LABELS: {
                    const axis = getAxis(
                        options.axes,
                        Number(axisIndex),
                        axisType
                    )
                    axis.label = {
                        ...axis.label,
                        fontStyle: {
                            ...axis.label?.fontStyle,
                            [fontStyleOption]:
                                defaultFontStyle[optionId][fontStyleOption] !==
                                value
                                    ? value
                                    : undefined,
                        },
                    }
                    options.axes = pushAxis(options.axes, axis)
                    break
                }
                case FONT_STYLE_LEGEND: {
                    options.seriesKey = {
                        ...options.seriesKey,
                        label: {
                            fontStyle: {
                                ...options.seriesKey.label?.fontStyle,
                                [fontStyleOption]:
                                    defaultFontStyle[optionId][
                                        fontStyleOption
                                    ] !== value
                                        ? value
                                        : undefined,
                            },
                        },
                    }
                    break
                }
                case FONT_STYLE_VISUALIZATION_TITLE:
                case FONT_STYLE_VISUALIZATION_SUBTITLE: {
                    options.fontStyle = {
                        ...options.fontStyle,
                        [optionId]: {
                            ...options.fontStyle[optionId],
                            [fontStyleOption]:
                                defaultFontStyle[optionId][fontStyleOption] !==
                                value
                                    ? value
                                    : undefined,
                        },
                    }
                    break
                }
                default: {
                    options[optionId] = value
                    break
                }
            }

            options.fontStyle = deepClean(options.fontStyle)
            options.seriesKey = deepClean(options.seriesKey)
            options.axes = cleanAxes(options.axes)

            return {
                ...state,
                options: {
                    ...state.options,
                    ...options,
                },
            }
        }
        case SET_UI_OPTION_FONT_STYLE: {
            const options = {
                axes: state.options.axes || [],
            }
            const [axisType, axisIndex] = (action.value.axisId || '').split('_')
            const axis = getAxis(options.axes, Number(axisIndex), axisType)

            switch (action.value.optionId) {
                case FONT_STYLE_VERTICAL_AXIS_TITLE:
                case FONT_STYLE_HORIZONTAL_AXIS_TITLE: {
                    axis.title = {
                        ...axis.title,
                        fontStyle: action.value.value,
                    }
                    options.axes = pushAxis(options.axes, axis)
                    break
                }
            }

            options.axes = cleanAxes(options.axes)

            return {
                ...state,
                options: {
                    ...state.options,
                    ...options,
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

            let newLayout = state.layout

            // Add dimension ids to destination (axisId === null means remove from layout)
            Object.entries(transfers).forEach(
                ([dimensionId, { axisId, index }]) => {
                    if (
                        newLayout[axisId] &&
                        canDimensionBeAddedToAxis(
                            state.type,
                            newLayout[axisId],
                            axisId
                        )
                    ) {
                        // Filter out transferred dimension id (remove from source)
                        newLayout = getFilteredLayout(newLayout, [dimensionId])
                        if (index === null || index === undefined) {
                            newLayout[axisId].push(dimensionId)
                        } else {
                            newLayout[axisId].splice(index, 0, dimensionId)
                        }
                    }
                }
            )

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
            // FIXME: Unused, remove?
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
        case SET_UI_ITEM_ATTRIBUTES: {
            const { attribute, itemIds, dimensionId } = action.value

            return {
                ...state,
                itemsByDimension: {
                    ...state.itemsByDimension,
                    [dimensionId]: [
                        ...new Set([
                            ...state.itemsByDimension[dimensionId].filter(id =>
                                state.itemAttributes.find(
                                    itemAttr =>
                                        itemAttr.id === id &&
                                        itemAttr.attribute !== attribute
                                )
                            ),
                            ...itemIds,
                        ]),
                    ],
                },
                itemAttributes: [
                    ...state.itemAttributes.filter(
                        item => item.attribute !== attribute
                    ),
                    ...itemIds.map(id => ({ id, attribute })),
                ],
            }
        }
        case REMOVE_UI_ITEM_ATTRIBUTES: {
            const { dimensionId, itemIdsToRemove, attribute } = action.value

            const itemAttributes = (state.itemAttributes || []).filter(
                ({ id: itemId, attribute: itemAttribute }) =>
                    !(
                        itemIdsToRemove.includes(itemId) &&
                        itemAttribute === attribute
                    )
            )
            const dxItems = (state.itemsByDimension[dimensionId] || []).filter(
                id =>
                    itemAttributes.some(({ id: itemId }) => itemId === id) ||
                    !itemIdsToRemove.includes(id)
            )

            return {
                ...state,
                itemsByDimension: {
                    ...state.itemsByDimension,
                    [dimensionId]: dxItems,
                },
                itemAttributes,
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
        case CLEAR_UI: {
            return getPreselectedUi(action.value)
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
        case CLEAR_SERIES_TYPE:
            return {
                ...state,
                options: {
                    ...state.options,
                    series: state.options.series.map(
                        ({ type, ...rest }) => rest
                    ),
                },
            }
        case UPDATE_UI_SERIES_ITEM: {
            const { changedItem, value, prop } = action.value
            const series = [...state.options.series]

            const itemIndex = series.findIndex(
                item => item.dimensionItem == changedItem.dimensionItem
            )

            if (prop === SERIES_ITEM_TYPE_PROP && value === state.type) {
                const { [prop]: remove, ...rest } = series[itemIndex]
                series[itemIndex] = { ...rest }
            } else {
                series[itemIndex] = Object.assign({}, series[itemIndex], {
                    [prop]: value,
                })
            }

            return {
                ...state,
                options: {
                    ...state.options,
                    series,
                },
            }
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
export const sGetUiItemsByAttribute = (state, attribute) =>
    (sGetUi(state).itemAttributes || [])
        .filter(item => item.attribute === attribute)
        .map(item => item.id)
export const sGetUiParentGraphMap = state => sGetUi(state).parentGraphMap
export const sGetUiActiveModalDialog = state => sGetUi(state).activeModalDialog
export const sGetUiRightSidebarOpen = state => sGetUi(state).rightSidebarOpen
export const sGetUiInterpretation = state => sGetUi(state).interpretation
export const sGetAxes = state => sGetUi(state).axes

// Selectors level 2

export const sGetAxisIdByDimensionId = (state, dimensionId) =>
    (getInverseLayout(sGetUiLayout(state)) || {})[dimensionId]

export const sGetUiItemsByDimension = (state, dimension) =>
    sGetUiItems(state)[dimension] || DEFAULT_UI.itemsByDimension[dimension]

export const sGetDimensionItemsByAxis = (state, axisId) =>
    sGetUiItemsByDimension(state, (sGetUiLayout(state) || {})[axisId]) || []

export const sGetDimensionIdsFromLayout = state =>
    Object.values(sGetUiLayout(state)).reduce(
        (ids, axisDimensionIds) => ids.concat(axisDimensionIds),
        []
    )

export const sLayoutHasDimension = (state, dimension) =>
    sGetDimensionIdsFromLayout(state).includes(dimension)

export const sLayoutHasAssignedCategories = state =>
    sLayoutHasDimension(state, DIMENSION_ID_ASSIGNED_CATEGORIES)

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

export const sGetUiOption = (state, option) => {
    const options = sGetUi(state).options
    const [axisType, axisIndex] = (option.axisId || '').split('_')
    let value
    if (option.name) {
        value = options[option.name]
    } else if (option.id) {
        switch (option.id) {
            case OPTION_AXIS_MAX_VALUE:
            case OPTION_AXIS_MIN_VALUE:
            case OPTION_AXIS_DECIMALS:
            case OPTION_AXIS_STEPS:
                value = getAxis(options.axes, Number(axisIndex), axisType)[
                    option.id
                ]
                break
            case OPTION_AXIS_TITLE_TEXT_MODE:
                value = getAxis(options.axes, Number(axisIndex), axisType).title
                    ?.textMode
                break
            case OPTION_AXIS_TITLE:
                value = getAxis(options.axes, Number(axisIndex), axisType).title
                    ?.text
                break
            case OPTION_SHOW_SERIES_KEY:
                value = options.seriesKey?.hidden
                break
            case OPTION_LEGEND_DISPLAY_STRATEGY:
                value = options.legend?.strategy
                break
            case OPTION_LEGEND_DISPLAY_STYLE:
                value = options.legend?.style
                break
            case OPTION_SHOW_LEGEND_KEY:
                value = options.legend?.showKey
                break
            case OPTION_LEGEND_SET:
                value = options.legend?.set
                break
            case FONT_STYLE_LEGEND:
                value = getConsolidatedFontStyle(
                    option.id,
                    options.seriesKey?.label?.fontStyle
                )
                break
            case OPTION_BASE_LINE_ENABLED:
                value = getAxis(options.axes, Number(axisIndex), axisType)
                    .baseLine?.enabled
                break
            case OPTION_BASE_LINE_TITLE:
                value = getAxis(options.axes, Number(axisIndex), axisType)
                    .baseLine?.title?.text
                break
            case OPTION_BASE_LINE_VALUE:
                value = getAxis(options.axes, Number(axisIndex), axisType)
                    .baseLine?.value
                break
            case OPTION_BASE_LINE_TITLE_FONT_STYLE:
                value = getConsolidatedFontStyle(
                    FONT_STYLE_REGRESSION_LINE_LABEL,
                    getAxis(options.axes, Number(axisIndex), axisType).baseLine
                        ?.title?.fontStyle
                )
                break
            case OPTION_TARGET_LINE_ENABLED:
                value = getAxis(options.axes, Number(axisIndex), axisType)
                    .targetLine?.enabled
                break
            case OPTION_TARGET_LINE_TITLE:
                value = getAxis(options.axes, Number(axisIndex), axisType)
                    .targetLine?.title?.text
                break
            case OPTION_TARGET_LINE_VALUE:
                value = getAxis(options.axes, Number(axisIndex), axisType)
                    .targetLine?.value
                break
            case OPTION_TARGET_LINE_TITLE_FONT_STYLE:
                value = getConsolidatedFontStyle(
                    FONT_STYLE_REGRESSION_LINE_LABEL,
                    getAxis(options.axes, Number(axisIndex), axisType)
                        .targetLine?.title?.fontStyle
                )
                break
            case FONT_STYLE_AXIS_LABELS:
                value = getConsolidatedFontStyle(
                    option.id,
                    getAxis(options.axes, Number(axisIndex), axisType).label
                        ?.fontStyle
                )
                break
            case FONT_STYLE_VERTICAL_AXIS_TITLE:
            case FONT_STYLE_HORIZONTAL_AXIS_TITLE:
                value = getConsolidatedFontStyle(
                    option.id,
                    getAxis(options.axes, Number(axisIndex), axisType).title
                        ?.fontStyle
                )
                break
            case FONT_STYLE_VISUALIZATION_TITLE:
            case FONT_STYLE_VISUALIZATION_SUBTITLE:
                value = getConsolidatedFontStyle(
                    option.id,
                    (options.fontStyle || {})[option.id]
                )
                break
        }
    }
    return value
}

const getAxis = (axes = [], axisIndex, axisType) => ({
    ...(axes.find(
        axis => axis.index === axisIndex && axis.type === axisType
    ) || {
        index: Number(axisIndex),
        type: axisType,
    }),
})

const getConsolidatedFontStyle = (fontStyleKey, fontStyle) => ({
    ...defaultFontStyle[fontStyleKey],
    ...(fontStyle || {}),
})

const deepClean = input => {
    const result = objectClean(input)
    Object.keys(result).forEach(key => {
        if (typeof result[key] === 'object') {
            result[key] = deepClean(result[key])
            if (!Object.keys(result[key]).length) {
                delete result[key]
            }
        }
    })
    return result
}

const pushAxis = (axes, axis) => {
    const updatedAxes = axes.filter(
        filter =>
            filter.index !== Number(axis.index) || filter.type !== axis.type
    )
    updatedAxes.push(axis)
    return updatedAxes
}

const cleanAxes = axes =>
    axes
        .map(axis => {
            const cleanAxis = deepClean(axis)
            return !Object.keys(cleanAxis).filter(
                key => !['type', 'index'].includes(key)
            ).length
                ? null
                : cleanAxis
        })
        .filter(i => i)
