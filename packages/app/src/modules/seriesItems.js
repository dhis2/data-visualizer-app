import { DEFAULT_UI } from '../reducers/ui'

export const SERIES_ITEMS_SERIES = 'series'
export const SERIES_ITEMS_AXIS = 'axis'

export const getAxesFromSeriesItems = seriesItems => {
    if (!(Array.isArray(seriesItems) && seriesItems.length)) {
        return DEFAULT_UI.axes
    }

    return seriesItems
        .filter(item => typeof item.axis === 'number')
        .reduce((map, item) => {
            map[item[SERIES_ITEMS_SERIES]] = item[SERIES_ITEMS_AXIS]
            return map
        }, {})
}
