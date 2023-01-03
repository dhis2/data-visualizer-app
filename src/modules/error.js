import {
    getDisplayNameByVisType,
    getAvailableAxes,
    getAxisNameByLayoutType,
    getLayoutTypeByVisType,
    getAxisPerLockedDimension,
    DIMENSION_ID_DATA,
    AXIS_ID_COLUMNS,
    AXIS_ID_ROWS,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import {
    EmptySeries,
    EmptyCategory,
    PeriodError,
    DataError,
    GenericError,
    EmptyBox,
} from '../assets/ErrorIcons.js'
import {
    VARIANT_ERROR,
    VARIANT_WARNING,
} from '../components/Snackbar/Snackbar.js'

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
                axisName: getAxisNameByLayoutType(
                    AXIS_ID_COLUMNS,
                    getLayoutTypeByVisType(visType)
                ),
            }),
            i18n.t('Add at least one item to {{axisName}}.', {
                axisName: getAxisNameByLayoutType(
                    AXIS_ID_COLUMNS,
                    getLayoutTypeByVisType(visType)
                ),
            })
        )
    }
}

export class NoCategoryError extends VisualizationError {
    constructor(visType) {
        super(
            EmptyCategory,
            i18n.t(`{{axisName}} is empty`, {
                axisName: getAxisNameByLayoutType(
                    AXIS_ID_ROWS,
                    getLayoutTypeByVisType(visType)
                ),
            }),
            i18n.t('Add at least one item to {{axisName}}.', {
                axisName: getAxisNameByLayoutType(
                    AXIS_ID_ROWS,
                    getLayoutTypeByVisType(visType)
                ),
            })
        )
    }
}

export class NoSeriesOrCategoryError extends VisualizationError {
    constructor(visType) {
        super(
            EmptyBox,
            i18n.t(`{{columnsAxisName}} and {{rowsAxisName}} are empty`, {
                columnsAxisName: getAxisNameByLayoutType(
                    AXIS_ID_COLUMNS,
                    getLayoutTypeByVisType(visType)
                ),
                rowsAxisName: getAxisNameByLayoutType(
                    AXIS_ID_ROWS,
                    getLayoutTypeByVisType(visType)
                ),
            }),
            i18n.t(
                'Add at least one item to {{columnsAxisName}} or {{rowsAxisName}} to create a {{visualizationType}}.',
                {
                    columnsAxisName: getAxisNameByLayoutType(
                        AXIS_ID_COLUMNS,
                        getLayoutTypeByVisType(visType)
                    ),
                    rowsAxisName: getAxisNameByLayoutType(
                        AXIS_ID_ROWS,
                        getLayoutTypeByVisType(visType)
                    ),
                    visualizationType: getDisplayNameByVisType(visType),
                }
            )
        )
    }
}

export class NoPeriodError extends VisualizationError {
    constructor(visType) {
        super(
            PeriodError,
            i18n.t('No period selected'),
            i18n.t(
                '{{visualizationType}} must have at least one period selected in {{axes}}.',
                {
                    visualizationType: getDisplayNameByVisType(visType),
                    axes: getAvailableAxesDescription(visType),
                }
            )
        )
    }
}

export class NoPointsError extends VisualizationError {
    constructor(visType) {
        super(
            EmptyBox,
            i18n.t(`{{axisName}} is empty`, {
                axisName: getAxisNameByLayoutType(
                    AXIS_ID_ROWS,
                    getLayoutTypeByVisType(visType)
                ),
            }),
            i18n.t('Add organisation units to {{axisName}}.', {
                axisName: getAxisNameByLayoutType(
                    AXIS_ID_ROWS,
                    getLayoutTypeByVisType(visType)
                ),
            })
        )
    }
}

export class NoVerticalError extends VisualizationError {
    constructor() {
        super(
            EmptyBox,
            i18n.t('Vertical is empty'),
            i18n.t('Add a data item to the vertical axis.')
        )
    }
}

