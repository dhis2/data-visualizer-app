import {
    LEVEL_ID_PREFIX,
    isLevelId,
    DIMENSION_ID_ORGUNIT,
} from '@dhis2/d2-ui-analytics';

import { apiFetchOrganisationUnitLevels } from '../api/organisationUnits';

const getLevelSubstr = id => id.substr(LEVEL_ID_PREFIX.length + 1);

const getUpdatedItems = async filters => {
    const ouLevels = await apiFetchOrganisationUnitLevels();
    const ouFilter = filters.find(
        filter => filter.dimension === DIMENSION_ID_ORGUNIT
    );

    const updatedItems = ouFilter.items.map(item => {
        if (isLevelId(item.id)) {
            const levelSubstr = getLevelSubstr(item.id);
            if (Number.isInteger(parseInt(levelSubstr, 10))) {
                const levelId = ouLevels.find(level => {
                    return (
                        parseInt(level.level, 10) === parseInt(levelSubstr, 10)
                    );
                }).id;

                const newId = `${LEVEL_ID_PREFIX}-${levelId}`;
                const newItem = Object.assign({}, item, { id: newId });

                return newItem;
            } else {
                return item;
            }
        } else {
            return item;
        }
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

    if (ouFilter) {
        const hasNumberedLevels = ouFilter.items.some(item => {
            return isLevelId(item.id)
                ? Number.isInteger(parseInt(getLevelSubstr(item.id), 10))
                : false;
        });

        if (hasNumberedLevels) {
            const updatedFilters = await getUpdatedItems(visualization.filters);

            return Object.assign({}, visualization, {
                filters: updatedFilters,
            });
        }
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
