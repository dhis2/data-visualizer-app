const legendSetsQuery = {
    legendSets: {
        resource: 'legendSets',
        params: ({ ids }) => ({
            fields:
                'id,displayName~rename(name),legends[id,displayName~rename(name),startValue,endValue,color]',
            filter: `id:in:[${ids.join(',')}]`,
        }),
    },
}

export const apiFetchLegendSets = (dataEngine, ids) =>
    dataEngine.query(legendSetsQuery, { variables: { ids } })
