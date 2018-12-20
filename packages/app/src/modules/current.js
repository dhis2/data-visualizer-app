import pick from 'lodash-es/pick';
import options from './options';
import {
    createDimension,
    AXIS_NAME_COLUMNS,
    AXIS_NAME_ROWS,
    AXIS_NAME_FILTERS,
} from './layout';
import { FIXED_DIMENSIONS } from './fixedDimensions';
import { BASE_FIELD_TYPE, BASE_FIELD_YEARLY_SERIES } from './fields/baseFields';

const dxId = FIXED_DIMENSIONS.dx.id;
const peId = FIXED_DIMENSIONS.pe.id;

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

export const getYearOverYearCurrentFromUi = (state, action) => {
    const ui = action.value;

    const dxItem = ui.itemsByDimension[dxId]
        ? [ui.itemsByDimension[dxId][0]]
        : [];

    return {
        ...state,
        [BASE_FIELD_TYPE]: ui.type,
        ...getOptionsFromUi(ui),
        [AXIS_NAME_COLUMNS]: [createDimension(dxId, dxItem)],
        [AXIS_NAME_ROWS]: [createDimension(peId, ui.yearOverYearCategory)],
        [AXIS_NAME_FILTERS]: getAxesFromUi(ui).filters.filter(
            f => ![dxId, peId].includes(f.dimension)
        ),
        [[BASE_FIELD_YEARLY_SERIES]]: ui.yearOverYearSeries,
    };
};

export const getPieCurrentFromUi = (state, action) => {
    const ui = action.value;

    return {
        ...state,
        [BASE_FIELD_TYPE]: ui.type,
        ...getOptionsFromUi(ui),
        [AXIS_NAME_COLUMNS]: [],
        [AXIS_NAME_ROWS]: getAxesFromUi(ui).rows,
        [AXIS_NAME_FILTERS]: [
            ...getAxesFromUi(ui).filters,
            ...getAxesFromUi(ui).columns,
        ],
    };
};
