import {
    ouIdHelper,
    DIMENSION_ID_ORGUNIT,
    dimensionGetItems,
    layoutReplaceDimension,
    layoutGetDimension,
} from '@dhis2/analytics'

const isOuLevelIntId = id =>
    ouIdHelper.hasLevelPrefix(id)
        ? Number.isInteger(parseInt(ouIdHelper.removePrefix(id), 10))
        : false

const replaceNumericOuLevelWithUid = ouLevels => item => {
    if (!isOuLevelIntId(item.id)) {
        return item
    }

    const ouIntId = parseInt(ouIdHelper.removePrefix(item.id), 10)
    const ouUid = ouLevels.find(l => parseInt(l.level, 10) === ouIntId).id

    return Object.assign({}, item, { id: ouIdHelper.addLevelPrefix(ouUid) })
}

export const convertOuLevelsToUids = (ouLevels, layout) => {
    const ouDimension = layoutGetDimension(layout, DIMENSION_ID_ORGUNIT)

    const hasNumericOuLevels =
        ouDimension &&
        dimensionGetItems(ouDimension).some(item => isOuLevelIntId(item.id))

    if (hasNumericOuLevels) {
        const replaceNumericOuLevel = replaceNumericOuLevelWithUid(ouLevels)

        const updatedOuItems = dimensionGetItems(ouDimension).map(
            replaceNumericOuLevel
        )

        return layoutReplaceDimension(
            layout,
            DIMENSION_ID_ORGUNIT,
            updatedOuItems
        )
    }

    return layout
}

export const removeLastPathSegment = path => {
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
