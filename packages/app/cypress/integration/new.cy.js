import { createNewAO } from '../elements/FileMenu'
import { openDimension } from '../elements/DimensionsPanel'
import { selectIndicator, clickUpdate } from '../elements/DimensionsModal'
import {
    changeVisType,
    expectVisTypeToBeDefault,
} from '../elements/VisualizationTypeSelector'
import { expectStartScreenToBeVisible } from '../elements/StartScreen'
import {
    expectStoreCurrentToBeEmpty,
    expectStoreCurrentToHaveColumnsLength,
} from '../utils/store'
import {
    expectChartTitleToBeUnsaved,
    expectChartToBeVisible,
    expectChartToNotBeVisible,
    expectLegendToContainItem,
} from '../elements/Chart'

const dimensionName = 'Data'
const indicators = ['ANC 3 Coverage', 'ANC IPT 2 Coverage']
const visType = 'Stacked bar'

describe('new AO', () => {
    it('goes to DV', () => {
        cy.visit('')
        expectStartScreenToBeVisible()
    })
    it('creates a new AO', () => {
        createNewAO()
        expectStoreCurrentToBeEmpty()
        expectChartToNotBeVisible()

        expectStartScreenToBeVisible()
        expectVisTypeToBeDefault()
    })
    it('changes vis type', () => {
        changeVisType(visType)
        // TODO: Make the test dynamic so it can be looped through and run for all vis types
    })
    it('adds dimensions', () => {
        openDimension(dimensionName)
        indicators.forEach(indicator => selectIndicator(indicator))

        clickUpdate()

        expectChartToBeVisible()

        expectStoreCurrentToHaveColumnsLength(1)

        expectChartTitleToBeUnsaved()

        indicators.forEach(indicator => expectLegendToContainItem(indicator))
    })
})
