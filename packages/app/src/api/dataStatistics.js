import { onError } from './index'

const EVENT_TYPE_CHART_VIEW = 'CHART_VIEW'

const dataStatisticMutation = {
    resource: 'dataStatistics',
    params: ({ id }) => ({
        favorite: id,
        eventType: EVENT_TYPE_CHART_VIEW,
    }),
    type: 'create',
}

export const apiPostDataStatistics = (dataEngine, id) =>
    dataEngine.mutate(dataStatisticMutation, { variables: { id }, onError })
