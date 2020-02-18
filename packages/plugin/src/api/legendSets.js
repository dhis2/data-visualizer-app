const legendSetQuery = {
    legendSet: {
        resource: 'legendSets',
        id: ({ id }) => id,
    },
}

export const apiFetchLegendSet = (dataEngine, id) =>
    dataEngine.query(legendSetQuery, { variables: { id } })
