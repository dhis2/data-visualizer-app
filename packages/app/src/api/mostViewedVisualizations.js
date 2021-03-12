// TODO move into component StartScreen?

import { EVENT_TYPE_CHART_VIEW } from './dataStatistics'

// most likely is not needed anywhere else
export const apiFetchMostViewedVisualizations = (dataEngine, pageSize) => {
    const visualizationQuery = {
        resource: 'dataStatistics/favorites',
        params: {
            eventType: EVENT_TYPE_CHART_VIEW,
            pageSize: pageSize || 10,
        },
    }

    return dataEngine.query({ visualization: visualizationQuery })
}
