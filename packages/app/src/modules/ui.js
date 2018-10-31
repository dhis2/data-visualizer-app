import { YEAR_ON_YEAR } from './chartTypes';
import {
    AXIS_NAME_COLUMNS,
    AXIS_NAME_ROWS,
    AXIS_NAME_FILTERS,
    getDimensionIdsByAxis,
    getItemIdsByDimension,
} from './layout';
import { FIXED_DIMENSIONS } from './fixedDimensions';
import { isYearOnYear } from './yearOnYear';
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
    yearOnYearSeries:
        isYearOnYear(vis.type) && vis.yearlySeries
            ? vis.yearlySeries
            : currentState.yearOnYearSeries,
    yearOnYearCategory: isYearOnYear(vis.type)
        ? vis.rows[0].items.map(item => item.id)
        : currentState.yearOnYearCategory,
});

// Transform from store.ui to year on year format
const yearOnYearUiAdapter = ui => {
    const items = ui.itemsByDimension;
    delete items[peId];

    return {
        ...ui,
        layout: {
            [AXIS_NAME_COLUMNS]: [],
            [AXIS_NAME_ROWS]: [],
            [AXIS_NAME_FILTERS]: [
                ...ui.layout[AXIS_NAME_FILTERS],
                ...ui.layout[AXIS_NAME_COLUMNS],
                ...ui.layout[AXIS_NAME_ROWS],
            ].filter(dim => dim !== peId),
        },
        itemsByDimension: items,
    };
};

export const getAdaptedUiByType = ui => {
    switch (ui.type) {
        case YEAR_ON_YEAR: {
            return yearOnYearUiAdapter(ui);
        }
        default:
            return ui;
    }
};
