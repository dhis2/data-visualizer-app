import {
    layoutGetAxisNameDimensionIdsObject,
    layoutGetDimensionIdItemIdsObject,
} from '@dhis2/d2-ui-analytics';

import {
    YEAR_OVER_YEAR_LINE,
    YEAR_OVER_YEAR_COLUMN,
    PIE,
    GAUGE,
    defaultChartType,
} from './chartTypes';
import { getInverseLayout } from './layout';
import { FIXED_DIMENSIONS } from './fixedDimensions';
import { isYearOverYear } from './chartTypes';
import { getOptionsFromVisualization } from './options';
import { BASE_FIELD_YEARLY_SERIES } from './fields/baseFields';
import { pieLayoutAdapter, yearOverYearLayoutAdapter } from './layoutAdapters';
import { removeOrgUnitLastPathSegment } from './orgUnitDimensions';
import { getAxesFromSeriesItems } from './seriesItems';

const peId = FIXED_DIMENSIONS.pe.id;

// Transform from backend model to store.ui format
export const getUiFromVisualization = (vis, currentState = {}) => ({
    ...currentState,
    type: vis.type || defaultChartType,
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
    delete items[peId];

    return {
        ...state,
        layout: yearOverYearLayoutAdapter(ui.layout),
        itemsByDimension: items,
    };
};

export const getAdaptedUiByType = ui => {
    switch (ui.type) {
        case YEAR_OVER_YEAR_LINE:
        case YEAR_OVER_YEAR_COLUMN: {
            return yearOverYearUiAdapter(ui);
        }
        case PIE:
        case GAUGE: {
            return pieUiAdapter(ui);
        }
        default:
            return ui;
    }
};

export const getParentGraphMapFromVisualization = vis => {
    const ouId = FIXED_DIMENSIONS.ou.id;
    const dimensionIdsByAxis = layoutGetAxisNameDimensionIdsObject(vis);
    const inverseLayout = getInverseLayout(dimensionIdsByAxis);
    const ouAxis = inverseLayout[ouId];

    if (!ouAxis) {
        return {};
    }

    const parentGraphMap = {};
    const ouDimension = vis[ouAxis].find(
        dimension => dimension.dimension === ouId
    );

    ouDimension.items
        .filter(orgUnit => orgUnit.path)
        .forEach(orgUnit => {
            if ('/' + orgUnit.id === orgUnit.path) {
                // root org unit case
                parentGraphMap[orgUnit.id] = '';
            } else {
                const path = removeOrgUnitLastPathSegment(orgUnit.path);
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
