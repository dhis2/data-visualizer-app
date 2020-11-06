//import { createNewAO } from '../elements/FileMenu'
import { openDimension } from '../elements/DimensionsPanel'
import {
    selectDataElements,
    clickModalUpdateButton,
} from '../elements/DimensionModal'
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
    expectAOTitleToBeUnsaved,
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
import { TEST_DATA_ELEMENTS } from '../utils/data'

const dimensionId = DIMENSION_ID_DATA
const axisId = AXIS_ID_COLUMNS
const dataElements = TEST_DATA_ELEMENTS.slice(0, 2).map(item => item.name)

describe('creating a new AO', () => {
    it('navigates to the start page', () => {
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
                    dataElements.splice(1)
                }

                selectDataElements(dataElements)

                clickModalUpdateButton()

                expectVisualizationToBeVisible(visType)

                !isYearOverYear(visType)
                    ? expectStoreCurrentColumnsToHaveLength(1)
                    : expectAOTitleToBeUnsaved()

                dataElements.forEach(item =>
                    expectChartToContainDimensionItem(visType, item)
                )
            })
        })
    })
})
