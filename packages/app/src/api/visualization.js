import { getFieldsStringByType } from '../modules/fields'

export const apiFetchVisualization = (dataEngine, id) => {
    const visualizationQuery = {
        visualization: {
            resource: 'visualizations',
            id,
            params: {
                fields: getFieldsStringByType('visualization'),
            },
        },
    }

    return dataEngine.query(visualizationQuery)
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

    return dataEngine.mutate(mutation, {
        onError: error => console.error(error),
    })
}
