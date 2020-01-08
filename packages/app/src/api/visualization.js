import { getFieldsStringByType } from '../modules/fields'

const visualizationQuery = {
    visualization: {
        resource: 'visualizations',
        id: ({ id }) => id,
        params: {
            fields: getFieldsStringByType('visualization'),
        },
    },
}

export const apiFetchVisualization = (dataEngine, id) => {
    return dataEngine.query(visualizationQuery, { variables: { id } })
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
