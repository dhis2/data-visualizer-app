// TODO move into component StartScreen?
// most likely is not needed anywhere else
export const apiFetchMostViewedVisualizations = (engine, pageSize) => {
    const visualizationQuery = {
        resource: 'dataStatistics/favorites',
        params: {
            eventType: 'VISUALIZATION_VIEW',
            pageSize: pageSize || 10,
        },
    }

    return engine.query({ visualization: visualizationQuery })
}
