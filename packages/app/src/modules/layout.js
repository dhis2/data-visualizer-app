import i18n from '@dhis2/d2-i18n'
import {
    AXIS_ID_COLUMNS,
    AXIS_ID_ROWS,
    AXIS_ID_FILTERS,
    getAxisMaxNumberOfDimensions,
} from '@dhis2/analytics'

// Names for dnd sources
export const SOURCE_DIMENSIONS = 'dimensions'

// Keys and displayName for adding dimensions to layout
export const ADD_TO_LAYOUT_OPTIONS = [
    { axisId: AXIS_ID_COLUMNS, name: i18n.t('Add to series') },
    { axisId: AXIS_ID_ROWS, name: i18n.t('Add to category') },
    { axisId: AXIS_ID_FILTERS, name: i18n.t('Add to filter') },
]

export const menuLabels = {
    columns: i18n.t('series'),
    rows: i18n.t('category'),
    filters: i18n.t('filter'),
}

// Layout utility functions

// Exclude one or many dimensions from layout
export const getFilteredLayout = (layout, excludedIds) => {
    const ids = Array.isArray(excludedIds) ? excludedIds : [excludedIds]

    return {
        [AXIS_ID_COLUMNS]: layout[AXIS_ID_COLUMNS].filter(
            dim => !ids.includes(dim)
        ),
        [AXIS_ID_ROWS]: layout[AXIS_ID_ROWS].filter(dim => !ids.includes(dim)),
        [AXIS_ID_FILTERS]: layout[AXIS_ID_FILTERS].filter(
            dim => !ids.includes(dim)
        ),
    }
}

// Accepts layout: { columns: ['dx'] }
// Returns inverse layout: { dx: 'columns' }
export const getInverseLayout = layout => {
    const entries = Object.entries(layout)
    const map = {}

    entries.forEach(([axisId, dimensionIds]) => {
        dimensionIds.forEach(id => {
            map[id] = axisId
        })
    })

    return map
}

// Accepts layout and transfer object
// Returns transfer with possible retransfers
export const getRetransfer = (layout, transfer, visType) => {
    const inverseLayout = getInverseLayout(layout)
    console.log('inverseLayout', inverseLayout)
    const dimensionIds = Object.keys(transfer)
    console.log('dimensionIds', dimensionIds)
    const retransfer = {}

    dimensionIds.forEach(id => {
        const sourceAxis = inverseLayout[id] || null
        const destinationAxisId = transfer[id]
        const dimensionsAtDestination = layout[destinationAxisId] || []

        const axisIsFull =
            dimensionsAtDestination.length ===
            getAxisMaxNumberOfDimensions(visType, destinationAxisId)

        if (axisIsFull) {
            retransfer[dimensionsAtDestination[0]] = sourceAxis
        }
    })

    console.log('swappedModObj', retransfer)
    return retransfer
}
