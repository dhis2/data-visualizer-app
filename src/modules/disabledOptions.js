import { VIS_TYPE_PIVOT_TABLE } from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import {
    OPTION_COL_SUB_TOTALS,
    OPTION_COL_TOTALS,
    OPTION_CUMULATIVE_VALUES,
    OPTION_LEGEND,
    OPTION_NUMBER_TYPE,
    OPTION_ROW_SUB_TOTALS,
    OPTION_ROW_TOTALS,
} from './options.js'

export const getDisabledOptions = ({ visType, options }) => {
    const disabledOptions = {}

    for (const [option, value] of Object.entries(options)) {
        switch (option) {
            case OPTION_CUMULATIVE_VALUES: {
                const helpText = i18n.t(
                    'Not supported when using cumulative values'
                )

                // when checked, disabled totals and numberType options
                if (visType === VIS_TYPE_PIVOT_TABLE && value) {
                    disabledOptions[OPTION_COL_TOTALS] = {}
                    disabledOptions[OPTION_COL_SUB_TOTALS] = {}
                    disabledOptions[OPTION_ROW_TOTALS] = {}
                    disabledOptions[OPTION_ROW_SUB_TOTALS] = {}
                    disabledOptions[OPTION_NUMBER_TYPE] = {
                        helpText,
                    }
                    disabledOptions[OPTION_LEGEND] = {
                        helpText,
                    }
                }

                break
            }
        }
    }

    return disabledOptions
}
