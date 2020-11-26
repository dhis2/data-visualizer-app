import {
    AXIS_ID_COLUMNS,
    AXIS_ID_ROWS,
    AXIS_ID_FILTERS,
    getAxisMaxNumberOfDimensions,
    getAvailableAxes,
    isAxisFull,
    getTransferableDimension,
} from '@dhis2/analytics'

// Names for dnd sources
export const SOURCE_DIMENSIONS = 'dimensions'

// Layout utility functions

// Exclude one or many dimensions from layout
export const getFilteredLayout = (layout, excludedIds) => {
    const ids = Array.isArray(excludedIds) ? excludedIds : [excludedIds]

    return {
        [AXIS_ID_COLUMNS]:
            layout[AXIS_ID_COLUMNS]?.filter(dim => !ids.includes(dim)) || [],
        [AXIS_ID_ROWS]:
            layout[AXIS_ID_ROWS]?.filter(dim => !ids.includes(dim)) || [],
        [AXIS_ID_FILTERS]:
            layout[AXIS_ID_FILTERS]?.filter(dim => !ids.includes(dim)) || [],
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
    const dimensionIds = Object.keys(transfer)
    const retransfer = {}

    dimensionIds.forEach(id => {
        const sourceAxis = inverseLayout[id] || null
        const destinationAxisId = transfer[id].axisId
        const dimensionsAtDestination = layout[destinationAxisId] || []

        if (
            isAxisFull(
                visType,
                destinationAxisId,
                dimensionsAtDestination.length
            )
        ) {
            const transferableDimension = getTransferableDimension(
                visType,
                destinationAxisId,
                layout[destinationAxisId]
            )

            if (transferableDimension) {
                const axisId = sourceAxis
                    ? sourceAxis
                    : getAvailableAxes(visType).find(
                          axis => !getAxisMaxNumberOfDimensions(visType, axis)
                      )

                retransfer[transferableDimension] = { axisId }
            }
        }
    })

    return retransfer
}
