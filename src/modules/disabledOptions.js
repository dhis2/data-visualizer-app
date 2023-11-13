import { VIS_TYPE_PIVOT_TABLE } from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'

export const getDisabledOptions = ({ visType, options }) => {
    const disabledOptions = {}

    for (const [option, value] of Object.entries(options)) {
        switch (option) {
            case 'cumulativeValues': {
                const helpText = i18n.t(
                    'Not supported when using cumulative values'
                )

                // when checked, disabled totals and numberType options
                if (visType === VIS_TYPE_PIVOT_TABLE && value) {
                    disabledOptions.colTotals = {}
                    disabledOptions.colSubTotals = {}
                    disabledOptions.rowTotals = {}
                    disabledOptions.rowSubTotals = {}
                    disabledOptions.numberType = {
                        helpText,
                    }
                    disabledOptions.legend = {
                        helpText,
                    }
                }

                break
            }
        }
    }

    return disabledOptions
}
