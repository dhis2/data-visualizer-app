import {
    DIMENSION_ID_DATA,
    DIMENSION_ID_ORGUNIT,
    visTypeDisplayNames,
    VIS_TYPE_SCATTER,
    AXIS_ID_ROWS,
} from '@dhis2/analytics'
import {
    expectVisualizationToBeVisible,
    expectChartTitleToBeVisible,
} from '../../elements/chart.js'
import { expectAppToNotBeLoading } from '../../elements/common.js'
import {
    selectIndicators,
    clickDimensionModalUpdateButton,
    switchDataTab,
    expectDataDimensionModalWarningToContain,
    expectDataItemToBeInactive,
    expectOrgUnitDimensionModalToBeVisible,
    expectOrgUnitDimensionToNotBeLoading,
    toggleOrgUnitLevel,
    deselectUserOrgUnit,
    selectOrgUnitTreeItem,
} from '../../elements/dimensionModal/index.js'
import { openDimension } from '../../elements/dimensionsPanel.js'
import {
    deleteAO,
    saveExistingAO,
    saveNewAO,
} from '../../elements/fileMenu/index.js'
import {
    clickContextMenuSwap,
    expectDimensionOnAxisToHaveLockIcon,
    expectDimensionOnAxisToHaveWarningIcon,
    openContextMenu,
    openDimensionOnAxis,
} from '../../elements/layout.js'
import {
    clickMenuBarOptionsButton,
    clickMenuBarUpdateButton,
} from '../../elements/menuBar.js'
import {
    clickOptionsModalUpdateButton,
    clickOptionsTab,
    clickOutliersCheckbox,
    OPTIONS_TAB_AXES,
    OPTIONS_TAB_OUTLIERS,
    setAxisRangeMaxValue,
    setAxisRangeMinValue,
    switchAxesTabTo,
} from '../../elements/optionsModal/index.js'
import { expectRouteToBeEmpty } from '../../elements/route.js'
import {
    expectErrorToContainTitle,
    expectStartScreenToBeVisible,
    goToStartPage,
} from '../../elements/startScreen.js'
import { changeVisType } from '../../elements/visualizationTypeSelector.js'
import { TEST_INDICATORS } from '../../utils/data.js'
import {
    expectWindowConfigYAxisToHaveRangeMaxValue,
    expectWindowConfigYAxisToHaveRangeMinValue,
    expectWindowConfigXAxisToHaveRangeMaxValue,
    expectWindowConfigXAxisToHaveRangeMinValue,
} from '../../utils/window.js'

const TEST_INDICATOR_NAMES = TEST_INDICATORS.slice(1, 4).map(
    (item) => item.name
)
const TEST_VIS_NAME = `TEST SCATTER ${new Date().toLocaleString()}`

