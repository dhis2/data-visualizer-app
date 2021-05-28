import { isYearOverYear, DIMENSION_ID_PERIOD } from '@dhis2/analytics'

import { clickMenuBarUpdateButton } from './menuBar'
import { openDimension, selectYoyCategoryOption } from './layout'
import { selectRelativePeriods } from './dimensionModal/periodDimension'
import {
    clickDimensionModalUpdateButton,
    unselectAllItemsByButton,
} from './dimensionModal'

const loadingEl = 'dhis2-uicore-circularloader'

export const expectAppToNotBeLoading = () =>
    cy.getBySel(loadingEl).should('not.exist')

export const clickCheckbox = target =>
    cy.getBySel(target).click().find('[type="checkbox"]').should('be.checked')

export const typeInput = (target, text) =>
    cy.getBySel(target).find('input').type(text)

export const clearInput = target => cy.getBySel(target).find('input').clear()

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
        unselectAllItemsByButton()
        selectRelativePeriods([TEST_PERIOD], TEST_PERIOD_TYPE)
        clickDimensionModalUpdateButton()
    }
}
