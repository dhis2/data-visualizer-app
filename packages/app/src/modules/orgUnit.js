import {
    LEVEL_ID_PREFIX,
    isLevelId,
    extractOuId,
    DIMENSION_ID_ORGUNIT,
} from '@dhis2/d2-ui-analytics';

import { apiFetchOrganisationUnitLevels } from '../api/organisationUnits';

const isNumericOuLevel = id =>
    isLevelId(id) ? Number.isInteger(parseInt(extractOuId(id), 10)) : false;

const getUpdatedFilters = async (filters, ouFilter) => {
    const ouLevels = await apiFetchOrganisationUnitLevels();

    const items = ouFilter.items.map(item => {
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
    const newOuFilter = Object.assign({}, ouFilter, { items });

    return filters
        .filter(f => f.dimension !== DIMENSION_ID_ORGUNIT)
        .concat(newOuFilter);
};

export const convertOuLevelsFilter = async visualization => {
    // return visualization
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
