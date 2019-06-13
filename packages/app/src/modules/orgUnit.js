import { orgUnitId, DIMENSION_ID_ORGUNIT } from '@dhis2/d2-ui-analytics';

import { apiFetchOrganisationUnitLevels } from '../api/organisationUnits';

const isNumericOuLevel = id =>
    orgUnitId.isLevelId(id)
        ? Number.isInteger(parseInt(orgUnitId.getUid(id), 10))
        : false;

const getUpdatedFilters = async (filters, ouFilter) => {
    const ouLevels = await apiFetchOrganisationUnitLevels();

    const items = ouFilter.items.map(item => {
        if (isNumericOuLevel(item.id)) {
            const ouId = parseInt(orgUnitId.getUid(item.id), 10);

            const id = ouLevels.find(
                level => parseInt(level.level, 10) === ouId
            ).id;

            return Object.assign({}, item, {
                id: orgUnitId.getLevelId(id),
            });
        }
        return item;
    });
    const newOuFilter = Object.assign({}, ouFilter, { items });

    return filters
        .filter(f => f.dimension !== DIMENSION_ID_ORGUNIT)
        .concat(newOuFilter);
};

export const convertOuLevelsFilter = async visualization => {
    const ouFilter = visualization.filters.find(
        filter => filter.dimension === DIMENSION_ID_ORGUNIT
    );

    const hasNumberedOuLevels =
        ouFilter && ouFilter.items.some(item => isNumericOuLevel(item.id));

    if (hasNumberedOuLevels) {
        const filters = await getUpdatedFilters(
            visualization.filters,
            ouFilter
        );

        return Object.assign({}, visualization, { filters });
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
