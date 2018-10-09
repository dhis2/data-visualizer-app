import { getInstance } from 'd2/lib/d2';
import i18n from '@dhis2/d2-i18n';
import { onError } from './index';

export const DATA_SETS_CONSTANTS = [
    {
        id: 'REPORTING_RATES',
        displayName: i18n.t('Reporting rates'),
    },
    {
        id: 'REPORTING_RATES_ON_TIME',
        displayName: i18n.t('Reporting rates on time'),
    },
    {
        id: 'ACTUAL_REPORTS',
        displayName: i18n.t('Actual reports'),
    },
    {
        id: 'ACTUAL_REPORTING_RATES_ON_TIME',
        displayName: i18n.t('Actual reporting rates on time'),
    },
    {
        id: 'EXPECTED_REPORTS',
        displayName: i18n.t('Expected reports'),
    },
];

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
        case 'eventDataItems':
        case 'programIndicators': {
            return apiFetchProgramIndicators();
        }
        case 'dataSets': {
            return Promise.resolve(DATA_SETS_CONSTANTS);
        }
        default:
            return null;
    }
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

export const apiFetchAlternatives = (dataType, id, page = 1) => {
    switch (dataType) {
        case 'indicators': {
            return apiFetchIndicators(id, page);
        }
        case 'dataElements': {
            return apiFetchDataElements(id, page);
        }
        case 'dataElementOperands': {
            return apiFetchDataElementOperands(id, page);
        }
        case 'dataSets': {
            // TODO check current data viz
            return apiFetchDataSets(page);
        }
        case 'eventDataItems':
        case 'programIndicators': {
            return apiFetchProgramDataElements(id, page);
        }
        default:
            return null;
    }
};

const apiFetchIndicators = (indicatorGroupId, page) => {
    const fields = 'fields=id,displayName,dimensionItemType';
    const filter =
        indicatorGroupId !== 'ALL'
            ? `&filter=indicatorGroups.id:eq:${indicatorGroupId}`
            : '';

    const paging = '&paging=true';
    const p = `&page=${page}`;

    const url = `/indicators?${fields}${filter}${paging}${p}`;
    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => {
            return {
                dimensionItems: response.indicators,
                nextPage: response.pager.nextPage
                    ? response.pager.page + 1
                    : null,
            };
        })
        .catch(onError);
};

const apiFetchDataElements = (id, page) => {
    const fields =
        id === 'ALL'
            ? 'id,displayName'
            : `dimensionItem~rename(id),displayName`;

    const filter =
        id === 'ALL'
            ? `&filter=domainType:eq:AGGREGATE`
            : `&filter=dataElementGroups.id:eq:${id}&filter=domainType:eq:AGGREGATE`;

    const paging = `&paging=true&page=${page}`;
    const url = `/dataElements?fields=${fields}${filter}${paging}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => {
            return {
                dimensionItems: response.dataElements,
                nextPage: response.pager.nextPage
                    ? response.pager.page + 1
                    : null,
            };
        })
        .catch(onError);
};

const apiFetchDataElementOperands = (id, page) => {
    const fields =
        id === 'ALL'
            ? 'id,displayName'
            : `dimensionItem~rename(id),displayName`;

    const filter = id === 'ALL' ? '' : `&filter=dataElementGroups.id:eq:${id}`;
    const paging = `&paging=true&page=${page}`;

    const url = `/dataElementOperands?fields=${fields}${filter}${paging}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => {
            return {
                dimensionItems: response.dataElements,
                nextPage: response.pager.nextPage
                    ? response.pager.page + 1
                    : null,
            };
        })
        .catch(onError);
};

const apiFetchDataSets = page => {
    const fields = 'dimensionItem~rename(id),displayName&paging=true';
    const p = `&page=${page}`;
    const url = `/dataSets?fields=${fields}${p}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => {
            return {
                dimensionItems: response.dataSets,
                nextPage: response.pager.nextPage
                    ? response.pager.page + 1
                    : null,
            };
        })
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

const apiFetchProgramDataElements = (programId, page) => {
    const fields = `dimensionItem~rename(id),displayName&paging=true&`;
    const p = `&page=${page}`;
    const url = `/programDataElements?program=${programId}&fields=${fields}${p}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => {
            return {
                dimensionItems: response.programDataElements,
                nextPage: response.pager.nextPage
                    ? response.pager.page + 1
                    : null,
            };
        })
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
