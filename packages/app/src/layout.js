import { getPropsByKeys, entriesToObject } from './util';

export const AXIS_NAME_COLUMNS = 'columns';
export const AXIS_NAME_ROWS = 'rows';
export const AXIS_NAME_FILTERS = 'filters';
export const AXIS_NAMES = [
    AXIS_NAME_COLUMNS,
    AXIS_NAME_ROWS,
    AXIS_NAME_FILTERS,
];
export const DIMENSION_ID_PROP_NAME = 'dimension';
export const DIMENSION_ITEMS_PROP_NAME = 'items';

export const getAllDimensions = visualization =>
    AXIS_NAMES.reduce(
        (dimensions, key) => dimensions.concat(visualization[key]),
        []
    );

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

export const getItemIdsByDimensionMap = dimensionArray =>
    dimensionArray.reduce(
        (map, dim) => ({
            ...map,
            [dim[DIMENSION_ID_PROP_NAME]]: dim[DIMENSION_ITEMS_PROP_NAME].map(
                item => item.id
            ),
        }),
        {}
    );

export const getItemIdsByDimension = visualization =>
    getItemIdsByDimensionMap(getAllDimensions(visualization));

export const getDimensionIdsByAxis = visualization => {
    const axes = getPropsByKeys(visualization, AXIS_NAMES);
    const entries = Object.entries(axes);
    const entriesWithIds = entries.map(([axisId, dimensions]) => [
        axisId,
        dimensions.map(dim => dim.dimension),
    ]);

    return entriesToObject(entriesWithIds);
};
