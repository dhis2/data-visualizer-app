import { getInstance } from 'd2';
import { onError } from './index';

// Request util functions
const selectFromResponse = (response, entity, selectorFn) =>
    typeof selectorFn === 'function' ? selectorFn(response) : response[entity];

// Request functions
const request = (entity, paramString, { selectorFn } = {}) => {
    const url = `/${entity}?${paramString}&paging=false`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => selectFromResponse(response, entity, selectorFn))
        .catch(onError);
};

// Fetch functions
export const apiFetchDimensions = nameProp => {
    const fields = `fields=id,${nameProp}~rename(name),dimensionType`;
    const order = `order=${nameProp}:asc`;

    const params = `${fields}&${order}`;

    return request('dimensions', params);
};

export const apiFetchRecommendedIds = (dxIds, ouIds) => {
    let dimensions = 'dimension=';

    if (dxIds.length) {
        dimensions = dimensions.concat(`dx:${dxIds.join(';')}`);

        if (ouIds.length)
            dimensions = dimensions.concat(`&dimension=ou:${ouIds.join(';')}`);
    } else if (ouIds.length) {
        dimensions = dimensions.concat(`ou:${ouIds.join(';')}`);
    } else {
        return Promise.resolve([]);
    }

    const url = `/dimensions/recommendations?${dimensions}&fields=id`;
    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => response.dimensions.map(item => item.id))
        .catch(onError);
};
