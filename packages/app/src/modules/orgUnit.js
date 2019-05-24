/**
 * Get org unit path by ou id
 * @param id
 * @param metadata
 * @param parentGraphMap
 * @returns {*}
 */
const getPath = (id, metadata, parentGraphMap) => {
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
            path: getPath(id, metadata, parentGraphMap),
        }));
};

export const removeLastPathSegment = path => {
    // if root path, then return unprocessed path
    if (path.match(/\//g).length === 1) {
        return path;
    }

    return path.substr(0, path.lastIndexOf('/'));
};