export class NoHorizontalError extends VisualizationError {
    constructor() {
        super(
            EmptyBox,
            i18n.t('Horizontal is empty'),
            i18n.t('Add a data item to the horizontal axis.')
        )
    }
}

export class DuplicateItemsError extends VisualizationError {
    constructor() {
        super(
            DataError,
            i18n.t('Axes data items are the same'),
            i18n.t(
                'The horizontal and vertical axes have the same data item. Scatter chart axes must have different data for each axis.'
            )
        )
    }
}

export class NoDataOrDataElementGroupSetError extends VisualizationError {
    constructor(visType) {
        const lockedAxis = getAxisPerLockedDimension(visType, DIMENSION_ID_DATA)
        super(
            DataError,
            i18n.t('No data selected'),
            i18n.t(
                '{{visualizationType}} must have at least one data item or data element group set item in {{axes}}.',
                {
                    visualizationType: getDisplayNameByVisType(visType),
                    axes: lockedAxis
                        ? getAxisNameByLayoutType(
                              lockedAxis,
                              getLayoutTypeByVisType(visType)
                          )
                        : getAvailableAxesDescription(visType),
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
            i18n.t('No data selected'),
            i18n.t(
                '{{visualizationType}} must have at least one data item in {{axes}}.',
                {
                    visualizationType: getDisplayNameByVisType(visType),
                    axes: lockedAxis
                        ? getAxisNameByLayoutType(
                              lockedAxis,
                              getLayoutTypeByVisType(visType)
                          )
                        : getAvailableAxesDescription(visType),
                }
            )
        )
    }
}

export class MultipleIndicatorAsFilterError extends VisualizationError {
    constructor() {
        super(
            DataError,
            i18n.t("There's a problem with the layout"),
            i18n.t(
                'A single indicator must be the only data item when using indicators as Data in Filter.'
            )
        )
    }
}

export class CombinationDEGSRRError extends VisualizationError {
    constructor() {
        super(
            DataError,
            genericErrorTitle,
            i18n.t(
                'Data Element Group Sets and Reporting Rates cannot be used together.'
            )
        )
    }
}

export class GenericClientError extends VisualizationError {
    constructor(visType) {
        super(
            GenericError,
            genericErrorTitle,
            i18n.t(
                'There is a problem with this {{visualizationType}} visualization.',
                {
                    visualizationType: getDisplayNameByVisType(visType),
                }
            )
        )
    }
}

export class GenericServerError extends VisualizationError {
    constructor() {
        super(
            GenericError,
            genericErrorTitle,
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

export class VisualizationNotFoundError extends VisualizationError {
    constructor() {
        super(
            GenericError,
            i18n.t('Visualization not found'),
            i18n.t(
                'The visualization you are trying to view could not be found, the ID could be incorrect or it could have been deleted.'
            )
        )
    }
}

export class NoOrgUnitResponseError extends VisualizationError {
    constructor() {
        super(
            EmptyBox,
            i18n.t('No organization units found'),
            i18n.t(
                "The level or group selections didn't return any organization units."
            )
        )
    }
}

export class ValueTypeError extends VisualizationError {
    constructor() {
        super(
            DataError,
            i18n.t('Invalid data type'),
            i18n.t(
                "The selected data dimensions didn't return any valid data. This visualization type can only display numerical data."
            )
        )
    }
}

export const genericErrorTitle = i18n.t('Something went wrong')

const getAvailableAxesDescription = (visType) => {
    const axes = getAvailableAxes(visType)
    let axesDescription = ''
    for (let index = 0; index < axes.length; index++) {
        axesDescription += getAxisNameByLayoutType(
            axes[index],
            getLayoutTypeByVisType(visType)
        )
        if (index < axes.length - 2) {
            axesDescription += ', '
        } else if (index < axes.length - 1) {
            axesDescription += ` ${i18n.t('or')} `
        }
    }
    return axesDescription
}

export const getErrorVariantByStatusCode = (statusCode) =>
    String(statusCode).match(/50\d/) ? VARIANT_ERROR : VARIANT_WARNING
