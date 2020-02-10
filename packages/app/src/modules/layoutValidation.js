import {
    AXIS,
    DIMENSION_ID_PERIOD,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
    VIS_TYPE_YEAR_OVER_YEAR_COLUMN,
    VIS_TYPE_PIE,
    VIS_TYPE_GAUGE,
    VIS_TYPE_SINGLE_VALUE,
    getPredefinedDimensionProp,
    dimensionIsValid,
    layoutGetDimension,
    DIMENSION_ID_DATA,
    DIMENSION_PROP_NO_ITEMS,
} from '@dhis2/analytics'

import { BASE_FIELD_YEARLY_SERIES } from './fields/baseFields'
import {
    NoSeriesError,
    NoCategoryError,
    NoPeriodError,
    NoDataError,
} from './error'

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
        layoutGetDimension(layout, DIMENSION_ID_PERIOD),
        new NoPeriodError(layout.type)
    )
}

// TODO: Add validatePivotLayout

export const validateLayout = layout => {
    validateDimension(
        layoutGetDimension(layout, DIMENSION_ID_DATA),
        new NoDataError(layout.type)
    )

    switch (layout.type) {
        case VIS_TYPE_PIE:
            return validatePieLayout(layout)
        case VIS_TYPE_YEAR_OVER_YEAR_COLUMN:
        case VIS_TYPE_YEAR_OVER_YEAR_LINE:
            return validateYearOverYearLayout(layout)
        case VIS_TYPE_SINGLE_VALUE:
        case VIS_TYPE_GAUGE:
            return validateSingleValueLayout(layout)
        default:
            return validateDefaultLayout(layout)
    }
}
