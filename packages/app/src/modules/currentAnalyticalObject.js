import { FIXED_DIMENSIONS } from './fixedDimensions';
import { getDimensionIdsByAxis, getInverseLayout } from './layout';

export const getPathForOrgUnit = (orgUnit, parentGraphMap) => {
    if (!parentGraphMap[orgUnit.id]) {
        return undefined;
    }

    // if this is org unit then in parentGraphMap object
    // it has same value as key
    if (orgUnit.id === parentGraphMap[orgUnit.id]) {
        return '/' + orgUnit.id;
    }

    return '/' + parentGraphMap[orgUnit.id] + '/' + orgUnit.id;
};

export const appendPathsToOrgUnits = (current, ui) => {
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
                path: getPathForOrgUnit(item, parentGraphMap),
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
    current,
    metadata
) => {
    const appendNames = dimension => ({
        ...dimension,
        items: dimension.items.map(item => ({
            ...item,
            name: metadata[item.id] ? metadata[item.id].name : undefined,
        })),
    });

    return {
        ...current,
        columns: current.columns.map(appendNames),
        filters: current.filters.map(appendNames),
        rows: current.rows.map(appendNames),
    };
};

export const prepareCurrentAnalyticalObject = (current, metadata, ui) => {
    let result;

    result = removeUnnecessaryAttributesFromAnalyticalObject(current);
    result = appendDimensionItemNamesToAnalyticalObject(result, metadata);
    result = appendPathsToOrgUnits(result, ui);

    return result;
};
