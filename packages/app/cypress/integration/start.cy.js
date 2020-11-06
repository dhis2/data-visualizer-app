import {
    AXIS_ID_COLUMNS,
    AXIS_ID_FILTERS,
    AXIS_ID_ROWS,
    DIMENSION_ID_DATA,
    DIMENSION_ID_ORGUNIT,
    DIMENSION_ID_PERIOD,
} from '@dhis2/analytics'
import { expectVisualizationToNotBeVisible } from '../elements/Chart'
import {
    expectDeleteButtonToBeDisabled,
    expectSaveAsButtonToBeDisabled,
    expectRenameButtonToBeDisabled,
    expectTranslateButtonToBeDisabled,
    expectShareButtonToBeDisabled,
    expectGetLinkButtonToBeDisabled,
    openFileMenu,
    closeFileMenu,
} from '../elements/FileMenu'
import {
    expectAxisToHaveDimension,
    expectDimensionToHaveItemAmount,
    expectDimensionToNotHaveItems,
} from '../elements/Layout'
import {
    expectMostViewedToBeVisible,
    expectStartScreenToBeVisible,
} from '../elements/StartScreen'
import { expectVisTypeToBeDefault } from '../elements/VisualizationTypeSelector'
import { expectWindowTitleToBeDefault } from '../elements/Window'
import { expectStoreCurrentToBeEmpty } from '../utils/store'

describe('start screen', () => {
    it('navigates to the start page', () => {
        cy.visit('')
        expectStartScreenToBeVisible()
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
    it('opens File menu', () => {
        openFileMenu()
    })
    it('Save as button is disabled', () => {
        expectSaveAsButtonToBeDisabled()
    })
    it('Delete button is disabled', () => {
        expectDeleteButtonToBeDisabled()
    })
    it('Rename button is disabled', () => {
        expectRenameButtonToBeDisabled()
    })
    it('Translate button is disabled', () => {
        expectTranslateButtonToBeDisabled()
    })
    it('Share button is disabled', () => {
        expectShareButtonToBeDisabled()
    })
    it('Get link button is disabled', () => {
        expectGetLinkButtonToBeDisabled()
    })
    it('closes File menu', () => {
        closeFileMenu()
    })
})
