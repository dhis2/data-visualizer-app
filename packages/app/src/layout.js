import { getPropsByKeys, entriesToObject } from './util';

// Prop names for analytical object axes
export const AXIS_NAME_COLUMNS = 'columns';
export const AXIS_NAME_ROWS = 'rows';
export const AXIS_NAME_FILTERS = 'filters';

export const AXIS_NAMES = [
    AXIS_NAME_COLUMNS,
    AXIS_NAME_ROWS,
    AXIS_NAME_FILTERS,
];

// Prop names for dimension id and items
export const DIMENSION_ID_PROP_NAME = 'dimension';
export const DIMENSION_ITEMS_PROP_NAME = 'items';

// Layout utility functions

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
                item => item
            ),
        }),
        {}
    );
};

export const getDimensionIdsByAxis = visualization => {
    const axes = getPropsByKeys(visualization, AXIS_NAMES);
    const entries = Object.entries(axes);
    const entriesWithIds = entries.map(([axisName, dimensions]) => [
        axisName,
        dimensions.map(dim => dim.dimension),
    ]);

    return entriesToObject(entriesWithIds);
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
