import pick from 'lodash-es/pick'
import {
    AXIS_ID_COLUMNS,
    AXIS_ID_ROWS,
    AXIS_ID_FILTERS,
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    dimensionCreate,
    layoutGetDimensionItems,
    layoutReplaceDimension,
} from '@dhis2/analytics'

import options from './options'
import {} from './layout'
import { BASE_FIELD_TYPE, BASE_FIELD_YEARLY_SERIES } from './fields/baseFields'
import { pieLayoutAdapter, singleValueLayoutAdapter } from './layoutAdapters'
import { mergeUiMaps } from './ui'
import { SERIES_ITEMS_SERIES } from './seriesItems'

const hasItems = (object, id) => Array.isArray(object[id]) && object[id].length

export const getAxesFromUi = ui =>
    Object.entries(ui.layout).reduce(
        (layout, [axisId, dimensionIds]) => ({
            ...layout,
            [axisId]: dimensionIds
                .map(dimensionId =>
                    hasItems(ui.itemsByDimension, dimensionId)
                        ? dimensionCreate(
                              dimensionId,
                              ui.itemsByDimension[dimensionId]
                          )
                        : null
                )
                .filter(dim => dim !== null),
        }),
        {}
    )

export const getOptionsFromUi = ui => {
    const optionsFromUi = pick(ui.options, Object.keys(options))

    if (ui.options.targetLine === false) {
        optionsFromUi.targetLineLabel = options.targetLineLabel.defaultValue
        optionsFromUi.targetLineValue = options.targetLineValue.defaultValue
    }

    if (ui.options.baseLine === false) {
        optionsFromUi.baseLineLabel = options.baseLineLabel.defaultValue
        optionsFromUi.baseLineValue = options.baseLineValue.defaultValue
    }

    // nested options under reportParams
    optionsFromUi.reportParams = {};
    [
        'paramOrganisationUnit',
        'paramReportingPeriod',
        'paramParentOrganisationUnit',
        'paramGrandParentOrganisationUnit',
    ].forEach(
        option => (optionsFromUi.reportParams[option] = ui.options[option])
    );

    return optionsFromUi;
};

// expand to support series types later
export const getSeriesItemsFromUi = ui => {
    const seriesItemsObj = {}

    // axes
    mergeUiMaps(seriesItemsObj, ui.axes, 'axis')

    return Object.entries(seriesItemsObj).reduce((arr, [key, value]) => {
        value[SERIES_ITEMS_SERIES] = key
        arr.push(value)
        return arr
    }, [])
}

export const getSingleValueCurrentFromUi = (state, action) => {
    const ui = {
        ...action.value,
        layout: {
            ...singleValueLayoutAdapter(action.value.layout),
        },
    }

    const axesFromUi = getAxesFromUi(ui)

    // only save the first dx item
    const dxItems = layoutGetDimensionItems(axesFromUi, DIMENSION_ID_DATA)
    const singleValueAxesFromUi = layoutReplaceDimension(
        axesFromUi,
        DIMENSION_ID_DATA,
        [dxItems[0]]
    )

    return {
        ...state,
        [BASE_FIELD_TYPE]: ui.type,
        ...singleValueAxesFromUi,
        ...getOptionsFromUi(ui),
    }
}

export const getPieCurrentFromUi = (state, action) => {
    const ui = {
        ...action.value,
        layout: {
            ...pieLayoutAdapter(action.value.layout),
        },
    }

    return {
        ...state,
        [BASE_FIELD_TYPE]: ui.type,
        ...getAxesFromUi(ui),
        ...getOptionsFromUi(ui),
    }
}

export const getYearOverYearCurrentFromUi = (state, action) => {
    const ui = action.value

    const dxItem = ui.itemsByDimension[DIMENSION_ID_DATA]
        ? [ui.itemsByDimension[DIMENSION_ID_DATA][0]]
        : []

    return {
        ...state,
        [BASE_FIELD_TYPE]: ui.type,
        [AXIS_ID_COLUMNS]: [dimensionCreate(DIMENSION_ID_DATA, dxItem)],
        [AXIS_ID_ROWS]: [
            dimensionCreate(DIMENSION_ID_PERIOD, ui.yearOverYearCategory),
        ],
        [AXIS_ID_FILTERS]: getAxesFromUi(ui).filters.filter(
            f => ![DIMENSION_ID_DATA, DIMENSION_ID_PERIOD].includes(f.dimension)
        ),
        [[BASE_FIELD_YEARLY_SERIES]]: ui.yearOverYearSeries,
        ...getOptionsFromUi(ui),
    }
}
