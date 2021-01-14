import { isYearOverYear, DIMENSION_ID_PERIOD } from '@dhis2/analytics'

import { clickMenuBarUpdateButton } from './menuBar'
import { openDimension, selectYoyCategoryOption } from './layout'
import {
    removeAllPeriodItems,
    selectRelativePeriods,
} from './dimensionModal/periodDimension'
import { clickDimensionModalUpdateButton } from './dimensionModal'

export const replacePeriodItems = (
    visType,
    options = { useAltData: false }
) => {
    const useAltData = options.useAltData
    if (isYearOverYear(visType)) {
        const TEST_PERIOD = !useAltData
            ? 'Last 2 six-months'
            : 'Quarters per year'
        selectYoyCategoryOption(TEST_PERIOD)
        clickMenuBarUpdateButton()
    } else {
        const TEST_PERIOD_TYPE = !useAltData ? 'Six-months' : 'Quarters'
        const TEST_PERIOD = !useAltData
            ? 'Last 2 six-month'
            : 'Quarters this year'
        openDimension(DIMENSION_ID_PERIOD)
        removeAllPeriodItems()
        selectRelativePeriods([TEST_PERIOD], TEST_PERIOD_TYPE)
        clickDimensionModalUpdateButton()
    }
}
