import pick from 'lodash-es/pick';
import {
    AXIS_NAME_COLUMNS,
    AXIS_NAME_ROWS,
    AXIS_NAME_FILTERS,
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    dimensionCreate,
} from '@dhis2/analytics';

import options from './options';
import {} from './layout';
import { BASE_FIELD_TYPE, BASE_FIELD_YEARLY_SERIES } from './fields/baseFields';
import { pieLayoutAdapter, singleValueLayoutAdapter } from './layoutAdapters';
import { mergeUiMaps } from './ui';
import { SERIES_ITEMS_SERIES } from './seriesItems';

const hasItems = (object, id) =>
    object.hasOwnProperty(id) && Array.isArray(object[id]) && object[id].length;

export const getAxesFromUi = ui =>
    Object.entries(ui.layout).reduce(
        (layout, [axisName, ids]) => ({
            ...layout,
            [axisName]: ids
                .map(id =>
                    hasItems(ui.itemsByDimension, id)
                        ? dimensionCreate(id, ui.itemsByDimension[id])
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

// expand to support series types later
export const getSeriesItemsFromUi = ui => {
    const seriesItemsObj = {};

    // axes
    mergeUiMaps(seriesItemsObj, ui.axes, 'axis');

    return Object.entries(seriesItemsObj).reduce((arr, [key, value]) => {
        value[SERIES_ITEMS_SERIES] = key;
        arr.push(value);
        return arr;
    }, []);
};

export const getSingleValueCurrentFromUi = (state, action) => {
    const ui = {
        ...action.value,
        layout: {
            ...singleValueLayoutAdapter(action.value.layout),
        },
    };

    // only save the first dx item
    const axesFromUi = getAxesFromUi(ui);
    if (axesFromUi.columns.length && axesFromUi.columns[0].items.length) {
        axesFromUi.columns[0].items = [axesFromUi.columns[0].items[0]];
    }

    return {
        ...state,
        [BASE_FIELD_TYPE]: ui.type,
        ...axesFromUi,
        ...getOptionsFromUi(ui),
    };
};

export const getPieCurrentFromUi = (state, action) => {
    const ui = {
        ...action.value,
        layout: {
            ...pieLayoutAdapter(action.value.layout),
        },
    };

    return {
        ...state,
        [BASE_FIELD_TYPE]: ui.type,
        ...getAxesFromUi(ui),
        ...getOptionsFromUi(ui),
    };
};

export const getYearOverYearCurrentFromUi = (state, action) => {
    const ui = action.value;

    const dxItem = ui.itemsByDimension[DIMENSION_ID_DATA]
        ? [ui.itemsByDimension[DIMENSION_ID_DATA][0]]
        : [];

    return {
        ...state,
        [BASE_FIELD_TYPE]: ui.type,
        [AXIS_NAME_COLUMNS]: [dimensionCreate(DIMENSION_ID_DATA, dxItem)],
        [AXIS_NAME_ROWS]: [
            dimensionCreate(DIMENSION_ID_PERIOD, ui.yearOverYearCategory),
        ],
        [AXIS_NAME_FILTERS]: getAxesFromUi(ui).filters.filter(
            f => ![DIMENSION_ID_DATA, DIMENSION_ID_PERIOD].includes(f.dimension)
        ),
        [[BASE_FIELD_YEARLY_SERIES]]: ui.yearOverYearSeries,
        ...getOptionsFromUi(ui),
    };
};
