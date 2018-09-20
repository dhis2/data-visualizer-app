import { getPropsByKeys } from './util';
import { AXIS_NAMES } from './layout';

export const getAxesFromUi = ui => {
    const axes = getPropsByKeys(ui.layout, AXIS_NAMES);
    const itemsByDimension = Object.entries(ui.itemsByDimension).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [key]: value.map(item => ({ id: item })),
        }),
        {}
    );

    const axesWithIds = Object.keys(axes).reduce(
        (acc, axis) => ({
            ...acc,
            [axis]: axes[axis].map(dimension => ({
                dimension,
                items: itemsByDimension[dimension],
            })),
        }),
        {}
    );

    return axesWithIds;
};
