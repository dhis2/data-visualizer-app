/**
 * Org unit level id prefix
 * @type {string}
 */
export const LEVEL_ID_PREFIX = 'LEVEL';

/**
 * Detects if id is ou level id
 * @param id
 * @returns {boolean}
 */
export const isLevelId = id => {
    return id.substr(0, LEVEL_ID_PREFIX.length) === LEVEL_ID_PREFIX;
};

/**
 * Org unit group id prefix
 * @type {string}
 */
export const GROUP_ID_PREFIX = 'OU_GROUP';

/**
 * Detects if id is group id
 * @param id
 * @returns {boolean}
 */
export const isGroupId = id => {
    return id.substr(0, GROUP_ID_PREFIX.length) === GROUP_ID_PREFIX;
};

/**
 * Get org unit path by ou id
 * @param id
 * @param metadata
 * @param parentGraphMap
 * @returns {*}
 */
export const getOrgUnitPath = (id, metadata, parentGraphMap) => {
    if (metadata[id] && metadata[id].path) {
        return metadata[id].path;
    }

    // for root org units
    if (parentGraphMap[id] === id || parentGraphMap[id] === '') {
        return `/${id}`;
    }

    return parentGraphMap[id] ? `/${parentGraphMap[id]}/${id}` : undefined;
};

/**
 * Get org unit from ou dimension ids
 * @param ids
 * @param idsToExclude
 * @param metadata
 * @param parentGraphMap
 * @returns {*}
 */
export const getOrgUnitsFromIds = (
    ids,
    metadata,
    parentGraphMap,
    idsToExclude = []
) => {
    return ids
        .filter(id => !idsToExclude.includes(id))
        .filter(id => metadata[id] !== undefined)
        .map(id => ({
            id: id,
            name: metadata[id].displayName || metadata[id].name,
            path: getOrgUnitPath(id, metadata, parentGraphMap),
        }));
};

/**
 * Get levels from ou dimension ids
 * @param ids
 * @param levelOptions
 * @returns {*}
 */
export const getLevelsFromIds = (ids, levelOptions) => {
    if (levelOptions.length === 0) {
        return [];
    }

    return ids
        .filter(isLevelId)
        .map(id => id.substr(LEVEL_ID_PREFIX.length + 1))
        .map(
            level =>
                levelOptions.find(
                    option => Number(option.level) === Number(level)
                ).id
        );
};

/**
 * Get groups from ou dimension ids
 * @param ids
 * @param groupOptions
 * @returns {*}
 */
export const getGroupsFromIds = (ids, groupOptions) => {
    if (groupOptions.length === 0) {
        return [];
    }

    return ids
        .filter(isGroupId)
        .map(id => id.substr(GROUP_ID_PREFIX.length + 1));
};

/**
 * Sort org unit levels by level property
 * @returns {number}
 * @param levelOptions
 */
export const sortOrgUnitLevels = levelOptions => {
    return levelOptions.sort((a, b) => {
        if (a.level < b.level) {
            return -1;
        }

        if (a.level > b.level) {
            return 1;
        }

        return 0;
    });
};

/**
 * Transform options into metadata
 * @param options
 * @param fields
 * @param metadata
 * @returns {{options: *, metadata}}
 */
export const transformOptionsIntoMetadata = (
    options,
    metadata,
    fields = ['id', 'displayName', 'name']
) => {
    const result = {};

    for (let i = 0; i < options.length; ++i) {
        // skip if we already have this property in metadata
        if (metadata[options[i].id] !== undefined) {
            break;
        }

        result[options[i].id] = {};
        fields.forEach(field => {
            result[options[i].id][field] = options[i][field];
        });
    }

    return {
        options,
        metadata: result,
    };
};
