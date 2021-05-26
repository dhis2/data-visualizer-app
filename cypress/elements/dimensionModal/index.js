const dimensionModalEl = 'dialog-manager'
const dimensionModalUpdateButtonEl = 'dialog-manager-modal-action-confirm'
const dimensionModalHideButtonEl = 'dialog-manager-modal-action-cancel'
const dimensionModalTitleEl = 'dialog-manager-modal-title'
const transferAddAllButtonEl = 'transfer-actions-addall'
const transferRemoveAllButtonEl = 'transfer-actions-removeall'
const transferAddOneButtonEl = 'transfer-actions-addindividual'
const transferRemoveOneButtonEl = 'transfer-actions-removeindividual'
const transferSelectableItemsEl = 'transfer-sourceoptions'
const transferSelectedItemsEl = 'transfer-pickedoptions'
const transferLeftContainerEl = 'transfer-leftside'
const transferLoadingEl = 'dhis2-uicore-circularloader'

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

export const selectAllItemsByButton = () => {
    cy.getBySelLike(transferAddAllButtonEl).filter('button').click()
}
export const unselectAllItemsByButton = () => {
    cy.getBySelLike(transferRemoveAllButtonEl).filter('button').click()
}
export const selectItemByButton = item => {
    cy.getBySelLike(transferSelectableItemsEl).contains(item).click()
    cy.getBySelLike(transferAddOneButtonEl).filter('button').click()
}
export const unselectItemByButton = item => {
    cy.getBySelLike(transferSelectedItemsEl).contains(item).click()
    cy.getBySelLike(transferRemoveOneButtonEl).filter('button').click()
}
export const selectItemByDoubleClick = item =>
    cy.getBySelLike(transferSelectableItemsEl).contains(item).dblclick()
export const unselectItemByDoubleClick = item =>
    cy.getBySelLike(transferSelectedItemsEl).contains(item).dblclick()

export const expectSourceToNotBeLoading = () =>
    cy
        .getBySelLike(transferLeftContainerEl)
        .findBySelLike(transferLoadingEl)
        .should('not.exist')

export {
    selectDataElements,
    selectIndicators,
    switchDataTab,
    expectDataDimensionModalWarningToContain,
    expectDataItemToBeInactive,
    expectDataDimensionModalToBeVisible,
    expectDataItemToBeSelected,
    expectDataTypeToBe,
    expectGroupSelectToNotBeVisible,
    expectNoDataItemsToBeSelected,
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
    expectSubGroupSelectToBeVisible,
    expectSubGroupSelectToBe,
    switchSubGroupTo,
} from './dataDimension'

export {
    selectRelativePeriods,
    selectFixedPeriods,
    expectPeriodDimensionModalToBeVisible,
    expectSelectedPeriodsAmountToBe,
    expectItemToBeSelected,
    expectRelativePeriodTypeToBe,
    expectRelativeToBeSelected,
    expectNoPeriodsToBeSelected,
    expectRelativePeriodTypeSelectToContain,
    expectFixedPeriodTypeSelectToContain,
    openRelativePeriodsTypeSelect,
    expectSelectablePeriodsAmountToBe,
    selectPeriodType,
    switchToFixedPeriods,
    expectSelectablePeriodsAmountToBeLeast,
    openFixedPeriodsTypeSelect,
    expectRelativePeriodTypeSelectToNotContain,
    expectFixedPeriodTypeSelectToNotContain,
    expectFixedPeriodTypeToBe,
} from './periodDimension'

export {
    expectOrgUnitDimensionModalToBeVisible,
    clickOrgUnitTreeItem,
    selectOrgUnitLevel,
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
