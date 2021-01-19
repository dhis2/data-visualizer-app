import pick from 'lodash-es/pick'
import {
    AXIS_ID_COLUMNS,
    AXIS_ID_ROWS,
    AXIS_ID_FILTERS,
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    VIS_TYPE_SINGLE_VALUE,
    VIS_TYPE_PIE,
    dimensionCreate,
    layoutGetDimensionItems,
    layoutReplaceDimension,
    getPredefinedDimensionProp,
    DIMENSION_PROP_NO_ITEMS,
    getAdaptedUiLayoutByType,
    VIS_TYPE_SCATTER,
} from '@dhis2/analytics'

import options from './options'
import {} from './layout'
import { BASE_FIELD_TYPE, BASE_FIELD_YEARLY_SERIES } from './fields/baseFields'
import {
    ITEM_ATTRIBUTE_HORIZONTAL,
    ITEM_ATTRIBUTE_VERTICAL,
} from '../modules/ui'

const hasItems = (object, id) => Array.isArray(object[id]) && object[id].length

export const getAxesFromUi = ui =>
    Object.entries(ui.layout).reduce(
        (layout, [axisId, dimensionIds]) => ({
            ...layout,
            [axisId]: dimensionIds
                .map(dimensionId =>
                    hasItems(ui.itemsByDimension, dimensionId) ||
                    getPredefinedDimensionProp(
                        dimensionId,
                        DIMENSION_PROP_NO_ITEMS
                    )
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

    // approvalLevel is stored as an object { id, level, displayName }
    // only pass approvalLevel id
    if (optionsFromUi.approvalLevel !== options.approvalLevel.defaultValue) {
        optionsFromUi.approvalLevel = optionsFromUi.approvalLevel.id
    }

    // nested options under reportingParams
    optionsFromUi.reportingParams = {}
    ;[
        'organisationUnit',
        'reportingPeriod',
        'parentOrganisationUnit',
        'grandParentOrganisationUnit',
    ].forEach(option => {
        optionsFromUi.reportingParams[option] = optionsFromUi[option]
        delete optionsFromUi[option]
    })

    // cast option values to Number for some options
    ;[
        'baseLineValue',
        'targetLineValue',
        'sortOrder',
        'topLimit',
        'rangeAxisMinValue',
        'rangeAxisMaxValue',
    ].forEach(option => {
        if (Object.prototype.hasOwnProperty.call(optionsFromUi, option)) {
            if (
                optionsFromUi[option] !== undefined &&
                optionsFromUi[option] !== ''
            ) {
                optionsFromUi[option] = Number(optionsFromUi[option])
            }
        }
    })

    return optionsFromUi
}

export const getSeriesFromUi = ui => {
    return ui.options.series ? [...ui.options.series] : []
}

export const getSingleValueCurrentFromUi = (state, action) => {
    const ui = {
        ...action.value,
        layout: {
            ...getAdaptedUiLayoutByType(
                action.value.layout,
                VIS_TYPE_SINGLE_VALUE
            ),
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

export const getScatterCurrentFromUi = (state, action) => {
    const ui = {
        ...action.value,
        layout: {
            ...getAdaptedUiLayoutByType(action.value.layout, VIS_TYPE_SCATTER),
        },
    }

    const axesFromUi = getAxesFromUi(ui)

    // only save first vertical and first horizontal dx items
    const verticalItem =
        ui.itemAttributes.find(
            item => item.attribute === ITEM_ATTRIBUTE_VERTICAL
        ) || {}
    const horizontalItem =
        ui.itemAttributes.find(
            item => item.attribute === ITEM_ATTRIBUTE_HORIZONTAL
        ) || {}
    const scatterAxesFromUi = layoutReplaceDimension(
        axesFromUi,
        DIMENSION_ID_DATA,
        [verticalItem, horizontalItem].map(item => ({ id: item.id }))
    )

    return {
        ...state,
        [BASE_FIELD_TYPE]: ui.type,
        ...scatterAxesFromUi,
        ...getOptionsFromUi(ui),
    }
}

export const getPieCurrentFromUi = (state, action) => {
    const ui = {
        ...action.value,
        layout: {
            ...getAdaptedUiLayoutByType(action.value.layout, VIS_TYPE_PIE),
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

    const periodDimension = dimensionCreate(
        DIMENSION_ID_PERIOD,
        ui.yearOverYearCategory
    )

    return {
        ...state,
        [BASE_FIELD_TYPE]: ui.type,
        [AXIS_ID_COLUMNS]: [],
        [AXIS_ID_ROWS]: [periodDimension],
        [AXIS_ID_FILTERS]: getAxesFromUi(ui).filters,
        [[BASE_FIELD_YEARLY_SERIES]]: ui.yearOverYearSeries,
        ...getOptionsFromUi(ui),
    }
}
