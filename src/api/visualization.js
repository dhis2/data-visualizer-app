import { getFieldsStringByType } from '../modules/fields/index.js'

const visualizationQuery = {
    visualization: {
        resource: 'visualizations',
        id: ({ id }) => id,
        params: ({ withSubscribers }) => ({
            fields: getFieldsStringByType('visualization', { withSubscribers }),
        }),
    },
}

const visualizationNameDescQuery = {
    visualization: {
        resource: 'visualizations',
        id: ({ id }) => id,
        params: {
            fields: 'name,displayName,description,displayDescription',
        },
    },
}

const visualizationSubscribersQuery = {
    visualizationSubscribers: {
        resource: 'visualizations',
        id: ({ id }) => id,
        params: {
            fields: ['subscribers'],
        },
    },
}

const visualizationsQuery = {
    visualization: {
        resource: 'visualizations',
        params: ({ visualizationIds }) => ({
            filter: `id:in:[${visualizationIds}]`,
            fields: ['id', 'type'],
        }),
    },
}

export const apiFetchVisualization = ({
    engine,
    id,
    withSubscribers = false,
}) => {
    return engine.query(visualizationQuery, {
        variables: { id, withSubscribers },
    })
}

export const apiFetchVisualizationNameDesc = (engine, id) => {
    return engine.query(visualizationNameDescQuery, {
        variables: { id },
    })
}

export const apiFetchVisualizationSubscribers = (engine, id) => {
    return engine.query(visualizationSubscribersQuery, {
        variables: { id },
    })
}

export const apiFetchVisualizations = (engine, visualizationIds) => {
    return engine.query(visualizationsQuery, {
        variables: { visualizationIds },
    })
}

export const apiSaveVisualization = (engine, visualization) => {
    const mutation = {
        type: 'create',
        resource: 'visualizations',
        data: visualization,
        params: {
            skipTranslations: 'true',
            skipSharing: 'true',
        },
    }

    if (visualization.id) {
        mutation.type = 'update'
        mutation.id = visualization.id
    }

    return engine.mutate(mutation)
}
