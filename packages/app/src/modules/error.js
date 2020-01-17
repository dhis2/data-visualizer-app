import i18n from '@dhis2/d2-i18n'
import {
    getDisplayNameByVisType,
    getAvailableAxes,
    getAxisName,
    getAxisPerLockedDimension,
    DIMENSION_ID_DATA,
} from '@dhis2/analytics'

import {
    EmptySeries,
    EmptyCategory,
    PeriodError,
    DataError,
    GenericError,
} from '../assets/ErrorIcons'

export class VisualizationError {
    constructor(icon, title, description) {
        this.icon = icon
        this.title = title
        this.description = description
    }
}

export class NoSeriesError extends VisualizationError {
    constructor() {
        super(
            EmptySeries,
            i18n.t('Series is empty'),
            i18n.t('Add at least one item to Series.')
        )
    }
}

export class NoCategoryError extends VisualizationError {
    constructor() {
        super(
            EmptyCategory,
            i18n.t('Category is empty'),
            i18n.t('Add at least one item to Category.')
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
                        ? getAxisName(lockedAxis)
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

export class AssignedCategoriesError extends VisualizationError {
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

const getAvailableAxesDescription = visType => {
    const axes = getAvailableAxes(visType)
    let axesDescription = ''
    for (let index = 0; index < axes.length; index++) {
        axesDescription += getAxisName(axes[index])
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
