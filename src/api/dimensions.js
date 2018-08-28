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

// `/api/dimensions/recommendations?dimension=dx:idA;idB&dimension=ou:idA;idB`
export const apiFetchRecommended = (idA, idB) => {
    const fields = `dx:${idA};${idB}&dimension=ou:${idA};${idB}`,
        url = `/dimensions/recommendations?dimensions=${fields}`;

    return getInstance()
        .then(d2 => {
            return d2.Api.getApi().get(url);
        })
        .catch(onError);
};
