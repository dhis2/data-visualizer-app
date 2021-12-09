import { onError } from './index.js'

export const EVENT_TYPE = 'VISUALIZATION_VIEW'

const dataStatisticMutation = {
    resource: 'dataStatistics',
    params: ({ id }) => ({
        favorite: id,
        eventType: EVENT_TYPE,
    }),
    type: 'create',
}

export const apiPostDataStatistics = (dataEngine, id) =>
    dataEngine.mutate(dataStatisticMutation, { variables: { id }, onError })
