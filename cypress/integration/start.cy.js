import {
    AXIS_ID_COLUMNS,
    AXIS_ID_FILTERS,
    AXIS_ID_ROWS,
    DIMENSION_ID_DATA,
    DIMENSION_ID_ORGUNIT,
    DIMENSION_ID_PERIOD,
} from '@dhis2/analytics'
import { expectVisualizationToNotBeVisible } from '../elements/chart'
import {
    closeFileMenuWithEsc,
    closeFileMenuWithClick,
    expectFileMenuButtonToBeDisabled,
    FILE_MENU_BUTTON_NEW,
    FILE_MENU_BUTTON_OPEN,
    FILE_MENU_BUTTON_SAVE_NEW,
    FILE_MENU_BUTTON_SAVEAS,
    FILE_MENU_BUTTON_GETLINK,
    FILE_MENU_BUTTON_SHARE,
    FILE_MENU_BUTTON_TRANSLATE,
    FILE_MENU_BUTTON_RENAME,
    FILE_MENU_BUTTON_DELETE,
    expectFileMenuButtonToBeEnabled,
} from '../elements/fileMenu'
import {
    expectAxisToHaveDimension,
    expectDimensionToHaveItemAmount,
    expectDimensionToNotHaveItems,
} from '../elements/layout'
import { clickMenuBarFileButton } from '../elements/menuBar'
import {
    expectMostViewedToBeVisible,
    goToStartPage,
} from '../elements/startScreen'
import { expectVisTypeToBeDefault } from '../elements/visualizationTypeSelector'
import { expectWindowTitleToBeDefault } from '../elements/window'
import { expectStoreCurrentToBeEmpty } from '../utils/store'

describe('viewing the start screen', () => {
    it('navigates to the start page', () => {
        goToStartPage()
    })
    it('window has a title', () => {
        expectWindowTitleToBeDefault()
    })
    it('store is empty', () => {
        expectStoreCurrentToBeEmpty()
    })
    it('no chart is visible', () => {
        expectVisualizationToNotBeVisible()
    })
    it('displays most viewed section', () => {
        expectMostViewedToBeVisible()
    })
    it('vis type is default', () => {
        expectVisTypeToBeDefault()
    })
    it('axis series has data dimension', () => {
        expectAxisToHaveDimension(AXIS_ID_COLUMNS, DIMENSION_ID_DATA)
    })
    it('data dimension has no items', () => {
        expectDimensionToNotHaveItems(DIMENSION_ID_DATA)
    })
    it('axis category has period dimension', () => {
        expectAxisToHaveDimension(AXIS_ID_ROWS, DIMENSION_ID_PERIOD)
    })
    it('period dimension has 1 item', () => {
        expectDimensionToHaveItemAmount(DIMENSION_ID_PERIOD, 1)
    })
    it('axis filter has orgunit dimension', () => {
        expectAxisToHaveDimension(AXIS_ID_FILTERS, DIMENSION_ID_ORGUNIT)
    })
    it('orgunit dimension has 1 item', () => {
        expectDimensionToHaveItemAmount(DIMENSION_ID_ORGUNIT, 1)
    })
    it('primary File menu buttons are enabled and menu is closed with click', () => {
        clickMenuBarFileButton()
        const enabledButtons = [
            FILE_MENU_BUTTON_NEW,
            FILE_MENU_BUTTON_OPEN,
            FILE_MENU_BUTTON_SAVE_NEW,
        ]
        enabledButtons.forEach(button =>
            expectFileMenuButtonToBeEnabled(button)
        )
        closeFileMenuWithClick()
    })
    it('secondary File menu buttons are disabled and menu is closed with click', () => {
        clickMenuBarFileButton()
        const disabledButtons = [
            FILE_MENU_BUTTON_SAVEAS,
            FILE_MENU_BUTTON_RENAME,
            FILE_MENU_BUTTON_TRANSLATE,
            FILE_MENU_BUTTON_SHARE,
            FILE_MENU_BUTTON_GETLINK,
            FILE_MENU_BUTTON_DELETE,
        ]
        disabledButtons.forEach(button =>
            expectFileMenuButtonToBeDisabled(button)
        )
        closeFileMenuWithClick()
    })
    it('Fle menu is closed with Escape', () => {
        clickMenuBarFileButton()
        closeFileMenuWithEsc()
    })
})
