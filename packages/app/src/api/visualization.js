import { getFieldsStringByType } from '../modules/fields'

export const apiFetchVisualization = (dataEngine, id) => {
    const query = {
        visualization: {
            resource: 'visualizations',
            id: ({ id }) => id,
            params: {
                fields: getFieldsStringByType('visualization'),
            },
        },
    }

    return dataEngine.query(query, { variables: { id } })
}

export const apiFetchVisualizations = (dataEngine, filter, fields) => {
    const query = {
        visualization: {
            resource: 'visualizations',
            params: {
                filter: filter,
                fields: fields,
            },
        },
    }

    return dataEngine.query(query)
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
