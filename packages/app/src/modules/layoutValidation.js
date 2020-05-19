import isObject from 'lodash-es/isObject';
import i18n from '@dhis2/d2-i18n';

import {
    YEAR_OVER_YEAR_LINE,
    YEAR_OVER_YEAR_COLUMN,
    PIE,
    GAUGE,
} from './chartTypes';
import { BASE_FIELD_YEARLY_SERIES } from './fields/baseFields';
import { DIMENSION_ID_PROP_NAME, DIMENSION_ITEMS_PROP_NAME } from './layout';
import { FIXED_DIMENSIONS } from './fixedDimensions';

const peId = FIXED_DIMENSIONS.pe.id;

const SERIES_MISSING = 'SERIES_MISSING';
const CATEGORY_MISSING = 'CATEGORY_MISSING';
const PE_MISSING = 'PE_MISSING';
const PE_MISSING_ON_CATEGORY = 'PE_MISSING_ON_CATEGORY';
const PIE_PE_MISSING = 'PIE_PE_MISSING';
const PIE_FILTER_MISSING = 'PIE_FILTER_MISSING';
const YOY_PE_MISSING_ON_SERIES = 'YOY_PE_MISSING_ON_SERIES';
const YOY_DX_MISSING_ON_FILTER = 'YOY_DX_MISSING_ON_FILTER';

const getErrorMessage = key => {
    const series = i18n.t('series');
    const category = i18n.t('category');
    const filter = i18n.t('filter');
    const errorLabels = {
        [SERIES_MISSING]: i18n.t(
            'Please add at least one {{series}} dimension',
            {
                series,
            }
        ),
        [CATEGORY_MISSING]: i18n.t(
            'Please add at least one {{category}} dimension',
            {
                category,
            }
        ),
        [PE_MISSING]: i18n.t(
            'Please add at least one period as {{series}}, {{category}} or {{filter}}',
            {
                series,
                category,
                filter,
            }
        ),
        [PIE_PE_MISSING]: i18n.t(
            'Please add at least one period as {{series}} or {{filter}}',
            {
                series,
                filter,
            }
        ),
        [PIE_FILTER_MISSING]: i18n.t(
            'Please add at least one {{filter}} dimension',
            {
                filter,
            }
        ),
        YOY_PE_MISSING_ON_SERIES: i18n.t(
            'Please add at least one period as a {{series}} dimension',
            {
                series,
            }
        ),
        YOY_DX_MISSING_ON_FILTER: i18n.t(
            'Please add {{data}} as a filter dimension',
            {
                data: FIXED_DIMENSIONS.dx.name(),
            }
        ),
    };

    return errorLabels[key];
};

// Layout validation helper functions
const isItemValid = item =>
    Boolean(isObject(item) && typeof item.id === 'string');

const isDimensionValid = dim =>
    Boolean(
        isObject(dim) &&
            typeof dim[DIMENSION_ID_PROP_NAME] === 'string' &&
            Array.isArray(dim[DIMENSION_ITEMS_PROP_NAME]) &&
            isItemValid(dim[DIMENSION_ITEMS_PROP_NAME][0])
    );

const isAxisValid = axis =>
    Boolean(Array.isArray(axis) && isDimensionValid(axis[0]));

const validateDimension = (dimension, message) => {
    if (!(dimension && isDimensionValid(dimension))) {
        throw new Error(getErrorMessage(message));
    }
};

const validateAxis = (axis, message) => {
    if (!isAxisValid(axis)) {
        throw new Error(getErrorMessage(message));
    }
};

const findDimension = (layout, dimensionId) =>
    [...layout.columns, ...layout.rows, ...layout.filters].find(
        dim => dim.dimension === dimensionId
    );

// Layout validation
const validateDefaultLayout = layout => {
    validateAxis(layout.columns, SERIES_MISSING);
    validateAxis(layout.rows, CATEGORY_MISSING);
    validateDimension(findDimension(layout, peId), PE_MISSING);
};

const validateYearOverYearLayout = layout => {
    if (
        !(
            Array.isArray(layout[BASE_FIELD_YEARLY_SERIES]) &&
            typeof layout[BASE_FIELD_YEARLY_SERIES][0] === 'string'
        )
    ) {
        throw new Error(getErrorMessage(YOY_PE_MISSING_ON_SERIES));
    }

    validateAxis(layout.rows, PE_MISSING_ON_CATEGORY);
    validateAxis(layout.columns, YOY_DX_MISSING_ON_FILTER);
};

const validatePieLayout = layout => {
    validateAxis(layout.columns, SERIES_MISSING);
    validateAxis(layout.filters, PIE_FILTER_MISSING);
    validateDimension(findDimension(layout, peId), PIE_PE_MISSING);
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
