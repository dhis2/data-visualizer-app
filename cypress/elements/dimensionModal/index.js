const dimensionModalEl = 'dialog-manager'
const dimensionModalUpdateButtonEl = 'dialog-manager-modal-action-confirm'
const dimensionModalHideButtonEl = 'dialog-manager-modal-action-cancel'
const dimensionModalTitleEl = 'dialog-manager-modal-title'

export const expectDimensionModalToBeVisible = dimensionId =>
    cy.getBySel(`${dimensionModalEl}-${dimensionId}`).should('be.visible')

export const expectDimensionModalToNotBeVisible = () =>
    cy.getBySelLike(dimensionModalEl).should('not.exist')

export const clickDimensionModalUpdateButton = () =>
    cy.getBySel(dimensionModalUpdateButtonEl).click()

export const clickDimensionModalHideButton = () =>
    cy.getBySel(dimensionModalHideButtonEl).click()

export const expectDimensionModalToContain = text =>
    cy.getBySel(dimensionModalTitleEl).should('contain', text)

export {
    selectDataElements,
    selectIndicators,
    switchDataTab,
    expectDataDimensionModalWarningToContain,
    expectDataItemToBeInactive,
    unselectItemByDoubleClick,
    selectItemByDoubleClick,
    expectDataDimensionModalToBeVisible,
    expectDataItemToBeSelected,
    expectDataTypeToBe,
    expectGroupSelectToNotBeVisible,
    expectNoDataItemsToBeSelected,
    selectAllDataItems,
    unselectAllDataItems,
    expectDataItemsSelectedAmountToBeLeast,
    expectDataItemsSelectedAmountToBe,
    expectDataItemToBeSelectable,
    expectDataItemsSelectableAmountToBe,
    inputSearchTerm,
    switchDataTypeTo,
    clearSearchTerm,
    expectDataItemsSelectableAmountToBeLeast,
    expectGroupSelectToBeVisible,
    switchGroupTo,
    selectFirstDataItem,
    expectGroupSelectToBe,
    expectEmptySourceMessageToBe,
    switchGroupToAll,
    switchDataTypeToAll,
    scrollSourceToBottom,
    unselectItemByButton,
    selectItemByButton,
    expectDisaggregationSelectToBeVisible,
    expectDisaggregationSelectToBe,
    switchDisaggregationTo,
    expectMetricSelectToBeVisible,
    expectMetricSelectToBe,
    switchMetricTo,
} from './dataDimension'

export { selectRelativePeriods, selectFixedPeriods } from './periodDimension'

export {
    expectOrgUnitDimensionModalToBeVisible,
    clickOrgUnitTreeItem,
} from './orgUnitDimension'

/*  TODO:
    Check that each dimension can be opened and that all options can be accessed 
    (especially dropdowns due to the reoccuring bug with duplicates of @dhis2/ui)
   
    Period:
        Relative period type
        Fixed period type
        Fixed period year
        Select all button
        Deselect all button
        Select one button
        Deselect one button
        Reorder buttons

    Dynamic dimensions:
        Search
        Select all button
        Deselect all button
        Select one button
        Deselect one button
        Reorder buttons

    Org unit:
        User org unit / sub-units / sub-x2-units checkboxes
        Checking items in the tree
        Right click tree - "Select all org units below"
        Deselect all button
        Level
        Group
*/
