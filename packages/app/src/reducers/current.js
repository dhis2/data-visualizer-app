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
} from '../modules/current'
import { BASE_FIELD_TYPE } from '../modules/fields/baseFields'

export const SET_CURRENT = 'SET_CURRENT'
export const SET_CURRENT_FROM_UI = 'SET_CURRENT_FROM_UI'
export const CLEAR_CURRENT = 'CLEAR_CURRENT'

export const DEFAULT_CURRENT = null

const getDefaultFromUi = (state, action) => {
    const axesFromUi = getAxesFromUi(action.value)
    const optionsFromUi = getOptionsFromUi(action.value)
    const series = getSeriesFromUi(action.value)

    return {
        ...state,
        [BASE_FIELD_TYPE]: action.value.type,
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
            switch (action.value.type) {
                case VIS_TYPE_PIE:
                    return getPieCurrentFromUi(state, action)
                case VIS_TYPE_SINGLE_VALUE:
                case VIS_TYPE_GAUGE:
                    return getSingleValueCurrentFromUi(state, action)
                case VIS_TYPE_YEAR_OVER_YEAR_LINE:
                case VIS_TYPE_YEAR_OVER_YEAR_COLUMN:
                    return getYearOverYearCurrentFromUi(state, action)
                case VIS_TYPE_SCATTER:
                    return getScatterCurrentFromUi(state, action)
                default: {
                    return getDefaultFromUi(state, action)
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

export const sGetCurrent = state => state.current
export const sGetCurrentFromUi = state => {
    const ui = state.ui

    switch (ui.type) {
        case VIS_TYPE_PIE:
            return getPieCurrentFromUi(state, { value: ui })
        case VIS_TYPE_SINGLE_VALUE:
        case VIS_TYPE_GAUGE:
            return getSingleValueCurrentFromUi(state, { value: ui })
        case VIS_TYPE_YEAR_OVER_YEAR_LINE:
        case VIS_TYPE_YEAR_OVER_YEAR_COLUMN:
            return getYearOverYearCurrentFromUi(state, { value: ui })
        case VIS_TYPE_SCATTER:
            return getScatterCurrentFromUi(state, { value: ui })
        default: {
            return getDefaultFromUi(state, { value: ui })
        }
    }
}
