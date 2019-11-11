import {
    DIMENSION_ID_PERIOD,
    DIMENSION_ID_ORGUNIT,
    layoutGetAxisNameDimensionIdsObject,
    layoutGetDimensionIdItemIdsObject,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
    VIS_TYPE_YEAR_OVER_YEAR_COLUMN,
    VIS_TYPE_PIE,
    VIS_TYPE_GAUGE,
    VIS_TYPE_SINGLE_VALUE,
    defaultVisType,
    isYearOverYear,
} from '@dhis2/analytics';

import { getInverseLayout } from './layout';
import { getOptionsFromVisualization } from './options';
import { BASE_FIELD_YEARLY_SERIES } from './fields/baseFields';
import {
    pieLayoutAdapter,
    yearOverYearLayoutAdapter,
    singleValueLayoutAdapter,
} from './layoutAdapters';
import { removeLastPathSegment } from './orgUnit';
import { getAxesFromSeriesItems } from './seriesItems';

// Transform from backend model to store.ui format
export const getUiFromVisualization = (vis, currentState = {}) => ({
    ...currentState,
    type: vis.type || defaultVisType,
    options: getOptionsFromVisualization(vis),
    layout: layoutGetAxisNameDimensionIdsObject(vis),
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
        ? vis.rows[0].items.map(item => item.id)
        : currentState.yearOverYearCategory,
    axes: getAxesFromSeriesItems(vis.seriesItems),
});

// Transform from store.ui to pie format
export const pieUiAdapter = ui => ({
    ...ui,
    layout: pieLayoutAdapter(ui.layout),
});

// Transform from store.ui to year on year format
export const yearOverYearUiAdapter = ui => {
    const state = Object.assign({}, ui);

    const items = Object.assign({}, state.itemsByDimension);
    delete items[DIMENSION_ID_PERIOD];

    return {
        ...state,
        layout: yearOverYearLayoutAdapter(ui.layout),
        itemsByDimension: items,
    };
};

export const singleValueUiAdapter = ui => ({
    ...ui,
    layout: singleValueLayoutAdapter(ui.layout),
});

export const getAdaptedUiByType = ui => {
    switch (ui.type) {
        case VIS_TYPE_YEAR_OVER_YEAR_LINE:
        case VIS_TYPE_YEAR_OVER_YEAR_COLUMN: {
            return yearOverYearUiAdapter(ui);
        }
        case VIS_TYPE_PIE:
        case VIS_TYPE_GAUGE: {
            return pieUiAdapter(ui);
        }
        case VIS_TYPE_SINGLE_VALUE: {
            return singleValueUiAdapter(ui);
        }
        default:
            return ui;
    }
};

export const getParentGraphMapFromVisualization = vis => {
    const dimensionIdsByAxis = layoutGetAxisNameDimensionIdsObject(vis);
    const inverseLayout = getInverseLayout(dimensionIdsByAxis);
    const ouAxis = inverseLayout[DIMENSION_ID_ORGUNIT];

    if (!ouAxis) {
        return {};
    }

    const parentGraphMap = {};
    const ouDimension = vis[ouAxis].find(
        dimension => dimension.dimension === DIMENSION_ID_ORGUNIT
    );

    ouDimension.items
        .filter(orgUnit => orgUnit.path)
        .forEach(orgUnit => {
            if ('/' + orgUnit.id === orgUnit.path) {
                // root org unit case
                parentGraphMap[orgUnit.id] = '';
            } else {
                const path = removeLastPathSegment(orgUnit.path);
                parentGraphMap[orgUnit.id] =
                    path[0] === '/' ? path.substr(1) : path;
            }
        });

    return parentGraphMap;
};

export const mergeUiMaps = (destinationMap, sourceMap, propName) => {
    Object.keys(sourceMap || {}).forEach(key => {
        if (!(key in destinationMap)) {
            destinationMap[key] = {};
        }

        destinationMap[key][propName] = sourceMap[key];
    });
};
