/*eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/

import {
    AXIS_ID_COLUMNS,
    AXIS_ID_ROWS,
    AXIS_ID_FILTERS,
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    DIMENSION_TYPE_DATA_ELEMENT,
    DIMENSION_TYPE_DATA_ELEMENT_OPERAND,
    VIS_TYPE_OUTLIER_TABLE,
    VIS_TYPE_SINGLE_VALUE,
    VIS_TYPE_PIE,
    dimensionCreate,
    layoutGetDimensionItems,
    layoutReplaceDimension,
    getPredefinedDimensionProp,
    DIMENSION_PROP_NO_ITEMS,
    getAdaptedUiLayoutByType,
    VIS_TYPE_SCATTER,
    ALL_DYNAMIC_DIMENSION_ITEMS,
} from '@dhis2/analytics'
import pick from 'lodash-es/pick'
import {
    ITEM_ATTRIBUTE_HORIZONTAL,
    ITEM_ATTRIBUTE_VERTICAL,
} from '../modules/ui.js'
import {
    BASE_FIELD_TYPE,
    BASE_FIELD_YEARLY_SERIES,
} from './fields/baseFields.js'
import {
    default as options,
    OPTION_APPROVAL_LEVEL,
    OPTION_AXES,
    OPTION_ICONS,
    OPTION_SERIES,
    OPTION_SORT_ORDER,
    OPTION_TOP_LIMIT,
} from './options.js'
import {} from './layout.js'

const hasItems = (object, id) => Array.isArray(object[id]) && object[id].length

export const getAxesFromUi = (ui, metadata) =>
    Object.entries(ui.layout).reduce(
        (layout, [axisId, dimensionIds]) => ({
            ...layout,
            [axisId]: dimensionIds
                .map((dimensionId) =>
                    hasItems(ui.itemsByDimension, dimensionId) ||
                    getPredefinedDimensionProp(
                        dimensionId,
                        DIMENSION_PROP_NO_ITEMS
                    )
                        ? {
                              dimension: dimensionId,
                              items: (
                                  ui.itemsByDimension[dimensionId] || []
                              ).map((id) =>
                                  metadata && metadata[id]
                                      ? { ...metadata[id], id }
                                      : { id }
                              ),
                          }
                        : null
                )
                .filter((dim) => dim !== null),
        }),
        {}
    )

export const getOptionsFromUi = (ui) => {
    const optionsFromUi = pick(ui.options, Object.keys(options))

    if (optionsFromUi[OPTION_AXES] && optionsFromUi[OPTION_AXES].length) {
        optionsFromUi[OPTION_AXES] = [
            ...optionsFromUi[OPTION_AXES].map((axis) => ({ ...axis })),
        ]

        optionsFromUi[OPTION_AXES].forEach((axis) => {
            if (axis.targetLine) {
                const { enabled, ...rest } = axis.targetLine
                axis.targetLine = { ...rest }
            }
            if (axis.baseLine) {
                const { enabled, ...rest } = axis.baseLine
                axis.baseLine = { ...rest }
            }
        })
    }

    // approvalLevel is stored as an object { id, level, displayName }
    // only pass approvalLevel id
    if (
        optionsFromUi[OPTION_APPROVAL_LEVEL] !==
        options[OPTION_APPROVAL_LEVEL].defaultValue
    ) {
        optionsFromUi[OPTION_APPROVAL_LEVEL] =
            optionsFromUi[OPTION_APPROVAL_LEVEL].id
    }

    // icons is stored as array of objects { type: DATA_ITEM }
    if (optionsFromUi[OPTION_ICONS] !== options[OPTION_ICONS].defaultValue) {
        optionsFromUi[OPTION_ICONS] = [{ type: 'DATA_ITEM' }]
    } else {
        // if options is not enabled, do not pass the "internal" boolean value
        optionsFromUi[OPTION_ICONS] = undefined
    }

    // nested options under reportingParams
    optionsFromUi.reportingParams = {}

    Array(
        'organisationUnit',
        'reportingPeriod',
        'parentOrganisationUnit',
        'grandParentOrganisationUnit'
    ).forEach((option) => {
        optionsFromUi.reportingParams[option] = optionsFromUi[option]
        delete optionsFromUi[option]
    })

    // cast option values to Number for some options
    Array(OPTION_SORT_ORDER, OPTION_TOP_LIMIT).forEach((option) => {
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

export const getSeriesFromUi = (ui) => {
    return ui.options[OPTION_SERIES] ? [...ui.options[OPTION_SERIES]] : []
}

export const getItemsByDimensionFromUi = (ui) => {
    const result = {}
    Object.keys(ui.itemsByDimension).forEach(
        (key) =>
            // strip out all other items when 'ALL' is in use, to be passed to the backend
            (result[key] = ui.itemsByDimension[key].some(
                (id) => id === ALL_DYNAMIC_DIMENSION_ITEMS
            )
                ? [ALL_DYNAMIC_DIMENSION_ITEMS]
                : ui.itemsByDimension[key])
    )
    return result
}

export const getOutlierTableCurrentFromUi = (state, value, metadata) => {
    const ui = {
        ...value,
        layout: {
            ...getAdaptedUiLayoutByType(value.layout, VIS_TYPE_OUTLIER_TABLE),
        },
        itemsByDimension: getItemsByDimensionFromUi(value),
    }

    const axesFromUi = getAxesFromUi(ui)

    const peItems = layoutGetDimensionItems(axesFromUi, DIMENSION_ID_PERIOD)
    const dxItems = layoutGetDimensionItems(axesFromUi, DIMENSION_ID_DATA)

    const outlierTableAxesFromUi =
        // only save the first pe item
        layoutReplaceDimension(
            // only save data element and data element operand dx items
            layoutReplaceDimension(
                axesFromUi,
                DIMENSION_ID_DATA,
                dxItems.filter(({ id }) =>
                    [
                        DIMENSION_TYPE_DATA_ELEMENT,
                        DIMENSION_TYPE_DATA_ELEMENT_OPERAND,
                    ].includes(metadata[id]?.dimensionItemType)
                )
            ),
            DIMENSION_ID_PERIOD,
            [peItems[0]]
        )

    return {
        ...state,
        [BASE_FIELD_TYPE]: ui.type,
        ...outlierTableAxesFromUi,
        ...getOptionsFromUi(ui),
        sorting: ui.sorting
            ? [
                  {
                      dimension: ui.sorting.dimension,
                      direction: ui.sorting.direction.toUpperCase(),
                  },
              ]
            : undefined,
    }
}

export const getSingleValueCurrentFromUi = (state, value) => {
    const ui = {
        ...value,
        layout: {
            ...getAdaptedUiLayoutByType(value.layout, VIS_TYPE_SINGLE_VALUE),
        },
        itemsByDimension: getItemsByDimensionFromUi(value),
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

export const getScatterCurrentFromUi = (state, value) => {
    const ui = {
        ...value,
        layout: {
            ...getAdaptedUiLayoutByType(value.layout, VIS_TYPE_SCATTER),
        },
        itemsByDimension: getItemsByDimensionFromUi(value),
    }

    const axesFromUi = getAxesFromUi(ui)

    // only save first vertical and first horizontal dx items
    const verticalItem =
        ui.itemAttributes.find(
            (item) => item.attribute === ITEM_ATTRIBUTE_VERTICAL
        ) || {}
    const horizontalItem =
        ui.itemAttributes.find(
            (item) => item.attribute === ITEM_ATTRIBUTE_HORIZONTAL
        ) || {}
    const scatterAxesFromUi = layoutReplaceDimension(
        axesFromUi,
        DIMENSION_ID_DATA,
        [verticalItem, horizontalItem].map((item) => ({ id: item.id }))
    )

    return {
        ...state,
        [BASE_FIELD_TYPE]: ui.type,
        ...scatterAxesFromUi,
        ...getOptionsFromUi(ui),
    }
}

export const getPieCurrentFromUi = (state, value) => {
    const ui = {
        ...value,
        layout: {
            ...getAdaptedUiLayoutByType(value.layout, VIS_TYPE_PIE),
        },
        itemsByDimension: getItemsByDimensionFromUi(value),
    }

    return {
        ...state,
        [BASE_FIELD_TYPE]: ui.type,
        ...getAxesFromUi(ui),
        ...getOptionsFromUi(ui),
    }
}

export const getYearOverYearCurrentFromUi = (state, value) => {
    const ui = {
        ...value,
        itemsByDimension: getItemsByDimensionFromUi(value),
    }

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
