import { getInstance } from 'd2';
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

const request = (entity, paramString) => {
    const url = `/${entity}?${paramString}&paging=false`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => response[entity])
        .catch(onError);
};

const requestWithPaging = (entity, paramString, page) => {
    const paging = `&paging=true&page=${page}`;
    const url = `/${entity}?${paramString}${paging}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => ({
            dimensionItems: response[entity],
            nextPage: response.pager.nextPage ? response.pager.page + 1 : null,
        }))
        .catch(onError);
};

// Get dimensions on startup
export const apiFetchDimensions = nameProp => {
    const params = `fields=id,${nameProp}~rename(name),dimensionType`;

    return request('dimensions', params);
};

export const apiFetchRecommendedIds = (dxIds, ouIds) => {
    let fields = 'dimension=';

    if (dxIds.length) {
        fields = fields.concat(`dx:${dxIds.join(';')}`);

        if (ouIds.length)
            fields = fields.concat(`&dimension=ou:${ouIds.join(';')}`);
    } else if (ouIds.length) fields = fields.concat(`ou:${ouIds.join(';')}`);

    const url = `/dimensions/recommendations?${fields}&fields=id`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => response.dimensions)
        .catch(onError);
};

export const apiFetchItemsByDimension = dimensionId => {
    const fields = `fields=id,displayName~rename(name)`;
    const url = `dimensions/${dimensionId}/items?${fields}`;

    return getInstance().then(d2 =>
        d2.Api.getApi()
            .get(url)
            .then(response => response.items)
    );
};

export const apiFetchGroups = (dataType, nameProp) => {
    //indicatorGroups does not support shortName
    const name = dataType === 'indicators' ? 'displayName' : nameProp;
    const fields = `fields=id,${name}~rename(name)`;

    switch (dataType) {
        case 'indicators': {
            return request('indicatorGroups', fields);
        }
        case 'dataElements': {
            return request('dataElementGroups', fields);
        }
        case 'eventDataItems':
        case 'programIndicators': {
            return request('programs', fields);
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
        groupId !== 'ALL' ? `&filter=indicatorGroups.id:eq:${groupId}` : '';

    if (filterText) {
        filter = filter.concat(`&filter=${nameProp}:ilike:${filterText}`);
    }

    const paramString = `${fields}${filter}`;

    return requestWithPaging('indicators', paramString, page);
};

const fetchDataElements = ({ groupId, page, filterText, nameProp }) => {
    const idField = groupId === 'ALL' ? 'id' : 'dimensionItem~rename(id)';
    const fields = `fields=${idField},${nameProp}~rename(name)`;

    let filter = '&filter=domainType:eq:AGGREGATE';
    if (groupId !== 'ALL') {
        filter = filter.concat(`&filter=dataElementGroups.id:eq:${groupId}`);
    }

    if (filterText) {
        filter = filter.concat(`&filter=${nameProp}:ilike:${filterText}`);
    }

    const paramString = `${fields}${filter}`;

    return requestWithPaging('dataElements', paramString, page);
};

const fetchDataElementOperands = ({ groupId, page, filterText, nameProp }) => {
    const idField = groupId === 'ALL' ? 'id' : 'dimensionItem~rename(id)';
    const fields = `fields=${idField},${nameProp}~rename(name)`;

    let filter = '';
    if (groupId !== 'ALL') {
        filter = `&filter=dataElement.dataElementGroups.id:eq:${groupId}`;
    }

    if (filterText) {
        const textFilter = `&filter=${nameProp}:ilike:${filterText}`;
        filter = filter.length ? filter.concat(textFilter) : textFilter;
    }

    return requestWithPaging('dataElementOperands', `${fields}${filter}`, page);
};

const fetchDataSets = ({ page, filterText, nameProp }) => {
    const fields = `fields=dimensionItem~rename(id),${nameProp}~rename(name)`;
    const filter = filterText ? `&filter=${nameProp}:ilike:${filterText}` : '';

    const paramString = `${fields}${filter}`;

    return requestWithPaging('dataSets', paramString, page);
};

const fetchProgramDataElements = ({ groupId, page, filterText, nameProp }) => {
    const fields = `fields=dimensionItem~rename(id),${nameProp}~rename(name)`;
    const filter = filterText ? `&filter=${nameProp}:ilike:${filterText}` : '';

    const paramString = `${fields}${filter}&program=${groupId}`;

    return requestWithPaging('programDataElements', paramString, page);
};
