import pick from 'lodash-es/pick';
import options, { computedOptions } from './options';
import { createDimension } from './layout';

const hasItems = (object, id) =>
    object.hasOwnProperty(id) && Array.isArray(object[id]) && object[id].length;

export const getAxesFromUi = ui =>
    Object.entries(ui.layout).reduce(
        (layout, [axisName, ids]) => ({
            ...layout,
            [axisName]: ids
                .map(id =>
                    hasItems(ui.itemsByDimension, id)
                        ? createDimension(id, ui.itemsByDimension[id])
                        : null
                )
                .filter(dim => dim !== null),
        }),
        {}
    );

export const getOptionsFromUi = ui => {
    const optionsFromUi = pick(ui.options, Object.keys(options));

    if (ui.options.targetLine === false) {
        optionsFromUi.targetLineLabel = options.targetLineLabel.defaultValue;
        optionsFromUi.targetLineValue = options.targetLineValue.defaultValue;
    }

    if (ui.options.baseLine === false) {
        optionsFromUi.baseLineLabel = options.baseLineLabel.defaultValue;
        optionsFromUi.baseLineValue = options.baseLineValue.defaultValue;
    }

    return optionsFromUi;
};
