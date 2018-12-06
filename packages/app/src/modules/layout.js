import pick from 'lodash-es/pick';
import i18n from '@dhis2/d2-i18n';
import { YEAR_OVER_YEAR_LINE, YEAR_OVER_YEAR_COLUMN } from './chartTypes';
import { FIXED_DIMENSIONS } from './fixedDimensions';

const dxId = FIXED_DIMENSIONS.dx.id;
const peId = FIXED_DIMENSIONS.pe.id;

// Prop names for analytical object axes
export const AXIS_NAME_COLUMNS = 'columns';
export const AXIS_NAME_ROWS = 'rows';
export const AXIS_NAME_FILTERS = 'filters';
export const SOURCE_DIMENSIONS = 'dimensions';

export const AXIS_NAMES = [
    AXIS_NAME_COLUMNS,
    AXIS_NAME_ROWS,
    AXIS_NAME_FILTERS,
];

// Prop names for dimension id and items
export const DIMENSION_ID_PROP_NAME = 'dimension';
export const DIMENSION_ITEMS_PROP_NAME = 'items';

// Keys and displayName for adding dimensions to layout
export const ADD_TO_LAYOUT_OPTIONS = [
    { axisKey: AXIS_NAME_COLUMNS, name: i18n.t('Add to series') },
    { axisKey: AXIS_NAME_ROWS, name: i18n.t('Add to category') },
    { axisKey: AXIS_NAME_FILTERS, name: i18n.t('Add to filter') },
];

export const menuLabels = {
    columns: i18n.t('series'),
    rows: i18n.t('category'),
    filters: i18n.t('filter'),
};

// Layout validation functions
const validateDefault = layout => {
    if (!(layout.columns.length && layout.columns[0].items.length)) {
        throw new Error(i18n.t('Please add a series dimension'));
    }

    if (!(layout.rows.length && layout.rows[0].items.length)) {
        throw new Error(i18n.t('Please add a category dimension'));
    }

    const pe = [...layout.columns, ...layout.rows, ...layout.filters].find(
        dim => dim.dimension === peId
    );

    if (!(pe && pe.items.length)) {
        if (!(layout.columns.length && layout.columns[0].items.length)) {
            throw new Error(i18n.t('Please add a series dimension'));
        }

        throw new Error(i18n.t('Please add a period'));
    }
};

const validateYearOverYear = layout => {
    if (
        !(
            layout.columns.length &&
            layout.columns[0].dimension === dxId &&
            layout.columns[0].items.length
        )
    ) {
        throw new Error(i18n.t('Please add Data as a filter dimension'));
    }
    console.log(layout);
};

export const validateLayoutByType = (layout, type) => {
    switch (type) {
        case YEAR_OVER_YEAR_COLUMN:
        case YEAR_OVER_YEAR_LINE:
            return validateYearOverYear(layout);
        default:
            return validateDefault(layout);
    }
};

// Layout utility functions

// Accepts: dimensionId, [itemIds]
// Returns dimension object { dimension: 'dx', items: [{ id: abc }] }
export const createDimension = (dimensionId, itemIds) => ({
    dimension: dimensionId,
    items: itemIds.map(id => ({ id })),
});

// Collect all dimensions from the layout in an array
export const getAllDimensions = visualization =>
    AXIS_NAMES.reduce(
        (dimensions, key) => dimensions.concat(visualization[key]),
        []
    );

// Exclude one or many dimensions from layout
export const getFilteredLayout = (layout, excludedIds) => {
    const ids = Array.isArray(excludedIds) ? excludedIds : [excludedIds];
    return {
        [AXIS_NAME_COLUMNS]: layout[AXIS_NAME_COLUMNS].filter(
            dim => !ids.includes(dim)
        ),
        [AXIS_NAME_ROWS]: layout[AXIS_NAME_ROWS].filter(
            dim => !ids.includes(dim)
        ),
        [AXIS_NAME_FILTERS]: layout[AXIS_NAME_FILTERS].filter(
            dim => !ids.includes(dim)
        ),
    };
};

export const getItemIdsByDimension = visualization => {
    const dimensions = getAllDimensions(visualization);
    return dimensions.reduce(
        (map, dim) => ({
            ...map,
            [dim[DIMENSION_ID_PROP_NAME]]: dim[DIMENSION_ITEMS_PROP_NAME].map(
                item => item.id
            ),
        }),
        {}
    );
};

export const getDimensionIdsByAxis = visualization => {
    const axes = pick(visualization, AXIS_NAMES);

    const entries = Object.entries(axes);
    const entriesWithIds = entries.map(([axisName, dimensions]) => [
        axisName,
        dimensions.map(dim => dim.dimension),
    ]);

    return entriesWithIds.reduce(
        (obj, [key, value]) => ({ ...obj, [key]: value }),
        {}
    );
};

// Accepts layout: { columns: ['dx'] }
// Returns inverse layout: { dx: 'columns' }
export const getInverseLayout = layout => {
    const entries = Object.entries(layout);
    const map = {};

    entries.forEach(([axisName, dimensionIds]) => {
        dimensionIds.forEach(id => {
            map[id] = axisName;
        });
    });

    return map;
};

// Accepts layout and modification object
// Returns modObj with swapped dimensions
export const getSwapModObj = (layout, modObj) => {
    const inverseLayout = getInverseLayout(layout);
    const dimensionIds = Object.keys(modObj);
    const swappedModObj = {};

    dimensionIds.forEach(id => {
        const existsAt = inverseLayout[id];
        const destinationAxis = modObj[id];
        const dimensionAtDestination = layout[destinationAxis][0];

        if (
            existsAt &&
            destinationAxis !== 'filters' &&
            dimensionAtDestination
        ) {
            swappedModObj[dimensionAtDestination] = existsAt;
        }
    });

    return swappedModObj;
};
