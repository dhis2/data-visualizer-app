export const removeLastPathSegment = (path) => {
    // if root path, then return unprocessed path
    if (path.match(/\//g).length === 1) {
        return path
    }

    return path.substr(0, path.lastIndexOf('/'))
}

/**
 * Get org unit path by ou id
 * @param id
 * @param metadata
 * @param parentGraphMap
 * @returns {*}
 */
export const getOuPath = (id, metadata, parentGraphMap) => {
    if (metadata[id] && metadata[id].path) {
        return metadata[id].path
    }

    // for root org units
    if (parentGraphMap[id] === id || parentGraphMap[id] === '') {
        return `/${id}`
    }

    return parentGraphMap[id] ? `/${parentGraphMap[id]}/${id}` : undefined
}
