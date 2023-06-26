import {
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
    VIS_TYPE_YEAR_OVER_YEAR_COLUMN,
    VIS_TYPE_PIE,
    VIS_TYPE_GAUGE,
    VIS_TYPE_SINGLE_VALUE,
    VIS_TYPE_SCATTER,
} from '@dhis2/analytics'
import {
    getAxesFromUi,
    getOptionsFromUi,
    getPieCurrentFromUi,
    getYearOverYearCurrentFromUi,
    getSingleValueCurrentFromUi,
    getSeriesFromUi,
    getScatterCurrentFromUi,
    getItemsByDimensionFromUi,
} from '../modules/current.js'
import { BASE_FIELD_TYPE } from '../modules/fields/baseFields.js'

export const SET_CURRENT = 'SET_CURRENT'
export const SET_CURRENT_FROM_UI = 'SET_CURRENT_FROM_UI'
export const CLEAR_CURRENT = 'CLEAR_CURRENT'

export const DEFAULT_CURRENT = null

const getDefaultFromUi = (state, ui, metadata) => {
    const adaptedUi = {
        ...ui,
        itemsByDimension: getItemsByDimensionFromUi(ui),
    }

    const axesFromUi = getAxesFromUi(adaptedUi, metadata)
    const optionsFromUi = getOptionsFromUi(adaptedUi)
    const series = getSeriesFromUi(adaptedUi)

    return {
        ...state,
        [BASE_FIELD_TYPE]: ui.type,
        ...axesFromUi,
        ...optionsFromUi,
        series,
    }
}

export default (state = DEFAULT_CURRENT, action) => {
    switch (action.type) {
        case SET_CURRENT: {
            return action.value
        }
        case SET_CURRENT_FROM_UI: {
            switch (action.value.ui.type) {
                case VIS_TYPE_PIE:
                    return getPieCurrentFromUi(state, action.value.ui)
                case VIS_TYPE_SINGLE_VALUE:
                case VIS_TYPE_GAUGE:
                    return getSingleValueCurrentFromUi(state, action.value.ui)
                case VIS_TYPE_YEAR_OVER_YEAR_LINE:
                case VIS_TYPE_YEAR_OVER_YEAR_COLUMN:
                    return getYearOverYearCurrentFromUi(state, action.value.ui)
                case VIS_TYPE_SCATTER:
                    return getScatterCurrentFromUi(state, action.value.ui)
                default: {
                    return getDefaultFromUi(
                        state,
                        action.value.ui,
                        action.value.metadata
                    )
                }
            }
        }
        case CLEAR_CURRENT:
            return DEFAULT_CURRENT
        default:
            return state
    }
}

// Selectors

export const sGetCurrent = (state) => state.current
export const sGetCurrentFromUi = (state) => {
    const ui = state.ui

    switch (ui.type) {
        case VIS_TYPE_PIE:
            return getPieCurrentFromUi(state, ui)
        case VIS_TYPE_SINGLE_VALUE:
        case VIS_TYPE_GAUGE:
            return getSingleValueCurrentFromUi(state, ui)
        case VIS_TYPE_YEAR_OVER_YEAR_LINE:
        case VIS_TYPE_YEAR_OVER_YEAR_COLUMN:
            return getYearOverYearCurrentFromUi(state, ui)
        case VIS_TYPE_SCATTER:
            return getScatterCurrentFromUi(state, ui)
        default: {
            return getDefaultFromUi(state, ui)
        }
    }
}
