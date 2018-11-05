import { YEAR_OVER_YEAR_LINE, YEAR_OVER_YEAR_COLUMN } from './chartTypes';
import {
    AXIS_NAME_COLUMNS,
    AXIS_NAME_ROWS,
    AXIS_NAME_FILTERS,
    getDimensionIdsByAxis,
    getItemIdsByDimension,
} from './layout';
import { FIXED_DIMENSIONS } from './fixedDimensions';
import { isYearOverYear } from './chartTypes';
import { getOptionsFromVisualization } from './options';

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
        isYearOverYear(vis.type) && vis.yearlySeries
            ? vis.yearlySeries
            : currentState.yearOverYearSeries,
    yearOverYearCategory: isYearOverYear(vis.type)
        ? vis.rows[0].items.map(item => item.id)
        : currentState.yearOverYearCategory,
});

// Transform from store.ui to year on year format
const yearOverYearUiAdapter = ui => {
    const state = Object.assign({}, ui);

    const items = Object.assign({}, state.itemsByDimension);
    delete items[peId];

    return {
        ...state,
        layout: {
            [AXIS_NAME_COLUMNS]: [],
            [AXIS_NAME_ROWS]: [],
            [AXIS_NAME_FILTERS]: [
                ...state.layout[AXIS_NAME_FILTERS],
                ...state.layout[AXIS_NAME_COLUMNS],
                ...state.layout[AXIS_NAME_ROWS],
            ].filter(dim => dim !== peId),
        },
        itemsByDimension: items,
    };
};

export const getAdaptedUiByType = ui => {
    switch (ui.type) {
        case YEAR_OVER_YEAR_LINE:
        case YEAR_OVER_YEAR_COLUMN: {
            return yearOverYearUiAdapter(ui);
        }
        default:
            return ui;
    }
};
