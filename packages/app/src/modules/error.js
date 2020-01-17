import { EmptySeries, EmptyCategory, PeriodError } from '../assets/ErrorIcons'
import i18n from '@dhis2/d2-i18n'

import {
    getDisplayNameByVisType,
    getAvailableAxes,
    getAxisName,
} from '@dhis2/analytics'

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

const getAvailableAxesDescription = visType => {
    const availableAxes = getAvailableAxes(visType)
    let axesDescription = ''
    for (let index = 0; index < availableAxes.length; index++) {
        axesDescription += getAxisName(availableAxes[index])
        if (index < availableAxes.length - 2) {
            axesDescription += ', '
        } else if (index < availableAxes.length - 1) {
            axesDescription += ` ${i18n.t('or')} `
        }
    }
    return axesDescription
}

export const parseError = ({ message, httpStatusCode }) => ({
    message,
    type: String(httpStatusCode).match(/50\d/) ? 'error' : 'warning',
})
