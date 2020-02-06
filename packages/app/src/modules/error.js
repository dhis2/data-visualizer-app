import i18n from '@dhis2/d2-i18n'
import {
    getDisplayNameByVisType,
    getAvailableAxes,
    getAxisNameByVisType,
    getAxisPerLockedDimension,
    DIMENSION_ID_DATA,
    AXIS_ID_COLUMNS,
    AXIS_ID_ROWS,
} from '@dhis2/analytics'

import {
    EmptySeries,
    EmptyCategory,
    PeriodError,
    DataError,
    GenericError,
    EmptyBox,
} from '../assets/ErrorIcons'

export class VisualizationError {
    constructor(icon, title, description) {
        this.icon = icon
        this.title = title
        this.description = description
    }
}

export class EmptyResponseError extends VisualizationError {
    constructor() {
        super(
            EmptyBox,
            i18n.t('No data available'),
            i18n.t(
                'The selected dimensions didn’t return any data. There may be no data, or you may not have access to it.'
            )
        )
    }
}

export class NoSeriesError extends VisualizationError {
    constructor(visType) {
        super(
            EmptySeries,
            i18n.t(`{{axisName}} is empty`, {
                axisName: getAxisNameByVisType(AXIS_ID_COLUMNS, visType),
            }),
            i18n.t('Add at least one item to {{axisName}}.', {
                axisName: getAxisNameByVisType(AXIS_ID_COLUMNS, visType),
            })
        )
    }
}

export class NoCategoryError extends VisualizationError {
    constructor(visType) {
        super(
            EmptyCategory,
            i18n.t(`{{axisName}} is empty`, {
                axisName: getAxisNameByVisType(AXIS_ID_ROWS, visType),
            }),
            i18n.t('Add at least one item to {{axisName}}.', {
                axisName: getAxisNameByVisType(AXIS_ID_ROWS, visType),
            })
        )
    }
}

export class NoPeriodError extends VisualizationError {
    constructor(visType) {
        super(
            PeriodError,
            i18n.t('No period set'),
            i18n.t(
                '{{visType}} must have at least one period set in {{axes}}.',
                {
                    visType: getDisplayNameByVisType(visType),
                    axes: getAvailableAxesDescription(visType),
                }
            )
        )
    }
}

export class NoDataError extends VisualizationError {
    constructor(visType) {
        const lockedAxis = getAxisPerLockedDimension(visType, DIMENSION_ID_DATA)
        super(
            DataError,
            i18n.t('No data set'),
            i18n.t(
                '{{visType}} must have at least one data item in {{axes}}.',
                {
                    visType: getDisplayNameByVisType(visType),
                    axes: lockedAxis
                        ? getAxisNameByVisType(lockedAxis, visType)
                        : getAvailableAxesDescription(visType),
                }
            )
        )
    }
}

export class GenericClientError extends VisualizationError {
    constructor(visType) {
        super(
            GenericError,
            i18n.t('Something went wrong'),
            i18n.t('There is a problem with this {{visType}} visualization.', {
                visType: getDisplayNameByVisType(visType),
            })
        )
    }
}

export class GenericServerError extends VisualizationError {
    constructor() {
        super(
            GenericError,
            i18n.t('Something went wrong'),
            i18n.t('There was a problem getting the data from the server.')
        )
    }
}

export class AssignedCategoriesDataElementsError extends VisualizationError {
    constructor() {
        super(
            GenericError,
            i18n.t('Assigned Categories can only be used with data elements'),
            i18n.t(
                'Fix this problem by selecting data elements or removing Assigned Categories.'
            )
        )
    }
}

export class AssignedCategoriesAsFilterError extends VisualizationError {
    constructor() {
        super(
            GenericError,
            i18n.t('Assigned Categories cannot be used as Filter'),
            i18n.t(
                'Fix this problem by moving or removing Assigned Categories.'
            )
        )
    }
}

const getAvailableAxesDescription = visType => {
    const axes = getAvailableAxes(visType)
    let axesDescription = ''
    for (let index = 0; index < axes.length; index++) {
        axesDescription += getAxisNameByVisType(axes[index], visType)
        if (index < axes.length - 2) {
            axesDescription += ', '
        } else if (index < axes.length - 1) {
            axesDescription += ` ${i18n.t('or')} `
        }
    }
    return axesDescription
}

export const parseError = ({ message, httpStatusCode }) => ({
    message,
    type: String(httpStatusCode).match(/50\d/) ? 'error' : 'warning',
})
