import i18n from '@dhis2/d2-i18n';
import {
    AXIS_NAME_COLUMNS,
    AXIS_NAME_ROWS,
    AXIS_NAME_FILTERS,
} from '@dhis2/analytics';

// Names for dnd sources
export const SOURCE_DIMENSIONS = 'dimensions';

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

export const getMenuLabel = axis => {
    const menuLabels = {
        [AXIS_NAME_COLUMNS]: i18n.t('series'),
        [AXIS_NAME_ROWS]: i18n.t('category'),
        [AXIS_NAME_FILTERS]: i18n.t('filter'),
    };
    return menuLabels[axis];
};

// Layout utility functions

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
            destinationAxis !== AXIS_NAME_FILTERS &&
            dimensionAtDestination
        ) {
            swappedModObj[dimensionAtDestination] = existsAt;
        }
    });

    return swappedModObj;
};
