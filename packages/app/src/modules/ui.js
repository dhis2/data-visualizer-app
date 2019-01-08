import { YEAR_OVER_YEAR_LINE, YEAR_OVER_YEAR_COLUMN, PIE } from './chartTypes';
import { getDimensionIdsByAxis, getItemIdsByDimension } from './layout';
import { FIXED_DIMENSIONS } from './fixedDimensions';
import { isYearOverYear } from './chartTypes';
import { getOptionsFromVisualization } from './options';
import { BASE_FIELD_YEARLY_SERIES } from './fields/baseFields';
import { pieLayoutAdapter, yearOverYearLayoutAdapter } from './layoutAdapters';

const peId = FIXED_DIMENSIONS.pe.id;

// Transform from backend model to store.ui format
export const getUiFromVisualization = (vis, currentState = {}) => ({
    ...currentState,
    type: vis.type,
    options: getOptionsFromVisualization(vis),
    layout: getDimensionIdsByAxis(vis),
    itemsByDimension: getItemIdsByDimension(vis),
    parentGraphMap: vis.parentGraphMap || currentState.parentGraphMap,
    yearOverYearSeries:
        isYearOverYear(vis.type) && vis[BASE_FIELD_YEARLY_SERIES]
            ? vis[BASE_FIELD_YEARLY_SERIES]
            : currentState.yearOverYearSeries,
    yearOverYearCategory: isYearOverYear(vis.type)
        ? vis.rows[0].items.map(item => item.id)
        : currentState.yearOverYearCategory,
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
        case PIE: {
            return pieUiAdapter(ui);
        }
        default:
            return ui;
    }
};
