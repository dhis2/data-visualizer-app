import {
    AXIS_ID_COLUMNS,
    DIMENSION_ID_DATA,
    getAxisMaxNumberOfItems,
    isYearOverYear,
    visTypeDisplayNames,
    VIS_TYPE_SCATTER,
    VIS_TYPE_SINGLE_VALUE,
    VIS_TYPE_GAUGE,
} from '@dhis2/analytics'
import {
    expectAOTitleToBeUnsaved,
    expectVisualizationToBeVisible,
    expectVisualizationToNotBeVisible,
    expectChartToContainDimensionItem,
} from '../elements/chart.js'
import {
    selectDataElements,
    selectIndicators,
    clickDimensionModalUpdateButton,
    switchDataTab,
} from '../elements/dimensionModal/index.js'
import { openDimension } from '../elements/dimensionsPanel.js'
import { createNewAO } from '../elements/fileMenu/index.js'
import { expectDimensionOnAxisToHaveLockIcon } from '../elements/layout.js'
import { goToStartPage } from '../elements/startScreen.js'
import {
    changeVisType,
    expectVisTypeToBeDefault,
    expectVisTypeToBeValue,
} from '../elements/visualizationTypeSelector.js'
import { TEST_DATA_ELEMENTS, TEST_INDICATORS } from '../utils/data.js'
import { expectStoreCurrentToBeEmpty } from '../utils/store.js'

const TEST_AXIS_ID = AXIS_ID_COLUMNS
const TEST_DATA_ELEMENT_NAMES = TEST_DATA_ELEMENTS.slice(2, 4).map(
    (item) => item.name
)
const TEST_INDICATOR_NAMES = TEST_INDICATORS.slice(1, 3).map(
    (item) => item.name
)

describe('creating a new AO', () => {
    it('navigates to the start page', () => {
        goToStartPage()
    })
    Object.keys(visTypeDisplayNames).forEach((visType) => {
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

                if (visType === VIS_TYPE_SCATTER) {
                    selectIndicators(TEST_INDICATOR_NAMES.slice(0, 1))
                    switchDataTab('Horizontal')
                    selectDataElements(TEST_DATA_ELEMENT_NAMES.slice(0, 1))
                } else {
                    if (getAxisMaxNumberOfItems(visType, TEST_AXIS_ID) === 1) {
                        // Gauge and SV can only have 1 data item
                        TEST_DATA_ELEMENT_NAMES.splice(1)
                    }

                    selectDataElements(TEST_DATA_ELEMENT_NAMES)
                }

                clickDimensionModalUpdateButton()

                expectVisualizationToBeVisible(visType)

                isYearOverYear(visType) && expectAOTitleToBeUnsaved()

                // FIXME: Store is always in default state
                /* !isYearOverYear(visType)
                    ? expectStoreCurrentColumnsToHaveLength(1)
                    : expectAOTitleToBeUnsaved() */

                if (visType !== VIS_TYPE_SCATTER) {
                    TEST_DATA_ELEMENT_NAMES.forEach((item) =>
                        expectChartToContainDimensionItem(visType, item)
                    )
                }
            })
            if ([VIS_TYPE_SINGLE_VALUE, VIS_TYPE_GAUGE].includes(visType)) {
                it('Data is locked to Series', () => {
                    expectDimensionOnAxisToHaveLockIcon(
                        DIMENSION_ID_DATA,
                        AXIS_ID_COLUMNS
                    )
                })
            }
        })
    })
})
