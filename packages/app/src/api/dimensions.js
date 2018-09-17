import { getInstance } from 'd2/lib/d2';
import { onError } from './index';

// Get dimensions on startup
export const apiFetchDimensions = () => {
    const fields = 'id,displayName,dimensionType';
    const url = `/dimensions?fields=${fields}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .catch(onError);
};

export const apiFetchRecommendedIds = (dimIdA, dimIdB) => {
    return mockResponse();
    /*const fields = `dx:${idA};${idB}&dimension=ou:${idA};${idB}`,
        url = `/dimensions/recommendations?dimensions=${fields}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .catch(onError);*/
};

export const apiFetchIndicators = () => {
    const fields = 'id,displayName~rename(name)';
    const url = `/indicators?fields=${fields}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .catch(onError);
};

export const apiFetchIndicatorGroups = () => {
    const fields = 'dimensionItem~rename(id),displayName~rename(name)';
    const url = `/indicatorGroups?fields=${fields}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .catch(onError);
};

export const apiFetchDataElementGroups = () => {
    const fields = 'id,displayName~rename(name)';
    const url = `/dataElementGroups?fields=${fields}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .catch(onError);
};

export const apiFetchDataSets = () => {
    const fields = 'dimensionItem~rename(id),displayName~rename(name)';
    const url = `/dataSets?fields=${fields}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .catch(onError);
};

export const apiFetchProgramIndicators = () => {
    const fields = 'dimensionItem~rename(id),displayName~rename(name)';
    const url = `/pgrograms?fields=${fields}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .catch(onError);
};

const mockResponse = () => {
    const randomizer = Math.floor(Math.random() * Math.floor(4));
    const mock1 = ['SooXFOUnciJ', 'eLwL77Z9E7R'];
    const mock2 = ['Cbuj0VCyDjL', 'J5jldMd8OHv', 'VxWloRvAze8'];
    const mock3 = ['cX5k9anHEHd'];
    const mock4 = ['cX5k9anHEHd', 'J5jldMd8OHv', 'jp826jAJHUc', 'XY1vwCQskjX'];
    const response = [mock1, mock2, mock3, mock4];

    return response[randomizer];
};
