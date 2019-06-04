import {
    LEVEL_ID_PREFIX,
    isLevelId,
    extractOuId,
    DIMENSION_ID_ORGUNIT,
} from '@dhis2/d2-ui-analytics';

import { apiFetchOrganisationUnitLevels } from '../api/organisationUnits';

const isNumericOuLevel = id =>
    isLevelId(id) ? Number.isInteger(parseInt(extractOuId(id), 10)) : false;

const getUpdatedFilters = async filters => {
    const ouLevels = await apiFetchOrganisationUnitLevels();
    const ouFilter = filters.find(
        filter => filter.dimension === DIMENSION_ID_ORGUNIT
    );

    const updatedItems = ouFilter.items.map(item => {
        if (isNumericOuLevel(item.id)) {
            const ouId = parseInt(extractOuId(item.id), 10);

            const levelId = ouLevels.find(
                level => parseInt(level.level, 10) === ouId
            ).id;

            return Object.assign({}, item, {
                id: `${LEVEL_ID_PREFIX}-${levelId}`,
            });
        }
        return item;
    });
    const newOuFilter = Object.assign({}, ouFilter, { items: updatedItems });
    const newFilters = filters
        .filter(f => f.dimension !== DIMENSION_ID_ORGUNIT)
        .concat(newOuFilter);

    return newFilters;
};

export const convertOuLevelsFilter = async visualization => {
    const ouFilter = visualization.filters.find(
        filter => filter.dimension === DIMENSION_ID_ORGUNIT
    );

    const hasNumberedOuLevels = ouFilter
        ? ouFilter.items.some(item => isNumericOuLevel(item.id))
        : false;

    if (ouFilter && hasNumberedOuLevels) {
        const updatedFilters = await getUpdatedFilters(visualization.filters);

        return Object.assign({}, visualization, {
            filters: updatedFilters,
        });
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
