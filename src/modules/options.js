import { COLOR_SET_DEFAULT } from '@dhis2/analytics'
import pick from 'lodash-es/pick'

export const OPTION_AGGREGATION_TYPE = 'aggregationType'
export const OPTION_APPROVAL_LEVEL = 'approvalLevel'
export const OPTION_AXES = 'axes'
export const OPTION_COL_SUB_TOTALS = 'colSubTotals'
export const OPTION_COL_TOTALS = 'colTotals'
export const OPTION_COLOR_SET = 'colorSet'
export const OPTION_COMPLETED_ONLY = 'completedOnly'
export const OPTION_CUMULATIVE = 'cumulative'
export const OPTION_CUMULATIVE_VALUES = 'cumulativeValues'
export const OPTION_DIGIT_GROUP_SEPARATOR = 'digitGroupSeparator'
export const OPTION_DISPLAY_DENSITY = 'displayDensity'
export const OPTION_EMPTY_COLUMNS = 'hideEmptyColumns'
export const OPTION_EMPTY_ROW_ITEMS = 'hideEmptyRowItems'
export const OPTION_EMPTY_ROWS = 'hideEmptyRows'
export const OPTION_FIX_COLUMN_HEADERS = 'fixColumnHeaders'
export const OPTION_FIX_ROW_HEADERS = 'fixRowHeaders'
export const OPTION_FONT_SIZE = 'fontSize'
export const OPTION_FONT_STYLE = 'fontStyle'
export const OPTION_GRAND_PARENT_ORGANISATION_UNIT =
    'grandParentOrganisationUnit'
export const OPTION_HIDE_EMPTY_COLUMNS = 'hideEmptyColumns'
export const OPTION_HIDE_EMPTY_ROWS = 'hideEmptyRows'
export const OPTION_HIDE_EMPTY_ROW_ITEMS = 'hideEmptyRowItems'
export const OPTION_HIDE_SUBTITLE = 'hideSubtitle'
export const OPTION_HIDE_TITLE = 'hideTitle'
export const OPTION_ICONS = 'icons'
export const OPTION_LEGEND = 'legend'
export const OPTION_MEASURE_CRITERIA = 'measureCriteria'
export const OPTION_NO_SPACE_BETWEEN_COLUMNS = 'noSpaceBetweenColumns'
export const OPTION_NUMBER_TYPE = 'numberType'
export const OPTION_ORGANISATION_UNIT = 'organisationUnit'
export const OPTION_OUTLIER_ANALYSIS = 'outlierAnalysis'
export const OPTION_PARENT_ORGANISATION_UNIT = 'parentOrganisationUnit'
export const OPTION_PERCENT_STACKED_VALUES = 'percentStackedValues'
export const OPTION_REGRESSION = 'regression'
export const OPTION_REGRESSION_TYPE = 'regressionType'
export const OPTION_REPORTING_PERIOD = 'reportingPeriod'
export const OPTION_ROW_SUB_TOTALS = 'rowSubTotals'
export const OPTION_ROW_TOTALS = 'rowTotals'
export const OPTION_SERIES = 'series'
export const OPTION_SERIES_KEY = 'seriesKey'
export const OPTION_SHOW_DATA = 'showData'
export const OPTION_SHOW_DIMENSION_LABELS = 'showDimensionLabels'
export const OPTION_SHOW_HIERARCHY = 'showHierarchy'
export const OPTION_SKIP_ROUNDING = 'skipRounding'
export const OPTION_SORT_ORDER = 'sortOrder'
export const OPTION_SUBTITLE = 'subtitle'
export const OPTION_TITLE = 'title'
export const OPTION_TOP_LIMIT = 'topLimit'

