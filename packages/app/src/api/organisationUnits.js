import { onError } from './index'

const orgUnitRootsQuery = {
    orgUnitRoots: {
        resource: 'organisationUnits',
        params: {
            fields: 'id,displayName,name',
            paging: false,
            userDataViewFallback: true,
        },
    },
}

const orgUnitLevelsQuery = {
    orgUnitLevels: {
        resource: 'organisationUnitLevels',
        params: {
            fields: 'id,name,displayName,level',
            paging: false,
        },
    },
}

export const apiFetchOrganisationUnitRoots = dataEngine =>
    dataEngine.query(orgUnitRootsQuery, { onError })

export const apiFetchOrganisationUnitLevels = dataEngine =>
    dataEngine.query(orgUnitLevelsQuery, { onError })
