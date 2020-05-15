const orgUnitsQuery = {
    orgUnits: {
        resource: 'organisationUnits',
        id: ({ id }) => id,
        params: {
            fields: 'id,level,displayName~rename(name),parent[id,displayName~rename(name)],children[level]',
        },
    },
}

export const apiFetchOuData = (dataEngine, id) =>
    dataEngine.query(orgUnitsQuery, { variables: { id } })
