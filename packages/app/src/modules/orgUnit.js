import {
    ouIdHelper,
    DIMENSION_ID_ORGUNIT,
    AXIS_NAMES,
    axisHasDimension,
    axisGetDimension,
    dimensionIs,
    dimensionGetItems,
} from '@dhis2/analytics';

import { apiFetchOrganisationUnitLevels } from '../api/organisationUnits';

const isNumericOuLevel = id =>
    ouIdHelper.hasLevelPrefix(id)
        ? Number.isInteger(parseInt(ouIdHelper.removePrefix(id), 10))
        : false;

const replaceNumericOuLevelWithUid = ouLevels => item => {
    if (isNumericOuLevel(item.id)) {
        const numericOuId = parseInt(ouIdHelper.removePrefix(item.id), 10);

        const id = ouLevels.find(
            level => parseInt(level.level, 10) === numericOuId
        ).id;

        return Object.assign({}, item, {
            id: ouIdHelper.addLevelPrefix(id),
        });
    }

    return item;
};

export const convertOuLevelsToUids = async visualization => {
    const axis = AXIS_NAMES.find(a =>
        axisHasDimension(visualization[a], DIMENSION_ID_ORGUNIT)
    );

    const ouDimension = axis
        ? axisGetDimension(visualization[axis], DIMENSION_ID_ORGUNIT)
        : null;

    const hasNumericOuLevels =
        ouDimension &&
        dimensionGetItems(ouDimension).some(item => isNumericOuLevel(item.id));

    if (hasNumericOuLevels) {
        const ouLevels = await apiFetchOrganisationUnitLevels();
        const replaceNumericOuLevel = replaceNumericOuLevelWithUid(ouLevels);

        const updatedAxis = visualization[axis].map(dimension => {
            if (dimensionIs(dimension, DIMENSION_ID_ORGUNIT)) {
                const items = dimensionGetItems(dimension).map(
                    replaceNumericOuLevel
                );

                return Object.assign({}, dimension, { items });
            }

            return dimension;
        });

        return Object.assign({}, visualization, { [axis]: updatedAxis });
    }

    return visualization;
};

export const removeLastPathSegment = path => {
    // if root path, then return unprocessed path
    if (path.match(/\//g).length === 1) {
        return path;
    }

    return path.substr(0, path.lastIndexOf('/'));
};

/**
 * Get org unit path by ou id
 * @param id
 * @param metadata
 * @param parentGraphMap
 * @returns {*}
 */
export const getOuPath = (id, metadata, parentGraphMap) => {
    if (metadata[id] && metadata[id].path) {
        return metadata[id].path;
    }

    // for root org units
    if (parentGraphMap[id] === id || parentGraphMap[id] === '') {
        return `/${id}`;
    }

    return parentGraphMap[id] ? `/${parentGraphMap[id]}/${id}` : undefined;
};
