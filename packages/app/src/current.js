import arrayClean from 'd2-utilizr/lib/arrayClean';

const getModelAxis = (dimensionId, itemIds) => ({
    dimension: dimensionId,
    items: itemIds.map(id => ({
        id,
    })),
});

const hasItems = (object, id) =>
    object.hasOwnProperty(id) && Array.isArray(object[id]) && object[id].length;

export const getAxesFromUi = ui =>
    Object.entries(ui.layout).reduce(
        (layout, [axisName, ids]) => ({
            ...layout,
            [axisName]: arrayClean(
                ids.map(
                    id =>
                        hasItems(ui.itemsByDimension, id)
                            ? getModelAxis(id, ui.itemsByDimension[id])
                            : null
                )
            ),
        }),
        {}
    );
