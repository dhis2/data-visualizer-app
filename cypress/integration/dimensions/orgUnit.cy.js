import {
    DIMENSION_ID_DATA,
    VIS_TYPE_COLUMN,
    DIMENSION_ID_ORGUNIT,
    AXIS_ID_COLUMNS,
} from '@dhis2/analytics'
import { expectVisualizationToBeVisible } from '../../elements/chart'
import {
    clickDimensionModalHideButton,
    clickDimensionModalUpdateButton,
    expectOrgUnitDimensionModalToBeVisible,
    expectOrgUnitItemToBeSelected,
    selectDataElements,
    selectOrgUnitTreeItem,
    expectOrgUnitDimensionToNotBeLoading,
    openOrgUnitTreeItem,
    deselectOrgUnitTreeItem,
    toggleOrgUnitLevel,
    toggleOrgUnitGroup,
    selectUserOrgUnit,
    expectOrgUnitTreeToBeDisabled,
    expectOrgUnitTreeToBeEnabled,
    deselectUserOrgUnit,
} from '../../elements/dimensionModal'
import {
    clickContextMenuMove,
    expectDimensionToHaveItemAmount,
    openContextMenu,
    openDimension,
} from '../../elements/layout'
import { clickMenuBarUpdateButton } from '../../elements/menuBar'
import { goToStartPage } from '../../elements/startScreen'
import { TEST_DATA_ELEMENTS } from '../../utils/data'
import { getRandomArrayItem } from '../../utils/random'
import { expectWindowConfigSeriesToHaveLength } from '../../utils/window'

const TEST_DATA_ELEMENT_NAME = getRandomArrayItem(TEST_DATA_ELEMENTS).name

