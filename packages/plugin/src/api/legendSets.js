const legendSetsQuery = {
    legendSets: {
        resource: 'legendSets',
        params: ({ ids }) => ({
            fields: 'legends[:all]',
            filter: `id:in:[${ids.join(',')}]`,
        }),
    },
}

export const apiFetchLegendSets = (dataEngine, ids) =>
    dataEngine.query(legendSetsQuery, { variables: { ids } })
