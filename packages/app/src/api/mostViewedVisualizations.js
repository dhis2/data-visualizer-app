export const apiFetchMostViewedVisualizations = (engine, pageSize) => {
    const visualizationQuery = {
        visualization: {
            resource: 'dataStatistics/favorites',
            params: {
                eventType: 'VISUALIZATION_VIEW',
                pageSize: pageSize || 10,
            },
        },
    }
    return engine.query(visualizationQuery)
}
