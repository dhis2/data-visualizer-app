//import { createNewAO } from '../elements/FileMenu'
import { openDimension } from '../elements/DimensionsPanel'
import { selectDataElements, clickUpdate } from '../elements/DimensionsModal'
import {
    changeVisType,
    expectVisTypeToBeDefault,
} from '../elements/VisualizationTypeSelector'
import { expectStartScreenToBeVisible } from '../elements/StartScreen'
import {
    expectStoreCurrentToBeEmpty,
    expectStoreCurrentColumnsToHaveLength,
} from '../utils/store'
import {
    expectChartTitleToBeUnsaved,
    expectVisualizationToBeVisible,
    expectVisualizationToNotBeVisible,
    expectChartToContainDimensionItem,
} from '../elements/Chart'
import { visTypes } from '../utils/visTypes'
import {
    AXIS_ID_COLUMNS,
    DIMENSION_ID_DATA,
    getAxisMaxNumberOfItems,
    isYearOverYear,
    visTypeDisplayNames,
} from '@dhis2/analytics'

const dimensionId = DIMENSION_ID_DATA
const axisId = AXIS_ID_COLUMNS
const dataItems = ['ANC 2nd visit', 'All other new']

describe('new AO', () => {
    it('goes to DV', () => {
        cy.visit('')
        expectStartScreenToBeVisible()
    })
    const availableVisTypes = visTypes
    availableVisTypes.forEach(visType => {
        const columnsMaxNumberOfItems = getAxisMaxNumberOfItems(visType, axisId)
        const visTypeName = visTypeDisplayNames[visType]
        describe(visTypeName, () => {
            it('creates a new AO', () => {
                //createNewAO()
                cy.visit('') // FIXME: Use visit since the "New" button is currently broken
                expectStoreCurrentToBeEmpty()
                expectVisualizationToNotBeVisible()

                expectStartScreenToBeVisible()
                expectVisTypeToBeDefault()
            })
            it('changes vis type', () => {
                changeVisType(visTypeName)
            })
            it('adds dimensions', () => {
                openDimension(dimensionId)

                if (columnsMaxNumberOfItems === 1) {
                    // Gauge and SV can only have 1 data item
                    dataItems.splice(1)
                }

                selectDataElements(dataItems)

                clickUpdate()

                expectVisualizationToBeVisible(visType)

                !isYearOverYear(visType)
                    ? expectStoreCurrentColumnsToHaveLength(1)
                    : expectChartTitleToBeUnsaved()

                // TODO: PT, Pie, Gauge, SV needs another way of checking that the indicators were added
                dataItems.forEach(item =>
                    expectChartToContainDimensionItem(visType, item)
                )
            })
        })
    })
})
