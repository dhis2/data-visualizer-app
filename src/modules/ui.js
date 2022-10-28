import {
    DIMENSION_ID_PERIOD,
    DIMENSION_ID_ORGUNIT,
    DIMENSION_ID_DATA,
    layoutGetAxisIdDimensionIdsObject,
    layoutGetDimensionIdItemIdsObject,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
    VIS_TYPE_YEAR_OVER_YEAR_COLUMN,
    VIS_TYPE_PIVOT_TABLE,
    VIS_TYPE_SCATTER,
    defaultVisType,
    isYearOverYear,
    getAdaptedUiLayoutByType,
    VIS_TYPE_GAUGE,
    VIS_TYPE_SINGLE_VALUE,
} from '@dhis2/analytics'
import { BASE_FIELD_YEARLY_SERIES } from './fields/baseFields.js'
import { getInverseLayout } from './layout.js'
import { getOptionsFromVisualization } from './options.js'
import { removeLastPathSegment } from './orgUnit.js'

export const SERIES_ITEM_TYPE_PROP = 'type'
export const SERIES_ITEM_AXIS_PROP = 'axis'
export const ITEM_ATTRIBUTE_VERTICAL = 'VERTICAL'
export const ITEM_ATTRIBUTE_HORIZONTAL = 'HORIZONTAL'

// Transform from backend model to store.ui format
export const getUiFromVisualization = (vis, currentState = {}) => ({
    ...currentState,
    type: vis.type || defaultVisType,
    options: getOptionsFromVisualization(vis),
    layout: layoutGetAxisIdDimensionIdsObject(vis),
    itemsByDimension: layoutGetDimensionIdItemIdsObject(vis),
    parentGraphMap:
        vis.parentGraphMap ||
        getParentGraphMapFromVisualization(vis) ||
        currentState.parentGraphMap,
    yearOverYearSeries:
        isYearOverYear(vis.type) && vis[BASE_FIELD_YEARLY_SERIES]
            ? vis[BASE_FIELD_YEARLY_SERIES]
            : currentState.yearOverYearSeries,
    yearOverYearCategory: isYearOverYear(vis.type)
        ? vis.rows[0].items.map((item) => item.id)
        : currentState.yearOverYearCategory,
})

// Transform from store.ui to default format
const defaultUiAdapter = (ui) => ({
    ...ui,
    layout: getAdaptedUiLayoutByType(ui.layout, ui.type),
})

// Transform from store.ui to year on year format
const yearOverYearUiAdapter = (ui) => {
    const state = Object.assign({}, ui)

    const items = Object.assign({}, state.itemsByDimension)
    delete items[DIMENSION_ID_PERIOD]

    return {
        ...state,
        layout: getAdaptedUiLayoutByType(ui.layout, ui.type),
        itemsByDimension: items,
    }
}

const singleValueUiAdapter = (ui) => {
    const adaptedUi = defaultUiAdapter(ui)
    adaptedUi.options.measureCriteria = undefined
    return adaptedUi
}

// Transform from store.ui to scatter format
const scatterUiAdapter = (ui) => {
    const adaptedUi = {
        ...ui,
        layout: getAdaptedUiLayoutByType(ui.layout, ui.type),
    }

    const dataItems = ui.itemsByDimension[DIMENSION_ID_DATA] || []

    adaptedUi.itemAttributes = [
        // TODO: Should this be cleared for all other uiAdapters?
        ...(dataItems[0]
            ? [{ id: dataItems[0], attribute: ITEM_ATTRIBUTE_VERTICAL }]
            : []),
        ...(dataItems[1]
            ? [{ id: dataItems[1], attribute: ITEM_ATTRIBUTE_HORIZONTAL }]
            : []),
    ]

    const items = Object.assign({}, ui.itemsByDimension)
    items[DIMENSION_ID_DATA] = dataItems.slice(0, 2)

    adaptedUi.itemsByDimension = items

    adaptedUi.options.measureCriteria = undefined

    return adaptedUi
}

export const getAdaptedUiByType = (ui) => {
    switch (ui.type) {
        case VIS_TYPE_YEAR_OVER_YEAR_LINE:
        case VIS_TYPE_YEAR_OVER_YEAR_COLUMN: {
            return yearOverYearUiAdapter(ui)
        }
        case VIS_TYPE_PIVOT_TABLE:
            return ui
        case VIS_TYPE_GAUGE:
        case VIS_TYPE_SINGLE_VALUE:
            return singleValueUiAdapter(ui)
        case VIS_TYPE_SCATTER:
            return scatterUiAdapter(ui)
        default:
            return defaultUiAdapter(ui)
    }
}

export const getParentGraphMapFromVisualization = (vis) => {
    const dimensionIdsByAxis = layoutGetAxisIdDimensionIdsObject(vis)
    const inverseLayout = getInverseLayout(dimensionIdsByAxis)
    const ouAxis = inverseLayout[DIMENSION_ID_ORGUNIT]

    if (!ouAxis) {
        return {}
    }

    const parentGraphMap = {}
    const ouDimension = vis[ouAxis].find(
        (dimension) => dimension.dimension === DIMENSION_ID_ORGUNIT
    )

    ouDimension.items
        .filter((orgUnit) => orgUnit.path)
        .forEach((orgUnit) => {
            if ('/' + orgUnit.id === orgUnit.path) {
                // root org unit case
                parentGraphMap[orgUnit.id] = ''
            } else {
                const path = removeLastPathSegment(orgUnit.path)
                parentGraphMap[orgUnit.id] =
                    path[0] === '/' ? path.substr(1) : path
            }
        })

    return parentGraphMap
}

export const mergeUiMaps = (destinationMap, sourceMap, propName) => {
    Object.keys(sourceMap || {}).forEach((key) => {
        if (!(key in destinationMap)) {
            destinationMap[key] = {}
        }

        destinationMap[key][propName] = sourceMap[key]
    })
}
