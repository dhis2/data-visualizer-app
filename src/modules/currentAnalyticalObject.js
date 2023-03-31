import {
    DIMENSION_ID_ORGUNIT,
    layoutGetAxisIdDimensionIdsObject,
} from '@dhis2/analytics'
import { getInverseLayout } from './layout.js'

export const USER_DATASTORE_NAMESPACE = 'analytics'
export const USER_DATASTORE_CURRENT_AO_KEY = 'currentAnalyticalObject'

export const getPathForOrgUnit = (orgUnit, parentGraphMap) => {
    if (parentGraphMap[orgUnit.id] === undefined) {
        return undefined
    }

    // if this is root org unit then in parentGraphMap object
    // it has empty string as value and id as key
    if (parentGraphMap[orgUnit.id] === '') {
        return '/' + orgUnit.id
    }

    return '/' + parentGraphMap[orgUnit.id] + '/' + orgUnit.id
}

export const appendPathsToOrgUnits = (current, ui) => {
    const dimensionIdsByAxis = layoutGetAxisIdDimensionIdsObject(current)
    const inverseLayout = getInverseLayout(dimensionIdsByAxis)
    const ouAxis = inverseLayout[DIMENSION_ID_ORGUNIT]
    const { parentGraphMap } = ui

    if (!ouAxis) {
        return current
    }

    return {
        ...current,
        [ouAxis]: current[ouAxis].map((dimension) => ({
            ...dimension,
            items: dimension.items.map((item) => ({
                ...item,
                path: getPathForOrgUnit(item, parentGraphMap),
            })),
        })),
    }
}

export const removeUnnecessaryAttributesFromAnalyticalObject = (current) => ({
    ...current,
    id: undefined,
    name: undefined,
    displayName: undefined,
})

export const appendDimensionItemNamesToAnalyticalObject = (
    current,
    metadata
) => {
    const appendNames = (dimension) => ({
        ...dimension,
        items: dimension.items.map((item) => ({
            ...item,
            name: metadata[item.id] ? metadata[item.id].name : undefined,
        })),
    })

    return {
        ...current,
        columns: current.columns.map(appendNames),
        filters: current.filters.map(appendNames),
        rows: current.rows.map(appendNames),
    }
}

export const appendDimensionItemTypeToAnalyticalObject = (
    current,
    metadata
) => {
    const appendDimensionType = (dimension) => ({
        ...dimension,
        items: dimension.items.map((item) => ({
            ...item,
            dimensionItemType: metadata[item.id]
                ? metadata[item.id].dimensionItemType
                : undefined,
        })),
    })

    return {
        ...current,
        columns: current.columns.map(appendDimensionType),
        filters: current.filters.map(appendDimensionType),
        rows: current.rows.map(appendDimensionType),
    }
}

export const appendCompleteParentGraphMap = (current, { parentGraphMap }) => ({
    ...current,
    parentGraphMap: {
        ...current.parentGraphMap,
        ...parentGraphMap,
    },
})

export const prepareCurrentAnalyticalObject = (current, metadata, ui) => {
    let result

    result = removeUnnecessaryAttributesFromAnalyticalObject(current)
    result = appendDimensionItemNamesToAnalyticalObject(result, metadata)
    result = appendDimensionItemTypeToAnalyticalObject(result, metadata)
    result = appendPathsToOrgUnits(result, ui)
    result = appendCompleteParentGraphMap(result, ui)

    return result
}
