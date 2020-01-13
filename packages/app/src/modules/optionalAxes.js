import { DEFAULT_UI } from '../reducers/ui'

export const OPTIONAL_AXES_DIMENSIONAL_ITEM = 'dimensionalItem'
export const OPTIONAL_AXES_AXIS = 'axis'

export const getIdAxisMap = optionalAxes => {
    if (!(Array.isArray(optionalAxes) && optionalAxes.length)) {
        return DEFAULT_UI.axes
    }

    return optionalAxes
        .filter(item => typeof item[OPTIONAL_AXES_AXIS] === 'number')
        .reduce((map, item) => {
            map[item[OPTIONAL_AXES_DIMENSIONAL_ITEM]] = item[OPTIONAL_AXES_AXIS]
            return map
        }, {})
}
