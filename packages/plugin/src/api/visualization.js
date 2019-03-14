import { getFieldsStringByType } from '../modules/fields';

export const apiFetchVisualization = (d2, type, id) =>
    d2.models[type].get(id, {
        fields: getFieldsStringByType(type),
    });
