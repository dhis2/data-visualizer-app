import i18n from '@dhis2/d2-i18n';
import {
    AXIS,
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    FIXED_DIMENSIONS,
    dimensionIsValid,
    layoutGetDimension,
    AXIS_NAME_COLUMNS,
    AXIS_NAME_ROWS,
    AXIS_NAME_FILTERS,
} from '@dhis2/analytics';

import {
    YEAR_OVER_YEAR_LINE,
    YEAR_OVER_YEAR_COLUMN,
    PIE,
    GAUGE,
    SINGLE_VALUE,
} from './chartTypes';
import { BASE_FIELD_YEARLY_SERIES } from './fields/baseFields';
import { getMenuLabel } from './layout';

const getErrorMessage = key => {
    console.log('here', getMenuLabel(AXIS_NAME_COLUMNS));
    const filterMenuLabel = getMenuLabel(AXIS_NAME_FILTERS);
    const rowMenuLabel = getMenuLabel(AXIS_NAME_ROWS);
    const columnMenuLabel = getMenuLabel(AXIS_NAME_COLUMNS);

    const errorLabels = {
        defaultSeries: i18n.t('Please add at least one {{series}} dimension', {
            series: columnMenuLabel,
        }),
        defaultCategory: i18n.t(
            'Please add at least one {{category}} dimension',
            {
                category: rowMenuLabel,
            }
        ),
        defaultPe: i18n.t(
            'Please add at least one period as {{series}}, {{category}} or {{filter}}',
            {
                series: columnMenuLabel,
                category: rowMenuLabel,
                filter: filterMenuLabel,
            }
        ),
        pieDx: i18n.t('Please add {{data}} as {{category}} or {{filter}}', {
            data: FIXED_DIMENSIONS[DIMENSION_ID_DATA].name(),
            category: rowMenuLabel,
            filter: filterMenuLabel,
        }),
        piePe: i18n.t(
            'Please add at least one period as {{series}} or {{filter}}',
            {
                series: columnMenuLabel,
                filter: filterMenuLabel,
            }
        ),
        pieFilter: i18n.t('Please add at least one {{filter}} dimension', {
            filter: filterMenuLabel,
        }),
        yoySeriesPeriod: i18n.t(
            'Please add at least one period as a {{series}} dimension',
            {
                series: columnMenuLabel,
            }
        ),
        yoyCategoryPeriod: i18n.t(
            'Please add at least one period as a {{category}} dimension',
            {
                category: rowMenuLabel,
            }
        ),
        yoyDx: i18n.t('Please add {{data}} as a filter dimension', {
            data: FIXED_DIMENSIONS[DIMENSION_ID_DATA].name(),
        }),
        singleValueDx: i18n.t('Please add one {{series}} dimension', {
            series: columnMenuLabel,
        }),
        singleValuePe: i18n.t('Please add at least one period as {{filter}}', {
            filter: filterMenuLabel,
        }),
    };

    return errorLabels[key];
};

// Layout validation helper functions
const isAxisValid = axis =>
    AXIS.isValid(axis) && dimensionIsValid(axis[0], { requireItems: true });

const validateDimension = (dimension, message) => {
    if (!(dimension && dimensionIsValid(dimension, { requireItems: true }))) {
        throw new Error(getErrorMessage(message));
    }
};

const validateAxis = (axis, message) => {
    if (!isAxisValid(axis)) {
        throw new Error(getErrorMessage(message));
    }
};

// Layout validation
const validateDefaultLayout = layout => {
    validateAxis(layout.columns, 'defaultSeries');
    validateAxis(layout.rows, 'defaultCategory');
    validateDimension(
        layoutGetDimension(layout, DIMENSION_ID_PERIOD),
        'defaultPe'
    );
};

const validateYearOverYearLayout = layout => {
    if (
        !(
            Array.isArray(layout[BASE_FIELD_YEARLY_SERIES]) &&
            typeof layout[BASE_FIELD_YEARLY_SERIES][0] === 'string'
        )
    ) {
        throw new Error(getErrorMessage('yoySeriesPeriod'));
    }

    validateAxis(layout.rows, 'yoyCategoryPeriod');

    validateAxis(layout.columns, 'yoyDx');
};

const validatePieLayout = layout => {
    validateAxis(layout.columns, 'defaultSeries');
    validateAxis(layout.filters, 'pieFilter');
    validateDimension(layoutGetDimension(layout, DIMENSION_ID_PERIOD), 'piePe');
};

const validateSingleValueLayout = layout => {
    validateAxis(layout.columns, 'singleValueDx');
    validateDimension(
        layoutGetDimension(layout, DIMENSION_ID_PERIOD),
        'singleValuePe'
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
        case SINGLE_VALUE:
            return validateSingleValueLayout(layout);
        default:
            return validateDefaultLayout(layout);
    }
};
