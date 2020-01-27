import { getInstance } from 'd2';

const EVENT_TYPE_CHART_VIEW = 'CHART_VIEW';

export const apiPostDataStatistics = async id => {
    const d2 = await getInstance();
    const api = d2.Api.getApi();

    const url = `/dataStatistics?eventType=${EVENT_TYPE_CHART_VIEW}&favorite=${id}`;

    return api.post(url);
};
