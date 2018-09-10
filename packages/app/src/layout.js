import { getPropsByKeys, entriesToObject } from './util';

export const AXIS_KEYS = ['columns', 'rows', 'filters'];
export const DIMENSION_ID_KEY = 'dimension';
export const DIMENSION_ITEMS_KEY = 'items';

export const getAllDimensions = visualization =>
    AXIS_KEYS.reduce(
        (dimensions, key) => dimensions.concat(visualization[key]),
        []
    );

export const getItemIdsByDimensionMap = dimensionArray =>
    dimensionArray.reduce(
        (map, dim) => ({
            ...map,
            [dim[DIMENSION_ID_KEY]]: dim[DIMENSION_ITEMS_KEY].map(
                item => item.id
            ),
        }),
        {}
    );

export const getItemIdsByDimension = visualization =>
    getItemIdsByDimensionMap(getAllDimensions(visualization));

export const getDimensionIdsByAxis = visualization => {
    const axes = getPropsByKeys(visualization, AXIS_KEYS);
    const entries = Object.entries(axes);
    const entriesWithIds = entries.map(([axisId, dimensions]) => [
        axisId,
        dimensions.map(dim => dim.dimension),
    ]);

    return entriesToObject(entriesWithIds);
};

const ax = {
    columns: [{ dimension: 'dx' }, { dimension: 'abc' }],
    rows: [{ dimension: 'pe' }],
    filters: [{ dimension: 'ou' }],
};

const en = [['columns', [{}, {}]], ['rows', [{}, {}]], ['filters', [{}, {}]]];
