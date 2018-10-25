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

export const apiFetchDimensions = () => {
    const fields = 'id,displayName,dimensionType';
    const url = `/dimensions?fields=${fields}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .catch(onError);
};

export const apiFetchRecommendedIds = (dxIds, ouIds) => {
    let fields = 'dimension=';

    if (dxIds.length) {
        fields = fields.concat(`dx:${dxIds.join(';')}`);

        if (ouIds.length)
            fields = fields.concat(`&dimension=ou:${ouIds.join(';')}`);
    } else if (ouIds.length) fields = fields.concat(`ou:${ouIds.join(';')}`);

    const url = `/dimensions/recommendations?${fields}`;

    return getInstance()
        .then(d2 => d2.Api.getApi().get(url))
        .then(response => response.dimensions)
        .catch(onError);
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
    const fields = 'id,displayName';
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
