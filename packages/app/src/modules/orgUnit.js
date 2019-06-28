import { ouIdHelper, DIMENSION_ID_ORGUNIT } from '@dhis2/analytics';

import { apiFetchOrganisationUnitLevels } from '../api/organisationUnits';

const isNumericOuLevel = id =>
    ouIdHelper.hasLevelPrefix(id)
        ? Number.isInteger(parseInt(ouIdHelper.removePrefix(id), 10))
        : false;

const getUpdatedOuLevels = async (visualizationProp, ouPart) => {
    const ouLevels = await apiFetchOrganisationUnitLevels();

    const items = ouPart.items.map(item => {
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
    });
    const newOuFilter = Object.assign({}, ouPart, { items });

    return visualizationProp
        .filter(p => p.dimension !== DIMENSION_ID_ORGUNIT)
        .concat(newOuFilter);
};

export const convertOuLevelsToUids = async visualization => {
    const hasOu = p => p.dimension === DIMENSION_ID_ORGUNIT;
    const prop = ['filters', 'rows', 'columns'].find(p =>
        visualization[p].find(hasOu)
    );

    const ouPart = prop ? visualization[prop].find(hasOu) : null;

    const hasNumberedOuLevels =
        ouPart && ouPart.items.some(item => isNumericOuLevel(item.id));

    if (hasNumberedOuLevels) {
        const updatedOu = await getUpdatedOuLevels(visualization[prop], ouPart);

        return Object.assign({}, visualization, { [prop]: updatedOu });
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
