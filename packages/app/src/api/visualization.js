import { getInstance } from 'd2/lib/d2';
import { onError } from './index';
import { getFieldsStringByType } from '../fields';

export const apiFetchVisualization = (type, id) =>
    getInstance()
        .then(d2 =>
            d2.models[type].get(id, {
                fields: getFieldsStringByType('chart'),
            })
        )
        .catch(onError);
