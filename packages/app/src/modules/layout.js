import pick from 'lodash-es/pick';
import isObject from 'lodash-es/isObject';
import i18n from '@dhis2/d2-i18n';
import { YEAR_OVER_YEAR_LINE, YEAR_OVER_YEAR_COLUMN, PIE } from './chartTypes';
import { FIXED_DIMENSIONS } from './fixedDimensions';
import { BASE_FIELD_YEARLY_SERIES } from './fields/baseFields';

const dxName = FIXED_DIMENSIONS.dx.name;
const peId = FIXED_DIMENSIONS.pe.id;

// Names for analytical object axes
export const AXIS_NAME_COLUMNS = 'columns';
export const AXIS_NAME_ROWS = 'rows';
export const AXIS_NAME_FILTERS = 'filters';

export const AXIS_NAMES = [
    AXIS_NAME_COLUMNS,
    AXIS_NAME_ROWS,
    AXIS_NAME_FILTERS,
];

// Names for dnd sources
export const SOURCE_DIMENSIONS = 'dimensions';

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

const errorLabels = {
    defaultSeries: i18n.t('Please add at least one {{series}} dimension', {
        series: menuLabels.columns,
    }),
    defaultCategory: i18n.t('Please add at least one {{category}} dimension', {
        category: menuLabels.rows,
    }),
    defaultPeriod: i18n.t(
        'Please add at least one period as {series}}, {{category}} or {{filter}}',
        {
            series: menuLabels.columns,
            category: menuLabels.rows,
            filter: menuLabels.filters,
        }
    ),
    piePeriod: i18n.t(
        'Please add at least one period as {{category}} or {{filter}}',
        {
            category: menuLabels.rows,
            filter: menuLabels.filters,
        }
    ),
    yearOverYearSeriesPeriod: i18n.t(
        'Please add at least one period as a {{series}} dimension',
        {
            series: menuLabels.columns,
        }
    ),
    yearOverYearCategoryPeriod: i18n.t(
        'Please add at least one period as a {{category}} dimension',
        {
            category: menuLabels.rows,
        }
    ),
    yearOverYearData: i18n.t('Please add {{data}} as a filter dimension', {
        data: dxName,
    }),
};

// Layout validation helper functions
const isItemValid = item =>
    Boolean(isObject(item) && typeof item.id === 'string');

const isDimensionValid = dim =>
    Boolean(
        isObject(dim) &&
            typeof dim[DIMENSION_ID_PROP_NAME] === 'string' &&
            Array.isArray(dim[DIMENSION_ITEMS_PROP_NAME]) &&
            isItemValid(dim[DIMENSION_ITEMS_PROP_NAME][0])
    );

const isAxisValid = axis =>
    Boolean(Array.isArray(axis) && isDimensionValid(axis[0]));

const validateDimension = (dimension, message) => {
    if (!(dimension && isDimensionValid(dimension))) {
        throw new Error(message);
    }
};

const validateAxis = (axis, message) => {
    if (!isAxisValid(axis)) {
        throw new Error(message);
    }
};

const findPeDimension = layout =>
    [...layout.columns, ...layout.rows, ...layout.filters].find(
        dim => dim.dimension === peId
    );

// Layout validation
const validateDefaultLayout = layout => {
    validateAxis(layout.columns, errorLabels.defaultSeries);
    validateAxis(layout.rows, errorLabels.defaultCategory);
    validateDimension(findPeDimension(layout), errorLabels.defaultPeriod);
};

const validateYearOverYearLayout = layout => {
    if (
        !(
            Array.isArray(layout[BASE_FIELD_YEARLY_SERIES]) &&
            typeof layout[BASE_FIELD_YEARLY_SERIES][0] === 'string'
        )
    ) {
        throw new Error(errorLabels.yearOverYearSeriesPeriod);
    }

    validateAxis(layout.rows, errorLabels.yearOverYearCategoryPeriod);

    validateAxis(layout.columns, errorLabels.yearOverYearData);
};

const validatePieLayout = layout => {
    validateAxis(layout.rows, errorLabels.defaultCategory);
    validateDimension(findPeDimension(layout), errorLabels.piePeriod);
};

export const validateLayout = layout => {
    switch (layout.type) {
        case PIE:
            return validatePieLayout(layout);
        case YEAR_OVER_YEAR_COLUMN:
        case YEAR_OVER_YEAR_LINE:
            return validateYearOverYearLayout(layout);
        default:
            return validateDefaultLayout(layout);
    }
};

// Layout utility functions

// Accepts: dimensionId, [itemIds]
// Returns dimension object { dimension: 'dx', items: [{ id: abc }] }
export const createDimension = (dimensionId, itemIds) => ({
    [DIMENSION_ID_PROP_NAME]: dimensionId,
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
        dimensions.map(dim => dim[DIMENSION_ID_PROP_NAME]),
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
