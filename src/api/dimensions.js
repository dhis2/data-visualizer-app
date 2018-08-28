import { getInstance } from 'd2/lib/d2';
import { onError } from './index';

// Get dimensions on startup
export const apiFetchDimensions = () => {
    const fields = 'id,displayName,dimensionType',
        url = `/dimensions.json?fields=${fields}`;

    return getInstance()
        .then(d2 => {
            return d2.Api.getApi().get(url);
        })
        .catch(onError);
};

/** TODO: update API selected dimension correctly, response now:
 
"message": "Property selected does not exist on org.hisp.dhis.common.DimensionalObject"

**/
export const apiSetDimensions = dimension => {
    const url = `dimensions/${dimension.id}`,
        headers = { 'Content-Type': 'text/plain' };

    return getInstance()
        .then(d2 => {
            return d2.Api.get.update(url, dimension.selected, { headers });
        })
        .catch(onError);
};

/**
 *  TODO: Double check if removing dimensions is performed at the correct API endpoint (should be done
 *  on analytic object?)
 */

export const apiRemoveDimensions = dimensionId => {
    const url = `dimensions/${dimensionId}`;

    return getInstance()
        .then(d2 => {
            return d2.API.getApi.delete(url);
        })
        .catch(onError);
};

export const apiFetchRecommended = (idA, idB) => {
    const fields = `dx:${idA};${idB}&dimension=ou:${idA};${idB}`,
        url = `/dimensions/recommendations?dimensions=${fields}`;

    return getInstance()
        .then(d2 => {
            return d2.Api.getApi().get(url);
        })
        .catch(onError);
};
