import { YEAR_ON_YEAR } from './chartTypes';
import { AXIS_NAME_COLUMNS, AXIS_NAME_ROWS, AXIS_NAME_FILTERS } from './layout';
import { FIXED_DIMENSIONS } from './fixedDimensions';

const peId = FIXED_DIMENSIONS.pe.id;

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

export const getUiByType = (ui, type) => {
    switch (type) {
        case YEAR_ON_YEAR: {
            return yearOnYearUiAdapter(ui);
        }
        default:
            return ui;
    }
};
