const orgUnitLevelsQuery = {
    orgUnitsLevels: {
        resource: 'organisationUnitLevels',
        params: {
            fields: 'id,level,displayName~rename(name)',
            paging: 'false',
        },
    },
}

const orgUnitsQuery = {
    orgUnits: {
        resource: 'organisationUnits',
        id: ({ id }) => id,
        params: {
            fields:
                'id,level,displayName~rename(name),parent[id,displayName~rename(name)],children[level]',
            paging: 'false',
            userDataViewFallback: 'true',
        },
    },
}

export const apiFetchOrganisationUnitLevels = dataEngine =>
    dataEngine.query(orgUnitLevelsQuery)

export const apiFetchOrganisationUnit = (dataEngine, id) =>
    dataEngine.query(orgUnitsQuery, { variables: { id } })
