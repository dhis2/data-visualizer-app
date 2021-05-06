export const apiFetchMostViewedVisualizations = (
    engine,
    pageSize,
    username
) => {
    const visualizationQuery = {
        visualization: {
            resource: 'dataStatistics/favorites',
            params: {
                eventType: 'VISUALIZATION_VIEW',
                pageSize: pageSize || 10,
                ...(username ? { username } : {}),
            },
        },
    }
    return engine.query(visualizationQuery)
}
