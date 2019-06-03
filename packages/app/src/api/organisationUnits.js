import { getInstance } from 'd2';
import { onError } from './index';

export const apiFetchOrganisationUnitRoot = () => {
    const endPoint = '/organisationUnits';
    const fields = ['id', 'displayName', 'name'];
    const url = `${endPoint}?paging=false&userDataViewFallback=true&fields=${fields.join(
        ','
    )}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(({ organisationUnits }) => organisationUnits[0])
        .catch(onError);
};

/**
 * Fetch organisation unit levels
 * @returns {*}
 */
export const apiFetchOrganisationUnitLevels = async () => {
    const endPoint = '/organisationUnitLevels';
    const fields = ['id', 'name', 'displayName', 'level'];
    const url = `${endPoint}?paging=false&fields=${fields.join(',')}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(({ organisationUnitLevels }) => organisationUnitLevels)
        .catch(onError);
};