export const OPTION_SHOW_SERIES_KEY = 'showSeriesKey'
export const OPTION_SHOW_LEGEND_KEY = 'showLegendKey'
export const OPTION_AXIS_STEPS = 'steps'
export const OPTION_AXIS_DECIMALS = 'decimals'
export const OPTION_AXIS_MAX_VALUE = 'maxValue'
export const OPTION_AXIS_MIN_VALUE = 'minValue'
export const OPTION_AXIS_TITLE = 'axisTitle'
export const OPTION_AXIS_TITLE_TEXT_MODE = 'axisTitleTextMode'
export const OPTION_BASE_LINE_ENABLED = 'baseLineEnabled'
export const OPTION_BASE_LINE_TITLE = 'baseLineTitle'
export const OPTION_BASE_LINE_VALUE = 'baseLineValue'
export const OPTION_BASE_LINE_TITLE_FONT_STYLE = 'baseLineTitleFontStyle'
export const OPTION_TARGET_LINE_ENABLED = 'targetLineEnabled'
export const OPTION_TARGET_LINE_TITLE = 'targetLineTitle'
export const OPTION_TARGET_LINE_VALUE = 'targetLineValue'
export const OPTION_TARGET_LINE_TITLE_FONT_STYLE = 'targetLineTitleFontStyle'
export const OPTION_LEGEND_DISPLAY_STRATEGY = 'legendDisplayStrategy'
export const OPTION_LEGEND_DISPLAY_STYLE = 'legendDisplayStyle'
export const OPTION_LEGEND_SET = 'legendSet'

export const DISPLAY_DENSITY_COMFORTABLE = 'COMFORTABLE'
export const DISPLAY_DENSITY_NORMAL = 'NORMAL'
export const DISPLAY_DENSITY_COMPACT = 'COMPACT'
export const FONT_SIZE_LARGE = 'LARGE'
export const FONT_SIZE_NORMAL = 'NORMAL'
export const FONT_SIZE_SMALL = 'SMALL'

export const options = {
    [OPTION_AXES]: { requestable: false, savable: true, defaultValue: [] },
    [OPTION_COLOR_SET]: {
        defaultValue: COLOR_SET_DEFAULT,
        requestable: false,
        savable: true,
    },
    [OPTION_CUMULATIVE_VALUES]: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    [OPTION_HIDE_EMPTY_ROW_ITEMS]: {
        defaultValue: 'NONE',
        requestable: false,
        savable: true,
    },
    [OPTION_SERIES_KEY]: {
        defaultValue: {},
        requestable: false,
        savable: true,
    },
    [OPTION_LEGEND]: {
        defaultValue: {},
        requestable: false,
        savable: true,
    },
    [OPTION_NO_SPACE_BETWEEN_COLUMNS]: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    [OPTION_PERCENT_STACKED_VALUES]: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    [OPTION_REGRESSION_TYPE]: {
        defaultValue: 'NONE',
        requestable: false,
        savable: true,
    },
    [OPTION_SHOW_DATA]: {
        defaultValue: true,
        requestable: false,
        savable: true,
    },
    [OPTION_AGGREGATION_TYPE]: {
        defaultValue: 'DEFAULT',
        requestable: true,
        savable: true,
    },
    [OPTION_COMPLETED_ONLY]: {
        defaultValue: false,
        requestable: true,
        savable: true,
    },
    [OPTION_HIDE_SUBTITLE]: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    [OPTION_HIDE_TITLE]: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    [OPTION_SORT_ORDER]: {
        defaultValue: '0',
        requestable: false,
        savable: true,
    },
    [OPTION_SUBTITLE]: {
        defaultValue: undefined,
        requestable: false,
        savable: true,
    },
    [OPTION_TITLE]: {
        defaultValue: undefined,
        requestable: false,
        savable: true,
    },
    [OPTION_SERIES]: { defaultValue: [], requestable: false, savable: true },
    [OPTION_FONT_STYLE]: {
        defaultValue: {},
        requestable: false,
        savable: true,
    },
    [OPTION_OUTLIER_ANALYSIS]: {
        requestable: false,
        savable: true,
        defaultValue: null,
    },

    // only for SV
    [OPTION_ICONS]: { defaultValue: false, requestable: false, savable: true },

    // only for PT
    [OPTION_COL_TOTALS]: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    [OPTION_ROW_TOTALS]: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    [OPTION_COL_SUB_TOTALS]: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    [OPTION_ROW_SUB_TOTALS]: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    [OPTION_SHOW_DIMENSION_LABELS]: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    [OPTION_HIDE_EMPTY_COLUMNS]: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    [OPTION_HIDE_EMPTY_ROWS]: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    [OPTION_SKIP_ROUNDING]: {
        defaultValue: false,
        requestable: true,
        savable: true,
    },
    [OPTION_NUMBER_TYPE]: {
        defaultValue: 'VALUE',
        requestable: false,
        savable: true,
    },
    [OPTION_SHOW_HIERARCHY]: {
        defaultValue: false,
        requestable: true,
        savable: true,
    },
    [OPTION_DISPLAY_DENSITY]: {
        defaultValue: DISPLAY_DENSITY_NORMAL,
        requestable: false,
        savable: true,
    },
    [OPTION_FONT_SIZE]: {
        defaultValue: FONT_SIZE_NORMAL,
        requestable: false,
        savable: true,
    },
    [OPTION_DIGIT_GROUP_SEPARATOR]: {
        defaultValue: 'SPACE',
        requestable: false,
        savable: true,
    },
    [OPTION_APPROVAL_LEVEL]: {
        defaultValue: undefined,
        requestable: true,
        savable: false,
    },
    [OPTION_FIX_COLUMN_HEADERS]: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    [OPTION_FIX_ROW_HEADERS]: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },

    // these are stored in the AO under reportingParams
    [OPTION_REPORTING_PERIOD]: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    [OPTION_ORGANISATION_UNIT]: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    [OPTION_PARENT_ORGANISATION_UNIT]: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    // not exposed in UI
    [OPTION_GRAND_PARENT_ORGANISATION_UNIT]: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    [OPTION_REGRESSION]: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    [OPTION_CUMULATIVE]: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    [OPTION_MEASURE_CRITERIA]: {
        defaultValue: undefined,
        requestable: true,
        savable: true,
    },
    [OPTION_TOP_LIMIT]: {
        defaultValue: '0',
        requestable: false,
        savable: true,
    },
}

