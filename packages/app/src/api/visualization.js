import { getInstance } from 'd2/lib/d2';
import { getFieldsStringByType } from '../fields';

export const apiFetchVisualization = (type, id) =>
    getInstance().then(d2 =>
        d2.models[type].get(id, {
            fields: getFieldsStringByType(type),
        })
    );

export const apiSaveVisualization = (type, visualization) =>
    getInstance()
        .then(d2 => d2.models[type].create(visualization))
        .then(model => {
            model.dirty = true; // XXX hack until d2 is fixed

            return model.save();
        });