describe(`Org unit dimension`, () => {
    const TEST_ROOT = 'Sierra Leone'
    it('navigates to the start page, adds a data item, moves Org Unit to Series', () => {
        goToStartPage()
        openDimension(DIMENSION_ID_DATA)
        selectDataElements([TEST_DATA_ELEMENT_NAME])
        clickDimensionModalHideButton()
        openContextMenu(DIMENSION_ID_ORGUNIT)
        clickContextMenuMove(DIMENSION_ID_ORGUNIT, AXIS_ID_COLUMNS)
        clickMenuBarUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        expectWindowConfigSeriesToHaveLength(1)
        expectDimensionToHaveItemAmount(DIMENSION_ID_ORGUNIT, 1)
    })
    const TEST_DISTRICT_1 = 'Bo'
    it(`selects a district level org unit - ${TEST_DISTRICT_1}`, () => {
        openDimension(DIMENSION_ID_ORGUNIT)
        expectOrgUnitDimensionModalToBeVisible()
        expectOrgUnitDimensionToNotBeLoading()
        expectOrgUnitItemToBeSelected(TEST_ROOT)
        selectOrgUnitTreeItem(TEST_DISTRICT_1)
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        expectWindowConfigSeriesToHaveLength(2)
        expectDimensionToHaveItemAmount(DIMENSION_ID_ORGUNIT, 2)
    })
    const TEST_DISTRICT_2 = 'Bombali'
    const TEST_CHIEFDOM = 'Biriwa'
    it(`selects a chiefdom level org unit - ${TEST_CHIEFDOM} in ${TEST_DISTRICT_2}`, () => {
        openDimension(DIMENSION_ID_ORGUNIT)
        expectOrgUnitDimensionModalToBeVisible()
        expectOrgUnitDimensionToNotBeLoading()
        expectOrgUnitItemToBeSelected(TEST_ROOT)
        expectOrgUnitItemToBeSelected(TEST_DISTRICT_1)
        openOrgUnitTreeItem(TEST_DISTRICT_2)
        expectOrgUnitDimensionToNotBeLoading()
        selectOrgUnitTreeItem(TEST_CHIEFDOM)
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        expectWindowConfigSeriesToHaveLength(3)
        expectDimensionToHaveItemAmount(DIMENSION_ID_ORGUNIT, 3)
    })
    it(`deselects ${TEST_DISTRICT_1} and ${TEST_CHIEFDOM}`, () => {
        openDimension(DIMENSION_ID_ORGUNIT)
        expectOrgUnitDimensionModalToBeVisible()
        expectOrgUnitDimensionToNotBeLoading()
        expectOrgUnitItemToBeSelected(TEST_ROOT)
        expectOrgUnitItemToBeSelected(TEST_DISTRICT_1)
        expectOrgUnitItemToBeSelected(TEST_CHIEFDOM)
        deselectOrgUnitTreeItem(TEST_DISTRICT_1)
        deselectOrgUnitTreeItem(TEST_CHIEFDOM)
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        expectWindowConfigSeriesToHaveLength(1)
        expectDimensionToHaveItemAmount(DIMENSION_ID_ORGUNIT, 1)
    })
    const TEST_LEVEL = 'District'
    it(`selects a level - ${TEST_LEVEL}`, () => {
        openDimension(DIMENSION_ID_ORGUNIT)
        expectOrgUnitDimensionModalToBeVisible()
        expectOrgUnitDimensionToNotBeLoading()
        expectOrgUnitItemToBeSelected(TEST_ROOT)
        toggleOrgUnitLevel(TEST_LEVEL)
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        expectWindowConfigSeriesToHaveLength(13) // number of districts in Sierra Leone
        expectDimensionToHaveItemAmount(DIMENSION_ID_ORGUNIT, 2)
    })
    it(`deselects ${TEST_LEVEL}`, () => {
        openDimension(DIMENSION_ID_ORGUNIT)
        expectOrgUnitDimensionModalToBeVisible()
        expectOrgUnitDimensionToNotBeLoading()
        toggleOrgUnitLevel(TEST_LEVEL)
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        expectWindowConfigSeriesToHaveLength(1)
        expectDimensionToHaveItemAmount(DIMENSION_ID_ORGUNIT, 1)
    })
    const TEST_GROUP = 'Eastern Area'
    it(`selects a group - ${TEST_GROUP}`, () => {
        openDimension(DIMENSION_ID_ORGUNIT)
        expectOrgUnitDimensionModalToBeVisible()
        expectOrgUnitDimensionToNotBeLoading()
        expectOrgUnitItemToBeSelected(TEST_ROOT)
        toggleOrgUnitGroup(TEST_GROUP)
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        expectWindowConfigSeriesToHaveLength(3) // number of items in group
        expectDimensionToHaveItemAmount(DIMENSION_ID_ORGUNIT, 2)
    })
    it(`deselects ${TEST_GROUP}`, () => {
        openDimension(DIMENSION_ID_ORGUNIT)
        expectOrgUnitDimensionModalToBeVisible()
        expectOrgUnitDimensionToNotBeLoading()
        toggleOrgUnitGroup(TEST_GROUP)
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        expectWindowConfigSeriesToHaveLength(1)
        expectDimensionToHaveItemAmount(DIMENSION_ID_ORGUNIT, 1)
    })
    const TEST_USER_ORG_UNIT = 'User sub-units'
    it(`selects a user org unit - '${TEST_USER_ORG_UNIT}'`, () => {
        openDimension(DIMENSION_ID_ORGUNIT)
        expectOrgUnitDimensionModalToBeVisible()
        expectOrgUnitDimensionToNotBeLoading()
        expectOrgUnitItemToBeSelected(TEST_ROOT)
        expectOrgUnitTreeToBeEnabled()
        selectUserOrgUnit(TEST_USER_ORG_UNIT)
        expectOrgUnitTreeToBeDisabled()
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        expectWindowConfigSeriesToHaveLength(13) // number of items in user org unit
        expectDimensionToHaveItemAmount(DIMENSION_ID_ORGUNIT, 1)
    })
    it(`deselects '${TEST_USER_ORG_UNIT}'`, () => {
        openDimension(DIMENSION_ID_ORGUNIT)
        expectOrgUnitDimensionModalToBeVisible()
        expectOrgUnitDimensionToNotBeLoading()
        expectOrgUnitTreeToBeDisabled()
        deselectUserOrgUnit(TEST_USER_ORG_UNIT)
        expectOrgUnitTreeToBeEnabled()
        selectOrgUnitTreeItem(TEST_ROOT)
        expectOrgUnitItemToBeSelected(TEST_ROOT)
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        expectWindowConfigSeriesToHaveLength(1)
        expectDimensionToHaveItemAmount(DIMENSION_ID_ORGUNIT, 1)
    })
})
