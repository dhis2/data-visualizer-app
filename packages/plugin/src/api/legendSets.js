const legendSetsQuery = {
    resource: 'legendSets',
    params: ({ ids }) => ({
        fields:
            'id,displayName~rename(name),legends[id,displayName~rename(name),startValue,endValue,color]',
        filter: `id:in:[${ids.join(',')}]`,
    }),
}

export const apiFetchLegendSets = async (dataEngine, ids) => {
    const legendSetsData = await dataEngine.query(
        { legendSets: legendSetsQuery },
        {
            variables: { ids },
        }
    )

    return legendSetsData.legendSets.legendSets
}
