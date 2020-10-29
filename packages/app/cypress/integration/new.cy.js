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
import { visTypes } from '../utils/visTypes'

const dimensionName = 'Data'
const indicators = ['ANC 3 Coverage', 'ANC IPT 2 Coverage']

describe('new AO', () => {
    it('goes to DV', () => {
        cy.visit('')
        expectStartScreenToBeVisible()
    })
    const availableVisTypes = visTypes.slice(1, 3)
    availableVisTypes.forEach(visType => {
        describe(visType, () => {
            it('creates a new AO', () => {
                createNewAO()
                expectStoreCurrentToBeEmpty()
                expectChartToNotBeVisible()

                expectStartScreenToBeVisible()
                expectVisTypeToBeDefault()
            })
            it('changes vis type', () => {
                changeVisType(visType)
            })
            it('adds dimensions', () => {
                openDimension(dimensionName)
                indicators.forEach(indicator => selectIndicator(indicator))

                clickUpdate()

                expectChartToBeVisible()

                expectStoreCurrentToHaveColumnsLength(1)

                expectChartTitleToBeUnsaved()

                indicators.forEach(indicator =>
                    expectLegendToContainItem(indicator)
                )
            })
        })
    })
})
