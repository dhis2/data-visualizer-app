import { getFieldsStringByType } from '../modules/fields/index.js'

const visualizationQuery = {
    visualization: {
        resource: 'visualizations',
        id: ({ id }) => id,
        params: {
            fields: getFieldsStringByType('visualization'),
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

export const apiFetchVisualization = (dataEngine, id) => {
    return dataEngine.query(visualizationQuery, { variables: { id } })
}

export const apiFetchVisualizations = (dataEngine, visualizationIds) => {
    return dataEngine.query(visualizationsQuery, {
        variables: { visualizationIds },
    })
}

export const apiSaveVisualization = (dataEngine, visualization) => {
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

    return dataEngine.mutate(mutation)
}
