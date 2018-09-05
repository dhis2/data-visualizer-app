export const layoutKeys = ['columns', 'rows', 'filters'];

const getDimensionsFromVisualization = visualization =>
    layoutKeys.reduce(
        (dimensions, key) => dimensions.concat(visualization[key]),
        []
    );

const getItemsByDimension = dimensions =>
    dimensions.reduce(
        (map, dimension) => ({
            ...map,
            [dimension.dimension]: dimension.items.map(item => item.id),
        }),
        {}
    );

export const getItemsByDimensionFromVisualization = visualization =>
    getItemsByDimension(getDimensionsFromVisualization(visualization));
