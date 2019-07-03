import i18n from '@dhis2/d2-i18n';
import {
    AXIS,
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    FIXED_DIMENSIONS,
    dimensionIsValid,
    layoutGetDimension,
} from '@dhis2/analytics';

import {
    YEAR_OVER_YEAR_LINE,
    YEAR_OVER_YEAR_COLUMN,
    PIE,
    GAUGE,
} from './chartTypes';
import { BASE_FIELD_YEARLY_SERIES } from './fields/baseFields';
import { menuLabels } from './layout';

const dxName = FIXED_DIMENSIONS[DIMENSION_ID_DATA].name;

const errorLabels = {
    defaultSeries: i18n.t('Please add at least one {{series}} dimension', {
        series: menuLabels.columns,
    }),
    defaultCategory: i18n.t('Please add at least one {{category}} dimension', {
        category: menuLabels.rows,
    }),
    defaultPe: i18n.t(
        'Please add at least one period as {{series}}, {{category}} or {{filter}}',
        {
            series: menuLabels.columns,
            category: menuLabels.rows,
            filter: menuLabels.filters,
        }
    ),
    pie: {
        dx: i18n.t('Please add {{data}} as {{category}} or {{filter}}', {
            data: dxName,
            category: menuLabels.rows,
            filter: menuLabels.filters,
        }),
        pe: i18n.t(
            'Please add at least one period as {{series}} or {{filter}}',
            {
                series: menuLabels.columns,
                filter: menuLabels.filters,
            }
        ),
        filter: i18n.t('Please add at least one {{filter}} dimension', {
            filter: menuLabels.filters,
        }),
    },
    yearOverYear: {
        seriesPeriod: i18n.t(
            'Please add at least one period as a {{series}} dimension',
            {
                series: menuLabels.columns,
            }
        ),
        categoryPeriod: i18n.t(
            'Please add at least one period as a {{category}} dimension',
            {
                category: menuLabels.rows,
            }
        ),
        dx: i18n.t('Please add {{data}} as a filter dimension', {
            data: dxName,
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

export const validateLayout = layout => {
    switch (layout.type) {
        case PIE:
        case GAUGE:
            return validatePieLayout(layout);
        case YEAR_OVER_YEAR_COLUMN:
        case YEAR_OVER_YEAR_LINE:
            return validateYearOverYearLayout(layout);
        default:
            return validateDefaultLayout(layout);
    }
};
