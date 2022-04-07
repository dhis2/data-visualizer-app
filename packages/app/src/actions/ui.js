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
    REMOVE_UI_ITEMS,
    ADD_UI_PARENT_GRAPH_MAP,
    SET_UI_ACTIVE_MODAL_DIALOG,
    SET_UI_YEAR_ON_YEAR_SERIES,
    SET_UI_YEAR_ON_YEAR_CATEGORY,
    SET_UI_ITEM_ATTRIBUTES,
    REMOVE_UI_ITEM_ATTRIBUTES,
    TOGGLE_UI_RIGHT_SIDEBAR_OPEN,
    SET_UI_RIGHT_SIDEBAR_OPEN,
    SET_UI_INTERPRETATION,
    CLEAR_UI_INTERPRETATION,
    CLEAR_SERIES_TYPE,
    UPDATE_UI_SERIES_ITEM,
    SET_UI_OPTION,
    SET_UI_OPTION_FONT_STYLE,
} from '../reducers/ui.js'

export const acSetUi = (value) => ({
    type: SET_UI,
    value,
})

export const acClear = (value) => ({
    type: CLEAR_UI,
    value,
})

export const acSetUiFromVisualization = (value) => ({
    type: SET_UI_FROM_VISUALIZATION,
    value,
})

export const acSetUiType = (value) => ({
    type: SET_UI_TYPE,
    value,
})

export const acSetUiOptions = (value) => ({
    type: SET_UI_OPTIONS,
    value,
})

export const acSetUiOption = (value) => ({
    type: SET_UI_OPTION,
    value,
})

export const acSetUiOptionFontStyle = (value) => ({
    type: SET_UI_OPTION_FONT_STYLE,
    value,
})

export const acUpdateUiSeriesItem = (value) => ({
    type: UPDATE_UI_SERIES_ITEM,
    value,
})

export const acSetUiLayout = (value) => ({
    type: SET_UI_LAYOUT,
    value,
})

export const acAddUiLayoutDimensions = (value) => ({
    type: ADD_UI_LAYOUT_DIMENSIONS,
    value,
})

export const acRemoveUiLayoutDimensions = (value) => ({
    type: REMOVE_UI_LAYOUT_DIMENSIONS,
    value,
})

export const acSetUiItems = (value) => ({
    type: SET_UI_ITEMS,
    value,
})

export const acRemoveUiItems = (value) => ({
    type: REMOVE_UI_ITEMS,
    value,
})

export const acSetUiYearOverYearSeries = (value) => ({
    type: SET_UI_YEAR_ON_YEAR_SERIES,
    value,
})

export const acSetUiYearOverYearCategory = (value) => ({
    type: SET_UI_YEAR_ON_YEAR_CATEGORY,
    value,
})

export const acSetUiItemAttributes = (value) => ({
    type: SET_UI_ITEM_ATTRIBUTES,
    value,
})

export const acRemoveUiItemAttributes = (value) => ({
    type: REMOVE_UI_ITEM_ATTRIBUTES,
    value,
})

export const acAddParentGraphMap = (value) => ({
    type: ADD_UI_PARENT_GRAPH_MAP,
    value,
})

export const acSetUiActiveModalDialog = (value) => ({
    type: SET_UI_ACTIVE_MODAL_DIALOG,
    value,
})

export const acToggleUiRightSidebarOpen = () => ({
    type: TOGGLE_UI_RIGHT_SIDEBAR_OPEN,
})

export const acSetUiRightSidebarOpen = () => ({
    type: SET_UI_RIGHT_SIDEBAR_OPEN,
})

export const acSetUiInterpretation = (value) => ({
    type: SET_UI_INTERPRETATION,
    value,
})

export const acClearUiInterpretation = () => ({
    type: CLEAR_UI_INTERPRETATION,
})

export const acClearSeriesType = () => ({
    type: CLEAR_SERIES_TYPE,
})
