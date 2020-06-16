import {
    AXIS_ID_COLUMNS,
    AXIS_ID_ROWS,
    AXIS_ID_FILTERS,
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
} from '@dhis2/analytics'

// Transform from ui.layout to default layout format
export const defaultLayoutAdapter = layout => {
    const columns = layout[AXIS_ID_COLUMNS].slice()
    const rows = layout[AXIS_ID_ROWS].slice()

    return {
        [AXIS_ID_COLUMNS]: columns.length ? [columns.shift()] : columns,
        [AXIS_ID_ROWS]: rows.length ? [rows.shift()] : rows,
        [AXIS_ID_FILTERS]: [...layout[AXIS_ID_FILTERS], ...columns, ...rows],
    }
}

// Transform from ui.layout to pie layout format
export const pieLayoutAdapter = layout => {
    const columns = layout[AXIS_ID_COLUMNS].slice()
    const rows = layout[AXIS_ID_ROWS].slice()

    return {
        [AXIS_ID_COLUMNS]: columns.length
            ? [columns.shift()]
            : rows.length
            ? [rows.shift()]
            : [],
        [AXIS_ID_ROWS]: [],
        [AXIS_ID_FILTERS]: [...layout[AXIS_ID_FILTERS], ...columns, ...rows],
    }
}

// Transform from ui.layout to year on year layout format
export const yearOverYearLayoutAdapter = layout => ({
    [AXIS_ID_COLUMNS]: [],
    [AXIS_ID_ROWS]: [],
    [AXIS_ID_FILTERS]: [
        ...layout[AXIS_ID_FILTERS],
        ...layout[AXIS_ID_COLUMNS],
        ...layout[AXIS_ID_ROWS],
    ].filter(dim => dim !== DIMENSION_ID_PERIOD),
})

// Transform from ui.layout to single value layout format
export const singleValueLayoutAdapter = layout => {
    const columns = layout[AXIS_ID_COLUMNS].slice()
    const rows = layout[AXIS_ID_ROWS].slice()

    return {
        [AXIS_ID_COLUMNS]: [DIMENSION_ID_DATA],
        [AXIS_ID_ROWS]: [],
        [AXIS_ID_FILTERS]: [
            ...layout[AXIS_ID_FILTERS],
            ...columns,
            ...rows,
        ].filter(dim => dim !== DIMENSION_ID_DATA),
    }
}

// Transform from ui.layout to multi category layout format
export const multiCategoryLayoutAdapter = layout => {
    const columns = layout[AXIS_ID_COLUMNS].slice()

    return {
        [AXIS_ID_COLUMNS]: columns.length ? [columns.shift()] : columns,
        [AXIS_ID_ROWS]: [...layout[AXIS_ID_ROWS]],
        [AXIS_ID_FILTERS]: [...layout[AXIS_ID_FILTERS], ...columns],
    }
}
