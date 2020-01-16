const visualizationQuery = {
    visualization: {
        resource: 'dataStatistics/favorites',
        params: {
            eventType: 'VISUALIZATION_VIEW',
            pageSize: 5,
        },
    },
}

export const apiFetchMostViewedVisualizations = engine =>
    engine.query(visualizationQuery)
