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

export const apiFetchGroups = dataType => {
    switch (dataType) {
        case 'indicators': {
            return apiFetchIndicatorGroups();
        }
        case 'dataElements': {
            return apiFetchDataElementGroups();
        }
        case 'dataSets': {
            return apiFetchDataSets();
        }
        case 'eventDataItems':
        case 'programIndicators': {
            return apiFetchProgramIndicators();
        }
        default:
            return null;
    }
};

export const apiFetchAlternatives = (dataType, id) => {
    switch (dataType) {
        case 'indicators': {
            return apiFetchIndicators(id);
        }
        case 'dataElements': {
            return apiFetchDataElements(id);
        }
        case 'dataSets': {
            // TODO check current data viz
            return apiFetchDataSets();
        }
        case 'eventDataItems':
        case 'programIndicators': {
            return apiFetchProgramDataElements(id);
        }
        default:
            return null;
    }
};

const apiFetchIndicators = indicatorGroupId => {
    const fields =
        indicatorGroupId === 'ALL'
            ? `id,displayName&paging=false&`
            : `id,displayName&filter=indicatorGroups.id:eq:${indicatorGroupId}&paging=false&`;

    const url = `/indicators?fields=${fields}`;
    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => response.indicators)
        .catch(onError);
};

const apiFetchIndicatorGroups = () => {
    const fields = 'id,displayName&paging=false&';
    const url = `/indicatorGroups?fields=${fields}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => response.indicatorGroups)
        .catch(onError);
};

const apiFetchDataElementGroups = () => {
    const fields = 'id,displayName&paging=false&';
    const url = `/dataElementGroups?fields=${fields}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => response.dataElementGroups)
        .catch(onError);
};

const apiFetchDataElements = id => {
    const fields =
        id === 'ALL'
            ? 'id,displayName&paging=false&'
            : `dimensionItem~rename(id),displayName&filter=dataElementGroups.id:eq:${id}&pgaging=false&`;
    const url = `/dataElements?fields=${fields}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => response.dataElements)
        .catch(onError);
};

const apiFetchDataSets = () => {
    const fields = 'dimensionItem~rename(id),displayName&paging=false&';
    const url = `/dataSets?fields=${fields}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => response.dataSets)
        .catch(onError);
};

const apiFetchProgramIndicators = () => {
    const fields = 'id,displayName';
    const url = `/programs?fields=${fields}&paging=false&`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => response.programs)
        .catch(onError);
};

const apiFetchProgramDataElements = programId => {
    const fields = `dimensionItem~rename(id),displayName&paging=false&`;
    const url = `/programDataElements?program=${programId}&fields=${fields}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => response.programDataElements)
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
