import i18n from '@dhis2/d2-i18n'
import {
    AXIS,
    AXIS_ID_COLUMNS,
    AXIS_ID_ROWS,
    AXIS_ID_FILTERS,
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
    VIS_TYPE_YEAR_OVER_YEAR_COLUMN,
    VIS_TYPE_PIE,
    VIS_TYPE_GAUGE,
    VIS_TYPE_SINGLE_VALUE,
    getFixedDimensionProp,
    dimensionIsValid,
    layoutGetDimension,
    getAxisName,
} from '@dhis2/analytics'

import { BASE_FIELD_YEARLY_SERIES } from './fields/baseFields'

const dxName = getFixedDimensionProp(DIMENSION_ID_DATA, name)

const errorLabels = {
    defaultSeries: i18n.t('Please add at least one {{series}} dimension', {
        series: getAxisName(AXIS_ID_COLUMNS),
    }),
    defaultCategory: i18n.t('Please add at least one {{category}} dimension', {
        category: getAxisName(AXIS_ID_ROWS),
    }),
    defaultPe: i18n.t(
        'Please add at least one period as {{series}}, {{category}} or {{filter}}',
        {
            series: getAxisName(AXIS_ID_COLUMNS),
            category: getAxisName(AXIS_ID_ROWS),
            filter: getAxisName(AXIS_ID_FILTERS),
        }
    ),
    pie: {
        dx: i18n.t('Please add {{data}} as {{category}} or {{filter}}', {
            data: dxName,
            category: getAxisName(AXIS_ID_ROWS),
            filter: getAxisName(AXIS_ID_FILTERS),
        }),
        pe: i18n.t(
            'Please add at least one period as {{series}} or {{filter}}',
            {
                series: getAxisName(AXIS_ID_COLUMNS),
                filter: getAxisName(AXIS_ID_FILTERS),
            }
        ),
        filter: i18n.t('Please add at least one {{filter}} dimension', {
            filter: getAxisName(AXIS_ID_FILTERS),
        }),
    },
    yearOverYear: {
        seriesPeriod: i18n.t(
            'Please add at least one period as a {{series}} dimension',
            {
                series: getAxisName(AXIS_ID_COLUMNS),
            }
        ),
        categoryPeriod: i18n.t(
            'Please add at least one period as a {{category}} dimension',
            {
                category: getAxisName(AXIS_ID_ROWS),
            }
        ),
        dx: i18n.t('Please add {{data}} as a filter dimension', {
            data: dxName,
        }),
    },
    singleValue: {
        dx: i18n.t('Please add one {{series}} dimension', {
            series: getAxisName(AXIS_ID_COLUMNS),
        }),
        pe: i18n.t('Please add at least one period as {{filter}}', {
            filter: getAxisName(AXIS_ID_FILTERS),
        }),
    },
}

// Layout validation helper functions
const isAxisValid = axis =>
    AXIS.isValid(axis) &&
    axis.some(axisItem =>
        dimensionIsValid(axisItem, {
            requireItems: !getFixedDimensionProp(axisItem.dimension, 'noItems'),
        })
    )

const validateDimension = (dimension, message) => {
    if (!(dimension && dimensionIsValid(dimension, { requireItems: true }))) {
        throw new Error(message)
    }
}

const validateAxis = (axis, message) => {
    if (!isAxisValid(axis)) {
        throw new Error(message)
    }
}

// Layout validation
const validateDefaultLayout = layout => {
    validateAxis(layout.columns, errorLabels.defaultSeries)
    validateAxis(layout.rows, errorLabels.defaultCategory)
    validateDimension(
        layoutGetDimension(layout, DIMENSION_ID_PERIOD), // TODO: old validation rule, refactor
        errorLabels.defaultPe
    )
}

const validateYearOverYearLayout = layout => {
    if (
        !(
            Array.isArray(layout[BASE_FIELD_YEARLY_SERIES]) &&
            typeof layout[BASE_FIELD_YEARLY_SERIES][0] === 'string'
        )
    ) {
        throw new Error(errorLabels.yearOverYear.seriesPeriod)
    }

    validateAxis(layout.rows, errorLabels.yearOverYear.categoryPeriod)

    validateAxis(layout.columns, errorLabels.yearOverYear.dx)
}

const validatePieLayout = layout => {
    validateAxis(layout.columns, errorLabels.defaultSeries)
    validateAxis(layout.filters, errorLabels.pie.filter)
    validateDimension(
        layoutGetDimension(layout, DIMENSION_ID_PERIOD),
        errorLabels.pie.pe
    )
}

const validateSingleValueLayout = layout => {
    validateAxis(layout.columns, errorLabels.singleValue.dx)
    validateDimension(
        layoutGetDimension(layout, DIMENSION_ID_PERIOD),
        errorLabels.singleValue.pe
    )
}

// TODO: Add validatePivotLayout

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
        default:
            return validateDefaultLayout(layout)
    }
}
