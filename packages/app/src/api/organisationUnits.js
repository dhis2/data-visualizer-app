import { getInstance } from 'd2/lib/d2';

/**
 * Fetch organisation units
 * @returns {Promise<T | never>}
 */
export const apiFetchOrganisationUnits = () => {
    return getInstance()
        .then(d2 => d2
            .models
            .organisationUnits
            .list({
                paging: false,
                level: 1,
                fields: 'id,path,displayName,children::isNotEmpty',
            })
    );
};

/**
 * Fetch organisation unit groups
 * @returns {self|Promise<D2 | never>}
 */
export const apiFetchOrganisationUnitGroups = () => {
    return getInstance()
        .then(d2 => d2
            .models
            .organisationUnitGroups
            .list({ paging: false })
        )
};

/**
 * Fetch organisation unit levels
 * @returns {*}
 */
export const apiFetchOrganisationUnitLevels = () => {
    return getInstance()
        .then(d2 => d2
            .models
            .organisationUnitLevels
            .list({ paging: false })
        )
};
