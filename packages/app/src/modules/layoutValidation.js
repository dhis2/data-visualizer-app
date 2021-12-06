import {
    AXIS,
    DIMENSION_ID_PERIOD,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
    VIS_TYPE_YEAR_OVER_YEAR_COLUMN,
    VIS_TYPE_PIE,
    VIS_TYPE_GAUGE,
    VIS_TYPE_SINGLE_VALUE,
    VIS_TYPE_PIVOT_TABLE,
    VIS_TYPE_SCATTER,
    getPredefinedDimensionProp,
    dimensionIsValid,
    layoutGetDimension,
    DIMENSION_PROP_NO_ITEMS,
    DIMENSION_ID_DATA,
} from '@dhis2/analytics'
import {
    NoSeriesError,
    NoCategoryError,
    NoPeriodError,
    NoDataError,
    NoSeriesOrCategoryError,
    NoPointsError,
    NoVerticalError,
    NoHorizontalError,
    DuplicateItemsError,
} from './error.js'
import { BASE_FIELD_YEARLY_SERIES } from './fields/baseFields.js'
import { ITEM_ATTRIBUTE_HORIZONTAL, ITEM_ATTRIBUTE_VERTICAL } from './ui.js'

// Layout validation helper functions
const isAxisValid = axis =>
    AXIS.isValid(axis) &&
    axis.some(axisItem =>
        dimensionIsValid(axisItem, {
            requireItems: !getPredefinedDimensionProp(
                axisItem.dimension,
                DIMENSION_PROP_NO_ITEMS
            ),
        })
    )

const validateDimension = (dimension, error) => {
    if (!(dimension && dimensionIsValid(dimension, { requireItems: true }))) {
        throw error
    }
}

const validateAxis = (axis, error) => {
    if (!isAxisValid(axis)) {
        throw error
    }
}

// Layout validation
const validateDefaultLayout = layout => {
    validateAxis(layout.columns, new NoSeriesError(layout.type))
    validateAxis(layout.rows, new NoCategoryError(layout.type))
    validateDimension(
        layoutGetDimension(layout, DIMENSION_ID_PERIOD), // TODO: old validation rule, refactor
        new NoPeriodError(layout.type)
    )
}

const validatePivotTableLayout = layout => {
    if (!isAxisValid(layout.columns) && !isAxisValid(layout.rows)) {
        throw new NoSeriesOrCategoryError(layout.type)
    }
    validateDimension(
        layoutGetDimension(layout, DIMENSION_ID_PERIOD),
        new NoPeriodError(layout.type)
    )
}

const validateYearOverYearLayout = layout => {
    if (
        !(
            Array.isArray(layout[BASE_FIELD_YEARLY_SERIES]) &&
            typeof layout[BASE_FIELD_YEARLY_SERIES][0] === 'string'
        )
    ) {
        throw new NoSeriesError(layout.type)
    }

    validateAxis(layout.rows, new NoCategoryError(layout.type))
}

const validatePieLayout = layout => {
    validateAxis(layout.columns, new NoSeriesError(layout.type))
    validateDimension(
        layoutGetDimension(layout, DIMENSION_ID_PERIOD),
        new NoPeriodError(layout.type)
    )
}

const validateSingleValueLayout = layout => {
    validateDimension(
        layoutGetDimension(layout, DIMENSION_ID_DATA),
        new NoDataError(layout.type)
    )

    validateDimension(
        layoutGetDimension(layout, DIMENSION_ID_PERIOD),
        new NoPeriodError(layout.type)
    )
}

const validateScatterLayout = layout => {
    const verticalItems =
        layout.ui.itemAttributes?.filter(
            item => item.attribute === ITEM_ATTRIBUTE_VERTICAL
        ) || []
    const horizontalItems =
        layout.ui.itemAttributes?.filter(
            item => item.attribute === ITEM_ATTRIBUTE_HORIZONTAL
        ) || []
    if (!verticalItems.length) {
        throw new NoVerticalError()
    } else if (!horizontalItems.length) {
        throw new NoHorizontalError()
    } else if (verticalItems[0].id === horizontalItems[0].id) {
        throw new DuplicateItemsError()
    }
    validateAxis(layout.rows, new NoPointsError(layout.type))
    validateDimension(
        layoutGetDimension(layout, DIMENSION_ID_PERIOD),
        new NoPeriodError(layout.type)
    )
}

export const validateLayout = layout => {
    switch (layout.type) {
        case VIS_TYPE_PIE:
            return validatePieLayout(layout)
        case VIS_TYPE_YEAR_OVER_YEAR_COLUMN:
        case VIS_TYPE_YEAR_OVER_YEAR_LINE:
            return validateYearOverYearLayout(layout)
        case VIS_TYPE_SINGLE_VALUE:
        case VIS_TYPE_GAUGE:
            return validateSingleValueLayout(layout)
        case VIS_TYPE_PIVOT_TABLE:
            return validatePivotTableLayout(layout)
        case VIS_TYPE_SCATTER:
            return validateScatterLayout(layout)
        default:
            return validateDefaultLayout(layout)
    }
}