export default options

export const getOptionsForUi = () => {
    return Object.entries({ ...options }).reduce((map, [option, props]) => {
        map[option] = props.defaultValue
        return map
    }, {})
}

export const getOptionsForRequest = () => {
    return Object.entries(options).filter(
        (entry) => entry[1].requestable // entry = [option, props]
    )
}

export const getOptionsFromVisualization = (visualization) => {
    const optionsFromVisualization = {
        ...getOptionsForUi(),
        ...pick(visualization, Object.keys(options)),
    }

    // XXX only in app
    optionsFromVisualization[OPTION_AXES] = optionsFromVisualization[
        OPTION_AXES
    ].map((axis) => {
        if (axis.targetLine || axis.baseLine) {
            const clonedAxis = { ...axis }
            if (clonedAxis.targetLine) {
                clonedAxis.targetLine = {
                    ...clonedAxis.targetLine,
                    enabled: true,
                }
            }
            if (clonedAxis.baseLine) {
                clonedAxis.baseLine = {
                    ...clonedAxis.baseLine,
                    enabled: true,
                }
            }
            return clonedAxis
        } else {
            return axis
        }
    })

    // if array has at least one element, convert into boolean
    optionsFromVisualization[OPTION_ICONS] = Boolean(
        visualization[OPTION_ICONS]?.length
    )

    // nested options under reportingParams
    if (visualization.reportingParams) {
        optionsFromVisualization[OPTION_ORGANISATION_UNIT] =
            visualization.reportingParams[OPTION_ORGANISATION_UNIT]
        optionsFromVisualization[OPTION_REPORTING_PERIOD] =
            visualization.reportingParams[OPTION_REPORTING_PERIOD]
        optionsFromVisualization[OPTION_PARENT_ORGANISATION_UNIT] =
            optionsFromVisualization[OPTION_GRAND_PARENT_ORGANISATION_UNIT] =
                visualization.reportingParams[OPTION_PARENT_ORGANISATION_UNIT]
        visualization.reportingParams[OPTION_GRAND_PARENT_ORGANISATION_UNIT]
    }

    // cast option values from Number for some options
    Array(OPTION_SORT_ORDER, OPTION_TOP_LIMIT).forEach((option) => {
        if (Object.prototype.hasOwnProperty.call(visualization, option)) {
            optionsFromVisualization[option] = String(visualization[option])
        }
    })

    return optionsFromVisualization
}
