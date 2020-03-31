import options from './options'
import { DEFAULT_VISUALIZATION } from '../reducers/visualization'
import { DEFAULT_CURRENT } from '../reducers/current'

export const getVisualizationFromCurrent = current => {
    const nonSavableOptions = Object.keys(options).filter(
        option => !options[option].savable
    )

    nonSavableOptions.forEach(option => delete current[option])

    return current
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
