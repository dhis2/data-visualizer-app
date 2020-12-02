import {
    AXIS_ID_COLUMNS,
    DIMENSION_ID_DATA,
    getAxisMaxNumberOfItems,
    isYearOverYear,
    visTypeDisplayNames,
} from '@dhis2/analytics'

import { createNewAO } from '../elements/fileMenu'
import { openDimension } from '../elements/dimensionsPanel'
import {
    selectDataElements,
    clickDimensionModalUpdateButton,
} from '../elements/dimensionModal'
import {
    changeVisType,
    expectVisTypeToBeDefault,
    expectVisTypeToBeValue,
} from '../elements/visualizationTypeSelector'
import { goToStartPage } from '../elements/startScreen'
import {
    expectStoreCurrentToBeEmpty,
    expectStoreCurrentColumnsToHaveLength,
} from '../utils/store'
import {
    expectAOTitleToBeUnsaved,
    expectVisualizationToBeVisible,
    expectVisualizationToNotBeVisible,
    expectChartToContainDimensionItem,
} from '../elements/chart'
import { TEST_DATA_ELEMENTS } from '../utils/data'

const TEST_AXIS_ID = AXIS_ID_COLUMNS
const TEST_DATA_ELEMENT_NAMES = TEST_DATA_ELEMENTS.slice(2, 4).map(
    item => item.name
)

describe('creating a new AO', () => {
    it('navigates to the start page', () => {
        goToStartPage()
    })
    Object.keys(visTypeDisplayNames).forEach(visType => {
        const visTypeName = visTypeDisplayNames[visType]
        describe(visTypeName, () => {
            it('creates a new AO', () => {
                createNewAO()
                expectStoreCurrentToBeEmpty()
                expectVisualizationToNotBeVisible()
                expectVisTypeToBeDefault()
            })
            it('changes vis type', () => {
                changeVisType(visTypeName)
                expectVisTypeToBeValue(visTypeName)
            })
            it('adds dimensions', () => {
                openDimension(DIMENSION_ID_DATA)
                // FIXME: Won't work for Scatter, needs to add both vertical and horizontal items

                if (getAxisMaxNumberOfItems(visType, TEST_AXIS_ID) === 1) {
                    // Gauge and SV can only have 1 data item
                    TEST_DATA_ELEMENT_NAMES.splice(1)
                }

                selectDataElements(TEST_DATA_ELEMENT_NAMES)

                clickDimensionModalUpdateButton()

                expectVisualizationToBeVisible(visType)

                !isYearOverYear(visType)
                    ? expectStoreCurrentColumnsToHaveLength(1)
                    : expectAOTitleToBeUnsaved()

                TEST_DATA_ELEMENT_NAMES.forEach(item =>
                    expectChartToContainDimensionItem(visType, item)
                )
            })
        })
    })
})
