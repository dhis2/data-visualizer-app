import { AXIS_NAME_COLUMNS, AXIS_NAME_ROWS, AXIS_NAME_FILTERS } from './layout';
import { FIXED_DIMENSIONS } from './fixedDimensions';

const peId = FIXED_DIMENSIONS.pe.id;

// Transform from ui.layout to pie layout format
export const pieLayoutAdapter = layout => {
    const columns = layout[AXIS_NAME_COLUMNS].slice();
    const rows = layout[AXIS_NAME_ROWS].slice();

    return {
        [AXIS_NAME_COLUMNS]: [],
        [AXIS_NAME_ROWS]: [rows.shift() || columns.shift()],
        [AXIS_NAME_FILTERS]: [
            ...layout[AXIS_NAME_FILTERS],
            ...columns,
            ...rows,
        ],
    };
};

// Transform from ui.layout to year on year layout format
export const yearOverYearLayoutAdapter = layout => ({
    [AXIS_NAME_COLUMNS]: [],
    [AXIS_NAME_ROWS]: [],
    [AXIS_NAME_FILTERS]: [
        ...layout[AXIS_NAME_FILTERS],
        ...layout[AXIS_NAME_COLUMNS],
        ...layout[AXIS_NAME_ROWS],
    ].filter(dim => dim !== peId),
});
