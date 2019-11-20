import i18n from '@dhis2/d2-i18n';
import {
    AXIS,
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    FIXED_DIMENSIONS,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
    VIS_TYPE_YEAR_OVER_YEAR_COLUMN,
    VIS_TYPE_PIE,
    VIS_TYPE_GAUGE,
    VIS_TYPE_SINGLE_VALUE,
    dimensionIsValid,
    layoutGetDimension,
    axisDisplayNames,
} from '@dhis2/analytics';

import { BASE_FIELD_YEARLY_SERIES } from './fields/baseFields';

const dxName = FIXED_DIMENSIONS[DIMENSION_ID_DATA].name;

const errorLabels = {
    defaultSeries: i18n.t('Please add at least one {{series}} dimension', {
        series: axisDisplayNames.columns,
    }),
    defaultCategory: i18n.t('Please add at least one {{category}} dimension', {
        category: axisDisplayNames.rows,
    }),
    defaultPe: i18n.t(
        'Please add at least one period as {{series}}, {{category}} or {{filter}}',
        {
            series: axisDisplayNames.columns,
            category: axisDisplayNames.rows,
            filter: axisDisplayNames.filters,
        }
    ),
    pie: {
        dx: i18n.t('Please add {{data}} as {{category}} or {{filter}}', {
            data: dxName,
            category: axisDisplayNames.rows,
            filter: axisDisplayNames.filters,
        }),
        pe: i18n.t(
            'Please add at least one period as {{series}} or {{filter}}',
            {
                series: axisDisplayNames.columns,
                filter: axisDisplayNames.filters,
            }
        ),
        filter: i18n.t('Please add at least one {{filter}} dimension', {
            filter: axisDisplayNames.filters,
        }),
    },
    yearOverYear: {
        seriesPeriod: i18n.t(
            'Please add at least one period as a {{series}} dimension',
            {
                series: axisDisplayNames.columns,
            }
        ),
        categoryPeriod: i18n.t(
            'Please add at least one period as a {{category}} dimension',
            {
                category: axisDisplayNames.rows,
            }
        ),
        dx: i18n.t('Please add {{data}} as a filter dimension', {
            data: dxName,
        }),
    },
    singleValue: {
        dx: i18n.t('Please add one {{series}} dimension', {
            series: axisDisplayNames.columns,
        }),
        pe: i18n.t('Please add at least one period as {{filter}}', {
            filter: axisDisplayNames.filters,
        }),
    },
};

// Layout validation helper functions
const isAxisValid = axis =>
    AXIS.isValid(axis) && dimensionIsValid(axis[0], { requireItems: true });

const validateDimension = (dimension, message) => {
    if (!(dimension && dimensionIsValid(dimension, { requireItems: true }))) {
        throw new Error(message);
    }
};

const validateAxis = (axis, message) => {
    if (!isAxisValid(axis)) {
        throw new Error(message);
    }
};

// Layout validation
const validateDefaultLayout = layout => {
    validateAxis(layout.columns, errorLabels.defaultSeries);
    validateAxis(layout.rows, errorLabels.defaultCategory);
    validateDimension(
        layoutGetDimension(layout, DIMENSION_ID_PERIOD),
        errorLabels.defaultPe
    );
};

const validateYearOverYearLayout = layout => {
    if (
        !(
            Array.isArray(layout[BASE_FIELD_YEARLY_SERIES]) &&
            typeof layout[BASE_FIELD_YEARLY_SERIES][0] === 'string'
        )
    ) {
        throw new Error(errorLabels.yearOverYear.seriesPeriod);
    }

    validateAxis(layout.rows, errorLabels.yearOverYear.categoryPeriod);

    validateAxis(layout.columns, errorLabels.yearOverYear.dx);
};

const validatePieLayout = layout => {
    validateAxis(layout.columns, errorLabels.defaultSeries);
    validateAxis(layout.filters, errorLabels.pie.filter);
    validateDimension(
        layoutGetDimension(layout, DIMENSION_ID_PERIOD),
        errorLabels.pie.pe
    );
};

const validateSingleValueLayout = layout => {
    validateAxis(layout.columns, errorLabels.singleValue.dx);
    validateDimension(
        layoutGetDimension(layout, DIMENSION_ID_PERIOD),
        errorLabels.singleValue.pe
    );
};

export const validateLayout = layout => {
    switch (layout.type) {
        case VIS_TYPE_PIE:
        case VIS_TYPE_GAUGE:
            return validatePieLayout(layout);
        case VIS_TYPE_YEAR_OVER_YEAR_COLUMN:
        case VIS_TYPE_YEAR_OVER_YEAR_LINE:
            return validateYearOverYearLayout(layout);
        case VIS_TYPE_SINGLE_VALUE:
            return validateSingleValueLayout(layout);
        default:
            return validateDefaultLayout(layout);
    }
};
