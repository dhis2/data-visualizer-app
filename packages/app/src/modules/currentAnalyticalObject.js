import flow from 'lodash-es/flow';
import { FIXED_DIMENSIONS } from './fixedDimensions';
import { getDimensionIdsByAxis, getInverseLayout } from './layout';

export const appendPathsToOrgUnits = (ui, metadata, current) => {
    const ouId = FIXED_DIMENSIONS.ou.id;
    const dimensionIdsByAxis = getDimensionIdsByAxis(current);
    const inverseLayout = getInverseLayout(dimensionIdsByAxis);
    const ouAxis = inverseLayout[ouId];
    const { parentGraphMap } = ui;

    if (!ouAxis) {
        return current;
    }

    return {
        ...current,
        [ouAxis]: current[ouAxis].map(dimension => ({
            ...dimension,
            items: dimension.items.map(item => ({
                ...item,
                path: parentGraphMap[item.id],
            })),
        })),
    };
};

export const removeUnnecessaryAttributesFromAnalyticalObject = current => ({
    ...current,
    id: undefined,
    name: undefined,
    displayName: undefined,
});

export const appendDimensionItemNamesToAnalyticalObject = (
    metadata,
    current
) => {
    const appendNames = dimension => ({
        ...dimension,
        items: dimension.items
            .filter(item => metadata[item.id])
            .map(item => ({
                ...item,
                name: metadata[item.id].name,
            })),
    });

    return {
        ...current,
        columns: current.columns.map(appendNames),
        filters: current.filters.map(appendNames),
        rows: current.rows.map(appendNames),
    };
};

export const prepareCurrentAnalyticalObject = (current, metadata, ui) =>
    flow(
        removeUnnecessaryAttributesFromAnalyticalObject,
        appendDimensionItemNamesToAnalyticalObject.bind(this, metadata),
        appendPathsToOrgUnits.bind(this, ui, metadata)
    )(current);
