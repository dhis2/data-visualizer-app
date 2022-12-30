// TODO move into component StartScreen?

import { EVENT_TYPE } from './dataStatistics.js'

// most likely is not needed anywhere else
export const apiFetchMostViewedVisualizations = (
    dataEngine,
    pageSize,
    username
) => {
    const visualizationQuery = {
        resource: 'dataStatistics/favorites',
        params: {
            eventType: EVENT_TYPE,
            pageSize: pageSize || 10,
            ...(username ? { username } : {}),
        },
    }

    return dataEngine.query({ visualization: visualizationQuery })
}
