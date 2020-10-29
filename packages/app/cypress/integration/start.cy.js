import { expectChartToNotBeVisible } from '../elements/Chart'
import {
    expectMostViewedToBeVisible,
    expectMostViewedToHaveItems,
    expectStartScreenToBeVisible,
} from '../elements/StartScreen'
import { expectVisTypeToBeDefault } from '../elements/VisualizationTypeSelector'
import { expectWindowTitleToBeDefault } from '../elements/Window'
import { expectStoreCurrentToBeEmpty } from '../utils/store'

describe('start screen', () => {
    it('goes to DV', () => {
        cy.visit('')
        expectStartScreenToBeVisible()
    })
    it('window has a title', () => {
        expectWindowTitleToBeDefault()
    })
    it('store is empty', () => {
        expectStoreCurrentToBeEmpty()
    })
    it('no chart is visible', () => {
        expectChartToNotBeVisible()
    })
    it('displays most viewed section', () => {
        expectMostViewedToBeVisible()
        expectMostViewedToHaveItems()
    })
    it('vis type is default', () => {
        expectVisTypeToBeDefault()
    })
})
