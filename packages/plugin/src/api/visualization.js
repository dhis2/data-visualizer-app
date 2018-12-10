import { getInstance } from 'd2';
import { getFieldsStringByType } from '../modules/fields';

export const apiFetchVisualization = (type, id) =>
    getInstance().then(d2 =>
        d2.models[type].get(id, {
            fields: getFieldsStringByType(type),
        })
    );

export const apiSaveVisualization = (type, visualization) =>
    getInstance()
        .then(d2 => d2.models[type])
        .then(modelDefinition => {
            const api = modelDefinition.api;
            const apiEndpoint = modelDefinition.apiEndpoint;

            const options = {
                skipTranslations: true,
                skipSharing: true,
            };

            const query = Object.entries(options).reduce(
                (query, [name, value]) => {
                    query.push(
                        `${encodeURIComponent(name)}=${encodeURIComponent(
                            value
                        )}`
                    );
                    return query;
                },
                []
            );

            const queryString = '?' + query.join('&');

            if (visualization.id) {
                return api.update(
                    `${apiEndpoint}/${visualization.id}${queryString}`,
                    visualization,
                    false
                );
            } else {
                return api.post(`${apiEndpoint}${queryString}`, visualization);
            }
        });
