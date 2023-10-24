import {
    AXIS_ID_COLUMNS,
    AXIS_ID_FILTERS,
    AXIS_ID_ROWS,
    DIMENSION_ID_DATA,
    DIMENSION_ID_ORGUNIT,
    DIMENSION_ID_PERIOD,
} from '@dhis2/analytics'
import { expectVisualizationToNotBeVisible } from '../elements/chart.js'
import {
    closeFileMenuWithEsc,
    closeFileMenuWithClick,
    expectFileMenuButtonToBeDisabled,
    FILE_MENU_BUTTON_NEW,
    FILE_MENU_BUTTON_OPEN,
    FILE_MENU_BUTTON_SAVEAS,
    FILE_MENU_BUTTON_GETLINK,
    FILE_MENU_BUTTON_SHARE,
    FILE_MENU_BUTTON_TRANSLATE,
    FILE_MENU_BUTTON_RENAME,
    FILE_MENU_BUTTON_DELETE,
    expectFileMenuButtonToBeEnabled,
} from '../elements/fileMenu/index.js'
import {
    expectAxisToHaveDimension,
    expectDimensionToHaveItemAmount,
    expectDimensionToNotHaveItems,
} from '../elements/layout.js'
import { clickMenuBarFileButton } from '../elements/menuBar.js'
import {
    expectMostViewedToBeVisible,
    goToStartPage,
} from '../elements/startScreen.js'
import { expectVisTypeToBeDefault } from '../elements/visualizationTypeSelector.js'
import { expectWindowTitleToBeDefault } from '../elements/window.js'
import { expectStoreCurrentToBeEmpty } from '../utils/store.js'

test('Start screen shows the correct initial state', () => {
    //navigates to the start page
    goToStartPage()

    //window has a title
    expectWindowTitleToBeDefault()

    //store is empty
    expectStoreCurrentToBeEmpty()

    //no chart is visible
    expectVisualizationToNotBeVisible()

    //displays most viewed section
    expectMostViewedToBeVisible()

    //vis type is default
    expectVisTypeToBeDefault()

    //axis series has data dimension
    expectAxisToHaveDimension(AXIS_ID_COLUMNS, DIMENSION_ID_DATA)

    //data dimension has no items
    expectDimensionToNotHaveItems(DIMENSION_ID_DATA)

    //axis category has period dimension
    expectAxisToHaveDimension(AXIS_ID_ROWS, DIMENSION_ID_PERIOD)

    //period dimension has 1 item
    expectDimensionToHaveItemAmount(DIMENSION_ID_PERIOD, 1)

    //axis filter has orgunit dimension
    expectAxisToHaveDimension(AXIS_ID_FILTERS, DIMENSION_ID_ORGUNIT)

    //orgunit dimension has 1 item
    expectDimensionToHaveItemAmount(DIMENSION_ID_ORGUNIT, 1)

    //primary File menu buttons are enabled and menu is closed with click
    clickMenuBarFileButton()
    const enabledButtons = [FILE_MENU_BUTTON_NEW, FILE_MENU_BUTTON_OPEN]
    enabledButtons.forEach((button) => expectFileMenuButtonToBeEnabled(button))
    closeFileMenuWithClick()

    //secondary File menu buttons are disabled and menu is closed with click
    clickMenuBarFileButton()
    const disabledButtons = [
        FILE_MENU_BUTTON_SAVEAS,
        FILE_MENU_BUTTON_RENAME,
        FILE_MENU_BUTTON_TRANSLATE,
        FILE_MENU_BUTTON_SHARE,
        FILE_MENU_BUTTON_GETLINK,
        FILE_MENU_BUTTON_DELETE,
    ]
    disabledButtons.forEach((button) =>
        expectFileMenuButtonToBeDisabled(button)
    )
    closeFileMenuWithClick()

    //File menu is closed with Escape
    clickMenuBarFileButton()
    closeFileMenuWithEsc()
})
