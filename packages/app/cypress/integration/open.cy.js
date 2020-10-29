import { openSavedAO } from '../elements/FileMenu'
import {
    expectChartTitleToBeValue,
    expectChartToBeVisible,
} from '../elements/Chart'
import { expectStartScreenToBeVisible } from '../elements/StartScreen'

describe('open', () => {
    it('goes to DV', () => {
        cy.visit('')
        expectStartScreenToBeVisible()
    })
    it('loads a saved AO', () => {
        const AOName = 'ANC: 1-3 dropout rate Yearly'

        openSavedAO(AOName)

        expectChartTitleToBeValue(AOName)

        expectChartToBeVisible()
    })
})
