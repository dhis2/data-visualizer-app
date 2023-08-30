import { VIS_TYPE_PIVOT_TABLE } from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'

export const getDisabledOptions = ({ visType, options }) => {
    const disabledOptions = {}

    for (const [option, value] of Object.entries(options)) {
        switch (option) {
            case 'cumulativeValues': {
                // when checked, disabled totals and numberType options
                if (visType === VIS_TYPE_PIVOT_TABLE && value) {
                    disabledOptions.colTotals = {}
                    disabledOptions.colSubTotals = {}
                    disabledOptions.rowTotals = {}
                    disabledOptions.rowSubTotals = {}
                    disabledOptions.numberType = {
                        helpText: i18n.t(
                            'not available when cumulative values is enabled TODO'
                        ),
                    }
                } else {
                    ;[
                        'colTotals',
                        'colSubTotals',
                        'rowTotals',
                        'rowSubTotals',
                        'numberType',
                    ].forEach((option) => delete disabledOptions[option])
                }

                break
            }
        }
    }

    return disabledOptions
}
