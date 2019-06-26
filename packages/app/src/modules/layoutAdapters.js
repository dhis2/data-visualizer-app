import {
    AXIS_NAME_COLUMNS,
    AXIS_NAME_ROWS,
    AXIS_NAME_FILTERS,
    DIMENSION_ID_PERIOD,
} from '@dhis2/analytics';

// Transform from ui.layout to pie layout format
export const pieLayoutAdapter = layout => {
    const columns = layout[AXIS_NAME_COLUMNS].slice();
    const rows = layout[AXIS_NAME_ROWS].slice();

    return {
        [AXIS_NAME_COLUMNS]: [columns.shift() || rows.shift()],
        [AXIS_NAME_ROWS]: [],
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
    ].filter(dim => dim !== DIMENSION_ID_PERIOD),
});
