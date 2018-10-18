import { getInstance } from 'd2/lib/d2';
import i18n from '@dhis2/d2-i18n';
import { onError } from './index';

export const DATA_SETS_CONSTANTS = [
    {
        id: 'REPORTING_RATES',
        name: i18n.t('Reporting rates'),
    },
    {
        id: 'REPORTING_RATES_ON_TIME',
        name: i18n.t('Reporting rates on time'),
    },
    {
        id: 'ACTUAL_REPORTS',
        name: i18n.t('Actual reports'),
    },
    {
        id: 'ACTUAL_REPORTING_RATES_ON_TIME',
        name: i18n.t('Actual reporting rates on time'),
    },
    {
        id: 'EXPECTED_REPORTS',
        name: i18n.t('Expected reports'),
    },
];

// Get dimensions on startup
export const apiFetchDimensions = () => {
    const fields = 'id,displayName~rename(name),dimensionType';
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
    const fields = 'id,displayName~rename(name)&paging=false&';
    const url = `/indicatorGroups?fields=${fields}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => response.indicatorGroups)
        .catch(onError);
};

const apiFetchDataElementGroups = () => {
    const fields = 'id,displayName~rename(name)&paging=false&';
    const url = `/dataElementGroups?fields=${fields}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => response.dataElementGroups)
        .catch(onError);
};

export const apiFetchAlternatives = args => {
    const { dataType, groupId, page = 1, groupDetail, filterText } = args;
    switch (dataType) {
        case 'indicators': {
            return apiFetchIndicators(groupId, page, filterText);
        }
        case 'dataElements': {
            if (groupDetail === 'detail') {
                return apiFetchDataElementOperands(groupId, page, filterText);
            } else {
                return apiFetchDataElements(groupId, page, filterText);
            }
        }
        case 'dataSets': {
            // TODO check current data viz
            return apiFetchDataSets(page, filterText);
        }
        case 'eventDataItems':
        case 'programIndicators': {
            return apiFetchProgramDataElements(groupId, page, filterText);
        }
        default:
            return null;
    }
};

const apiFetchIndicators = (id, page, filterText) => {
    const fields = 'fields=id,displayName~rename(name),dimensionItemType';
    let filter = id !== 'ALL' ? `&filter=indicatorGroups.id:eq:${id}` : '';
    if (filterText) {
        filter = filter.concat(`&filter=displayName:ilike:${filterText}`);
    }
    const paging = `&paging=true&page=${page}`;

    const url = `/indicators?${fields}${filter}${paging}`;
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

const apiFetchDataElements = (id, page, filterText) => {
    const fields =
        id === 'ALL'
            ? 'id,displayName~rename(name)'
            : `dimensionItem~rename(id),displayName~rename(name)`;

    let filter =
        id === 'ALL'
            ? `&filter=domainType:eq:AGGREGATE`
            : `&filter=dataElementGroups.id:eq:${id}&filter=domainType:eq:AGGREGATE`;

    if (filterText) {
        filter = filter.concat(`&filter=displayName:ilike:${filterText}`);
    }

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

const apiFetchDataElementOperands = (id, page, filterText) => {
    const fields =
        id === 'ALL'
            ? 'id,displayName~rename(name)'
            : `dimensionItem~rename(id),displayName~rename(name)`;

    let filter =
        id === 'ALL' ? '' : `&filter=dataElement.dataElementGroups.id:eq:${id}`;

    if (filterText) {
        filter = filter.concat(`&filter=displayName:ilike:${filterText}`);
    }
    const paging = `&paging=true&page=${page}`;

    const url = `/dataElementOperands?fields=${fields}${filter}${paging}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => {
            return {
                dimensionItems: response.dataElementOperands,
                nextPage: response.pager.nextPage
                    ? response.pager.page + 1
                    : null,
            };
        })
        .catch(onError);
};

const apiFetchDataSets = (page, filterText) => {
    const fields = 'dimensionItem~rename(id),displayName~rename(name)';
    const filter = filterText ? `&filter=displayName:ilike:${filterText}` : '';
    const paging = `&paging=true&page=${page}`;
    const url = `/dataSets?fields=${fields}${filter}${paging}`;

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

const apiFetchProgramIndicators = (page, filterText) => {
    const fields = 'id,displayName~rename(name)';
    const filter = filterText ? `&filter=displayName:ilike:${filterText}` : '';
    const paging = `&paging=true&page=${page}`;
    const url = `/programs?fields=${fields}${filter}${paging}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => response.programs)
        .catch(onError);
};

const apiFetchProgramDataElements = (id, page, filterText) => {
    const fields = `dimensionItem~rename(id),displayName~rename(name)`;
    const filter = filterText ? `&filter=displayName:ilike:${filterText}` : '';
    const paging = `&paging=true&page=${page}`;
    const url = `/programDataElements?program=${id}&fields=${fields}${filter}${paging}`;

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
