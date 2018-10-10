const getModelAxis = (dimensionId, items) => ({
    dimension: dimensionId,
    items: items.map(item => ({
        id: item.id,
    })),
});

const hasItems = (object, id) =>
    object.hasOwnProperty(id) && Array.isArray(object[id]) && object[id].length;

export const getAxesFromUi = ui =>
    Object.entries(ui.layout).reduce(
        (layout, [axisName, dimensions]) => ({
            ...layout,
            [axisName]: dimensions
                .map(
                    dimension =>
                        hasItems(ui.itemsByDimension, dimension)
                            ? getModelAxis(
                                  dimension,
                                  ui.itemsByDimension[dimension]
                              )
                            : null
                )
                .filter(dim => dim !== null),
        }),
        {}
    );
