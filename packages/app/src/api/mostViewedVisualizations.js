// TODO move into component StartScreen?
// most likely is not needed anywhere else
export const apiFetchMostViewedVisualizations = (dataEngine, pageSize) => {
    const visualizationQuery = {
        resource: 'dataStatistics/favorites',
        params: {
            eventType: 'VISUALIZATION_VIEW',
            pageSize: pageSize || 10,
        },
    }

    return dataEngine.query({ visualization: visualizationQuery })
}
