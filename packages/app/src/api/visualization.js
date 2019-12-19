import { getFieldsStringByType } from '../modules/fields'

export const apiFetchVisualization = (dataEngine, type, id) => {
    const visualizationQuery = {
        visualization: {
            resource: `${type}s`, // XXX SUPER UGLY HACK will be fixed when the vis api PR is merged
            id,
            params: {
                fields: getFieldsStringByType(type),
            },
        },
    }

    return dataEngine.query(visualizationQuery)
}

export const apiSaveVisualization = (dataEngine, type, visualization) => {
    const mutation = {
        type: 'create',
        resource: `${type}s`, // XXX UGLY HACK will be fixed when the vis api PR is merged
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
