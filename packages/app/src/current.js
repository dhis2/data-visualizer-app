import { getPropsByKeys } from './util';
import options, { computedOptions } from './options';

const getModelAxis = (dimensionId, items) => ({
    dimension: dimensionId,
    items: items.map(item => ({
        id: item.id,
    })),
});

const hasItems = (object, id) =>
    object.hasOwnProperty(id) && Array.isArray(object[id]) && object[id].length;

export const getAxesFromUi = ui =>
    Object.entries(ui.layout).reduce(
        (layout, [axisName, dimensions]) => ({
            ...layout,
            [axisName]: dimensions
                .map(
                    dimension =>
                        hasItems(ui.itemsByDimension, dimension)
                            ? getModelAxis(
                                  dimension,
                                  ui.itemsByDimension[dimension]
                              )
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
