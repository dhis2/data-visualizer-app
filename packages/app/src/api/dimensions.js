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

const request = (entity, fields, paging, filter) => {
    // TODO - build array of non-empty vals
    const paramString = [fields, filter, paging].join('&');
    const url = `/${entity}?${paramString}`;
    // console.log('request', url);

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => {
            // console.log('r response', response);

            return response[entity];
        })
        .catch(onError);
};

const request2 = (entity, fields, filter, paging, other) => {
    // TODO - build array of non-empty vals
    const paramString = [fields, filter, paging, other].join('&');
    const url = `/${entity}?${paramString}`;
    // console.log('request2', url);

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => {
            // console.log('r2 response', response);

            return {
                dimensionItems: response[entity],
                nextPage: response.pager.nextPage
                    ? response.pager.page + 1
                    : null,
            };
        })
        .catch(onError);
};

// Get dimensions on startup
export const apiFetchDimensions = (nameProp = 'displayName') => {
    const fields = `fields=id,${nameProp}~rename(name),dimensionType`;

    return request('dimensions', fields);
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
    const fields = 'fields=id,displayName~rename(name)';
    const paging = 'paging=false';

    switch (dataType) {
        case 'indicators': {
            return request('indicatorGroups', fields, paging);
        }
        case 'dataElements': {
            return request('dataElementGroups', fields, paging);
        }
        case 'eventDataItems':
        case 'programIndicators': {
            return request('programs', fields, paging);
        }
        case 'dataSets': {
            return Promise.resolve(DATA_SETS_CONSTANTS);
        }
        default:
            return null;
    }
};

export const apiFetchAlternatives = args => {
    const { dataType, groupDetail, ...queryParams } = args;

    switch (dataType) {
        case 'indicators': {
            return fetchIndicators(queryParams);
        }
        case 'dataElements': {
            if (groupDetail === 'detail') {
                return fetchDataElementOperands(queryParams);
            } else {
                return fetchDataElements(queryParams);
            }
        }
        case 'dataSets': {
            // TODO check current data viz
            return fetchDataSets(queryParams);
        }
        case 'eventDataItems':
        case 'programIndicators': {
            return fetchProgramDataElements(queryParams);
        }
        default:
            return null;
    }
};

const fetchIndicators = ({ nameProp, groupId, filterText, page }) => {
    const fields = `fields=id,${nameProp}~rename(name),dimensionItemType`;
    let filter =
        groupId !== 'ALL' ? `filter=indicatorGroups.id:eq:${groupId}` : '';
    if (filterText) {
        filter = filter.concat(`filter=displayName:ilike:${filterText}`);
    }
    const paging = `paging=true&page=${page}`;

    return request2('indicators', fields, filter, paging);
};

const fetchDataElements = ({ groupId, page, filterText, nameProp }) => {
    const fields =
        groupId === 'ALL'
            ? `fields=id,${nameProp}~rename(name)`
            : `fields=dimensionItem~rename(id),${nameProp}~rename(name)`;

    let filter =
        groupId === 'ALL'
            ? `filter=domainType:eq:AGGREGATE`
            : `filter=dataElementGroups.id:eq:${groupId}&filter=domainType:eq:AGGREGATE`;

    if (filterText) {
        filter = filter.concat(`&filter=displayName:ilike:${filterText}`);
    }

    const paging = `paging=true&page=${page}`;

    return request2('dataElements', fields, paging, filter);
};

const fetchDataElementOperands = ({ groupId, page, filterText, nameProp }) => {
    const idField = groupId === 'ALL' ? 'id' : 'dimensionItem~rename(id)';
    const fields = `fields=${idField},${nameProp}~rename(name)`;

    let filter =
        groupId === 'ALL'
            ? ''
            : `filter=dataElement.dataElementGroups.id:eq:${groupId}`;

    if (filterText) {
        filter = filter.concat(`&filter=displayName:ilike:${filterText}`);
    }
    const paging = `paging=true&page=${page}`;

    return request2('dataElementOperands', fields, filter, paging);
};

const fetchDataSets = ({ page, filterText, nameProp }) => {
    const fields = `fields=dimensionItem~rename(id),${nameProp}~rename(name)`;
    const filter = filterText ? `filter=displayName:ilike:${filterText}` : '';
    const paging = `paging=true&page=${page}`;

    return request2('dataSets', fields, filter, paging);
};

const fetchProgramDataElements = ({ groupId, page, filterText, nameProp }) => {
    const fields = `fields=dimensionItem~rename(id),${nameProp}~rename(name)`;
    const filter = filterText ? `&filter=displayName:ilike:${filterText}` : '';
    const paging = `&paging=true&page=${page}`;
    const other = `program=${groupId}`;

    return request2('programDataElements', fields, filter, paging, other);
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
