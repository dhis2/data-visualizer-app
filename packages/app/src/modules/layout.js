import i18n from '@dhis2/d2-i18n';
import {
    AXIS_NAME_COLUMNS,
    AXIS_NAME_ROWS,
    AXIS_NAME_FILTERS,
} from '@dhis2/analytics';

// Names for dnd sources
export const SOURCE_DIMENSIONS = 'dimensions';

export const getAddToAxisLabel = axis => {
    const labels = {
        [AXIS_NAME_COLUMNS]: i18n.t('Add to series'),
        [AXIS_NAME_ROWS]: i18n.t('Add to category'),
        [AXIS_NAME_FILTERS]: i18n.t('Add to filter'),
    };

    return labels[axis];
};

export const getMoveToAxisLabel = axis => {
    const labels = {
        [AXIS_NAME_COLUMNS]: i18n.t('Move to series'),
        [AXIS_NAME_ROWS]: i18n.t('Move to category'),
        [AXIS_NAME_FILTERS]: i18n.t('Move to filter'),
    };

    return labels[axis];
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
