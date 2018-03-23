import { getInstance } from 'd2/lib/d2';
import { onError } from './index';

// Get dimensions on startup
export const apiFetchDimensions = () =>
    getInstance()
        .then(d2 => d2.Api.getApi().get('dimensions.json', { paging: false }))
        .catch(onError);
