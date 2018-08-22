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