describe('using a Scatter chart', () => {
    it('navigates to a new Scatter chart', () => {
        goToStartPage()
        changeVisType(visTypeDisplayNames[VIS_TYPE_SCATTER])
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
        expectChartTitleToBeVisible()
        //expectStoreCurrentColumnsToHaveLength(1) // FIXME: Store is always in default state
        expectVerticalToContainDimensionLabel(TEST_INDICATOR_NAMES[0])
        expectHorizontalToContainDimensionLabel(TEST_INDICATOR_NAMES[1])
    })
    it('selects org unit level Facility', () => {
        const TEST_ORG_UNIT_LEVEL = 'Facility'
        openDimension(DIMENSION_ID_ORGUNIT)
        expectOrgUnitDimensionModalToBeVisible()
        deselectUserOrgUnit('User organisation unit')
        expectOrgUnitDimensionToNotBeLoading()
        // FIXME this selection causes a analytics request that takes too long on test instances
        //selectOrgUnitTreeItem('Sierra Leone')
        selectOrgUnitTreeItem('Bo')
        selectOrgUnitTreeItem('Bombali')
        toggleOrgUnitLevel(TEST_ORG_UNIT_LEVEL)
        expectOrgUnitDimensionModalToBeVisible()
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SCATTER)
    })
    it('Data is locked to Vertical', () => {
        expectDimensionOnAxisToHaveLockIcon(DIMENSION_ID_DATA, 'Vertical')
    })
    it('Data is locked to Horizontal', () => {
        expectDimensionOnAxisToHaveLockIcon(DIMENSION_ID_DATA, 'Horizontal')
    })
    it('Org units is locked to Points', () => {
        expectDimensionOnAxisToHaveLockIcon(DIMENSION_ID_ORGUNIT, AXIS_ID_ROWS)
    })
    it('swaps vertical with horizontal', () => {
        openContextMenu('VERTICAL')
        clickContextMenuSwap('VERTICAL', 'HORIZONTAL')
        clickMenuBarUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SCATTER)
        expectVerticalToContainDimensionLabel(TEST_INDICATOR_NAMES[1])
        expectHorizontalToContainDimensionLabel(TEST_INDICATOR_NAMES[0])
    })
    it('adds a second item to horizontal and displays warning messages', () => {
        openDimensionOnAxis(DIMENSION_ID_DATA, 'Horizontal')
        selectIndicators([TEST_INDICATOR_NAMES[2]])
        expectDataDimensionModalWarningToContain(
            "'Scatter' is intended to show a single data item per axis."
        )
        expectDataItemToBeInactive(
            TEST_INDICATORS.find(
                (indicator) => indicator.name === TEST_INDICATOR_NAMES[2]
            ).id
        )
        clickDimensionModalUpdateButton()
        expectDimensionOnAxisToHaveWarningIcon(DIMENSION_ID_DATA, 'Horizontal')
    })
    it('saves and only displays 1 horizontal item', () => {
        saveNewAO(TEST_VIS_NAME)
        expectVisualizationToBeVisible(VIS_TYPE_SCATTER)
        expectVerticalToContainDimensionLabel(TEST_INDICATOR_NAMES[1])
        expectHorizontalToContainDimensionLabel(TEST_INDICATOR_NAMES[0])
    })
    it('swaps vertical with horizontal', () => {
        openContextMenu('HORIZONTAL')
        clickContextMenuSwap('HORIZONTAL', 'VERTICAL')
        clickMenuBarUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SCATTER)
        expectVerticalToContainDimensionLabel(TEST_INDICATOR_NAMES[0])
        expectHorizontalToContainDimensionLabel(TEST_INDICATOR_NAMES[1])
    })
    it('Options -> Axes -> sets min/max range', () => {
        const TEST_AXES = [
            { axis: 'RANGE_0', label: 'Vertical (y) axis', min: 50, max: 150 },
            {
                axis: 'RANGE_1',
                label: 'Horizontal (x) axis',
                min: 100,
                max: 200,
            },
        ]
        clickMenuBarOptionsButton()
        clickOptionsTab(OPTIONS_TAB_AXES)
        TEST_AXES.forEach((test) => {
            switchAxesTabTo(test.label)
            setAxisRangeMinValue(test.axis, test.min)
            setAxisRangeMaxValue(test.axis, test.max)
        })
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SCATTER)
        expectWindowConfigYAxisToHaveRangeMinValue(TEST_AXES[0].min)
        expectWindowConfigYAxisToHaveRangeMaxValue(TEST_AXES[0].max)
        expectWindowConfigXAxisToHaveRangeMinValue(TEST_AXES[1].min)
        expectWindowConfigXAxisToHaveRangeMaxValue(TEST_AXES[1].max)
    })
    it('Options -> Outliers -> enables outliers', () => {
        clickMenuBarOptionsButton()
        clickOptionsTab(OPTIONS_TAB_OUTLIERS)
        clickOutliersCheckbox()
        // TODO: Set more outlier options
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SCATTER)
        // TODO: Intercept the data returned to simplify / standardise it, then check that the $config has the correct data
    })
    it('saves and displays items in the correct places', () => {
        saveExistingAO()
        expectAppToNotBeLoading()
        expectVisualizationToBeVisible(VIS_TYPE_SCATTER)
        expectVerticalToContainDimensionLabel(TEST_INDICATOR_NAMES[0])
        expectHorizontalToContainDimensionLabel(TEST_INDICATOR_NAMES[1])
    })
    // TODO: Open outlier options again and check that everything was saved correctly
    it('deletes saved scatter AO', () => {
        deleteAO()
        expectStartScreenToBeVisible()
        expectRouteToBeEmpty()
    })
})

const expectVerticalToContainDimensionLabel = (label) =>
    cy.getBySel('Vertical-axis').should('contain', label)
const expectHorizontalToContainDimensionLabel = (label) =>
    cy.getBySel('Horizontal-axis').should('contain', label)
