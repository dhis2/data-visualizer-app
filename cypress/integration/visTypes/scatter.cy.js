import {
    DIMENSION_ID_DATA,
    DIMENSION_ID_ORGUNIT,
    visTypeDisplayNames,
    VIS_TYPE_SCATTER,
    AXIS_ID_ROWS,
} from '@dhis2/analytics'

import { openDimension } from '../../elements/dimensionsPanel'
import {
    selectIndicators,
    clickDimensionModalUpdateButton,
    switchDataTab,
} from '../../elements/dimensionModal'
import { changeVisType } from '../../elements/visualizationTypeSelector'
import {
    expectErrorToContainTitle,
    goToStartPage,
} from '../../elements/startScreen'
import { expectStoreCurrentColumnsToHaveLength } from '../../utils/store'
import { expectVisualizationToBeVisible } from '../../elements/chart'
import { TEST_INDICATORS } from '../../utils/data'
import { clickMenuBarUpdateButton } from '../../elements/menuBar'
import {
    clickContextMenuSwap,
    expectDimensionToBeLockedToAxis,
    openContextMenu,
} from '../../elements/layout'

const TEST_INDICATOR_NAMES = TEST_INDICATORS.slice(2, 4).map(item => item.name)
const visTypeName = visTypeDisplayNames[VIS_TYPE_SCATTER]

describe('using a Scatter chart', () => {
    it('navigates to a new Scatter chart', () => {
        goToStartPage()
        changeVisType(visTypeName)
    })
    it("shows an error message when vertical and horizontal isn't selected", () => {
        clickMenuBarUpdateButton()
        expectErrorToContainTitle('Vertical is empty')
    })
    it('adds a vertical item and shows an error message', () => {
        openDimension(DIMENSION_ID_DATA)

        selectIndicators([TEST_INDICATOR_NAMES[0]])

        clickDimensionModalUpdateButton()

        expectErrorToContainTitle('Horizontal is empty')

        expectVerticalToContainDimensionLabel(TEST_INDICATOR_NAMES[0])
    })
    it('adds a horizontal item and displays a chart', () => {
        openDimension(DIMENSION_ID_DATA)
        switchDataTab('Horizontal')
        selectIndicators([TEST_INDICATOR_NAMES[1]])

        clickDimensionModalUpdateButton()

        expectVisualizationToBeVisible(VIS_TYPE_SCATTER)

        expectStoreCurrentColumnsToHaveLength(1)

        expectVerticalToContainDimensionLabel(TEST_INDICATOR_NAMES[0])
        expectHorizontalToContainDimensionLabel(TEST_INDICATOR_NAMES[1])
    })
    it('Data is locked to Vertical', () => {
        expectDimensionToBeLockedToAxis(DIMENSION_ID_DATA, 'Vertical')
    })
    it('Data is locked to Horizontal', () => {
        expectDimensionToBeLockedToAxis(DIMENSION_ID_DATA, 'Horizontal')
    })
    it('Org units is locked to Points', () => {
        expectDimensionToBeLockedToAxis(DIMENSION_ID_ORGUNIT, AXIS_ID_ROWS)
    })
    it('swaps vertical with horizontal', () => {
        openContextMenu('VERTICAL')
        clickContextMenuSwap('VERTICAL', 'HORIZONTAL')
        clickMenuBarUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SCATTER)

        expectVerticalToContainDimensionLabel(TEST_INDICATOR_NAMES[1])
        expectHorizontalToContainDimensionLabel(TEST_INDICATOR_NAMES[0])
    })
    /* TODO: Test that...
        Adding more than 1 displays message in Data selector and layout chip and the warning icon
        Saving
        Loading
        Deleting
    */
})

const expectVerticalToContainDimensionLabel = label =>
    cy.getBySel('Vertical-axis').should('contain', label)
const expectHorizontalToContainDimensionLabel = label =>
    cy.getBySel('Horizontal-axis').should('contain', label)
