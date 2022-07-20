import {
    VIS_TYPE_PIVOT_TABLE,
    VIS_TYPE_COLUMN,
    VIS_TYPE_STACKED_COLUMN,
    VIS_TYPE_BAR,
    VIS_TYPE_STACKED_BAR,
    VIS_TYPE_LINE,
    VIS_TYPE_AREA,
    VIS_TYPE_STACKED_AREA,
    VIS_TYPE_PIE,
    VIS_TYPE_RADAR,
    VIS_TYPE_GAUGE,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
    VIS_TYPE_YEAR_OVER_YEAR_COLUMN,
    VIS_TYPE_SINGLE_VALUE,
    VIS_TYPE_SCATTER,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import { DEFAULT_CURRENT } from '../reducers/current.js'
import { DEFAULT_VISUALIZATION } from '../reducers/visualization.js'
import { default as options } from './options.js'

export const visTypes = [
    VIS_TYPE_PIVOT_TABLE,
    VIS_TYPE_COLUMN,
    VIS_TYPE_STACKED_COLUMN,
    VIS_TYPE_BAR,
    VIS_TYPE_STACKED_BAR,
    VIS_TYPE_LINE,
    VIS_TYPE_AREA,
    VIS_TYPE_STACKED_AREA,
    VIS_TYPE_PIE,
    VIS_TYPE_RADAR,
    VIS_TYPE_GAUGE,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
    VIS_TYPE_YEAR_OVER_YEAR_COLUMN,
    VIS_TYPE_SINGLE_VALUE,
    VIS_TYPE_SCATTER,
]

export const visTypeDescriptions = {
    [VIS_TYPE_PIVOT_TABLE]: i18n.t(
        'View data and indicators in a manipulatable table.'
    ),
    [VIS_TYPE_COLUMN]: i18n.t(
        'Compare sizes of related elements vertically. Recommend period as filter.'
    ),
    [VIS_TYPE_STACKED_COLUMN]: i18n.t(
        'Compare parts of a whole against related elements vertically. Recommend data or org. unit as series.'
    ),
    [VIS_TYPE_BAR]: i18n.t(
        'Compare sizes of related elements horizontally. Recommend period as filter.'
    ),
    [VIS_TYPE_STACKED_BAR]: i18n.t(
        'Compare parts of a whole against related elements horizontally. Recommend data or org. unit as series.'
    ),
    [VIS_TYPE_LINE]: i18n.t(
        'Track or compare changes over time. Recommend period as category.'
    ),
    [VIS_TYPE_AREA]: i18n.t(
        'Track or compare changes over time. Recommend period as category.'
    ),
    [VIS_TYPE_STACKED_AREA]: i18n.t(
        'Track or compare parts of a whole over time. Recommend data as series and period as category.'
    ),
    [VIS_TYPE_PIE]: i18n.t(
        'Compare parts of a whole at a single point in time. Recommend period as filter.'
    ),
    [VIS_TYPE_RADAR]: i18n.t(
        'Compare several items against multiple variables.'
    ),
    [VIS_TYPE_GAUGE]: i18n.t(
        'Compare a percentage indicator against a 100% scale. Recommend period as filter.'
    ),
    [VIS_TYPE_YEAR_OVER_YEAR_LINE]: i18n.t(
        'Compare changes over time between multiple time periods.'
    ),
    [VIS_TYPE_YEAR_OVER_YEAR_COLUMN]: i18n.t(
        'Compare changes over time between multiple time periods.'
    ),
    [VIS_TYPE_SINGLE_VALUE]: i18n.t(
        'Display a single value. Recommend relative period to show latest data.'
    ),
    [VIS_TYPE_SCATTER]: i18n.t(
        'View the relationship between two data items at a place or time. Recommended for finding outliers.'
    ),
}

export const getVisualizationFromCurrent = (current) => {
    const visualization = Object.assign({}, current)
    const nonSavableOptions = Object.keys(options).filter(
        (option) => !options[option].savable
    )

    nonSavableOptions.forEach((option) => delete visualization[option])

    return visualization
}

export const getVisualizationState = (visualization, current) => {
    if (current === DEFAULT_CURRENT) {
        return STATE_EMPTY
    } else if (visualization === DEFAULT_VISUALIZATION) {
        return STATE_UNSAVED
    } else if (current === visualization) {
        return STATE_SAVED
    } else {
        return STATE_DIRTY
    }
}

export const STATE_EMPTY = 'EMPTY'
export const STATE_SAVED = 'SAVED'
export const STATE_UNSAVED = 'UNSAVED'
export const STATE_DIRTY = 'DIRTY'
