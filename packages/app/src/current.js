import { getPropsByKeys } from './util';
import options, { computedOptions } from './options';
import { createDimension } from './layout';

const hasItems = (object, id) =>
    object.hasOwnProperty(id) && Array.isArray(object[id]) && object[id].length;

export const getAxesFromUi = ui =>
    Object.entries(ui.layout).reduce(
        (layout, [axisName, ids]) => ({
            ...layout,
            [axisName]: ids
                .map(
                    id =>
                        hasItems(ui.itemsByDimension, id)
                            ? createDimension(id, ui.itemsByDimension[id])
                            : null
                )
                .filter(dim => dim !== null),
        }),
        {}
    );

export const getOptionsFromUi = ui => {
    const optionsFromUi = getPropsByKeys(
        ui.options,
        Object.keys({ ...options, ...computedOptions })
    );

    if (optionsFromUi.targetLine === false) {
        delete optionsFromUi.targetLineLabel;
        delete optionsFromUi.targetLineValue;
    }

    if (optionsFromUi.baseLine === false) {
        delete optionsFromUi.baseLineLabel;
        delete optionsFromUi.baseLineValue;
    }

    return optionsFromUi;
};
