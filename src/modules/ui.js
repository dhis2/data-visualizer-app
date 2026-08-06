import {
    DIMENSION_ID_PERIOD,
    DIMENSION_ID_ORGUNIT,
    DIMENSION_ID_DATA,
    layoutGetAxisIdDimensionIdsObject,
    layoutGetDimensionIdItemIdsObject,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
    VIS_TYPE_YEAR_OVER_YEAR_COLUMN,
    VIS_TYPE_OUTLIER_TABLE,
    VIS_TYPE_PIVOT_TABLE,
    VIS_TYPE_SCATTER,
    defaultVisType,
    isYearOverYear,
    getAdaptedUiLayoutByType,
    VIS_TYPE_GAUGE,
    VIS_TYPE_SINGLE_VALUE,
} from '@dhis2/analytics'
import {
    DEFAULT_STATE as OUTLIER_METHOD_THRESHOLD_DEFAULT_STATE,
    METHOD_MODIFIED_Z_SCORE,
    METHOD_STANDARD_Z_SCORE,
    OUTLIER_METHOD_PROP,
} from '../components/VisualizationOptions/Options/OutliersForOutlierTable.jsx'
import { DEFAULT_STATE as OUTLIER_MAX_RESULTS_DEFAULT_STATE } from '../components/VisualizationOptions/Options/OutliersMaxResults.jsx'
import { getDisabledOptions } from './disabledOptions.js'
import { BASE_FIELD_YEARLY_SERIES } from './fields/baseFields.js'
import { getInverseLayout } from './layout.js'
import {
    getOptionsFromVisualization,
    OPTION_MEASURE_CRITERIA,
    OPTION_OUTLIER_ANALYSIS,
} from './options.js'
import { removeLastPathSegment } from './orgUnit.js'

export const SERIES_ITEM_TYPE_PROP = 'type'
export const SERIES_ITEM_AXIS_PROP = 'axis'
export const ITEM_ATTRIBUTE_VERTICAL = 'VERTICAL'
export const ITEM_ATTRIBUTE_HORIZONTAL = 'HORIZONTAL'

export const getDefaultSorting = () => ({
    dimension: 'value',
    direction: 'desc',
})

// Transform from backend model to store.ui format
export const getUiFromVisualization = (vis, currentState = {}) => {
    const visType = vis.type || defaultVisType
    const options = getOptionsFromVisualization(vis)

    return {
        ...currentState,
        type: visType,
        options,
        disabledOptions: getDisabledOptions({ visType, options }),
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
    }
}

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
    adaptedUi.options[OPTION_MEASURE_CRITERIA] = undefined
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

    adaptedUi.options[OPTION_MEASURE_CRITERIA] = undefined

    return adaptedUi
}

// Transform from store.ui to outlier table format
const outlierTableUiAdapter = (ui) => {
    const adaptedUi = defaultUiAdapter(ui)

    const outlierAnalysis = ui.options?.[OPTION_OUTLIER_ANALYSIS]

    if (
        !outlierAnalysis ||
        ![METHOD_STANDARD_Z_SCORE, METHOD_MODIFIED_Z_SCORE].includes(
            outlierAnalysis[OUTLIER_METHOD_PROP]
        )
    ) {
        adaptedUi.options[OPTION_OUTLIER_ANALYSIS] = {
            ...OUTLIER_METHOD_THRESHOLD_DEFAULT_STATE,
            ...OUTLIER_MAX_RESULTS_DEFAULT_STATE,
        }
    }

    return adaptedUi
}

export const getAdaptedUiByType = (ui) => {
    let adaptedUi

    switch (ui.type) {
        case VIS_TYPE_YEAR_OVER_YEAR_LINE:
        case VIS_TYPE_YEAR_OVER_YEAR_COLUMN: {
            adaptedUi = yearOverYearUiAdapter(ui)
            break
        }
        case VIS_TYPE_PIVOT_TABLE:
            adaptedUi = ui
            break
        case VIS_TYPE_GAUGE:
        case VIS_TYPE_SINGLE_VALUE:
            adaptedUi = singleValueUiAdapter(ui)
            break
        case VIS_TYPE_SCATTER:
            adaptedUi = scatterUiAdapter(ui)
            break
        case VIS_TYPE_OUTLIER_TABLE:
            adaptedUi = outlierTableUiAdapter(ui)
            break
        default:
            adaptedUi = defaultUiAdapter(ui)
            break
    }

    return {
        ...adaptedUi,
        disabledOptions: getDisabledOptions({
            visType: adaptedUi.type,
            options: adaptedUi.options,
        }),
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

export const getSortingFromVisualization = (visualization) => {
    return visualization.sorting?.length
        ? {
              dimension: visualization.sorting[0].dimension,
              direction: visualization.sorting[0].direction.toLowerCase(),
          }
        : undefined
}
