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
const transferOptionEl = 'transfer-option'
const transferLeftContainerEl = 'transfer-leftside'
const transferLoadingEl = 'dhis2-uicore-circularloader'
const transferMoveUpEl = 'transfer-reorderingactions-buttonmoveup'
const transferMoveDownEl = 'transfer-reorderingactions-buttonmovedown'

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

export const expectItemToBeSelected = item =>
    cy.getBySelLike(transferSelectedItemsEl).should('contain', item)

export const expectItemToBeSelectable = dataItem =>
    cy.getBySel(transferSelectableItemsEl).should('contain', dataItem)

export const expectFirstSelectedItemToBe = item =>
    cy
        .getBySelLike(transferSelectedItemsEl)
        .findBySelLike(transferOptionEl)
        .first()
        .should('contain', item)

export const expectSourceToNotBeLoading = () =>
    cy
        .getBySelLike(transferLeftContainerEl)
        .findBySelLike(transferLoadingEl)
        .should('not.exist')

export const singleClickSelectedItem = item =>
    cy.getBySelLike(transferSelectedItemsEl).contains(item).click()

export const clickMoveUpButton = () => cy.getBySelLike(transferMoveUpEl).click()

export const clickMoveDownButton = () =>
    cy.getBySelLike(transferMoveDownEl).click()

export const expectSelectedItemsAmountToBeLeast = amount =>
    cy
        .getBySelLike(transferSelectedItemsEl)
        .findBySelLike(transferOptionEl)
        .should('have.length.least', amount)

export const expectSelectableItemsAmountToBeLeast = amount =>
    cy
        .getBySelLike(transferSelectableItemsEl)
        .findBySelLike(transferOptionEl)
        .should('have.length.least', amount)

export const expectSelectableItemsAmountToBe = amount =>
    cy
        .getBySelLike(transferSelectableItemsEl)
        .findBySelLike(transferOptionEl)
        .should('have.length', amount)

export const expectSelectedItemsAmountToBe = amount =>
    cy
        .getBySelLike(transferSelectedItemsEl)
        .findBySelLike(transferOptionEl)
        .should('have.length', amount)

export {
    selectDataElements,
    selectIndicators,
    switchDataTab,
    expectDataDimensionModalWarningToContain,
    expectDataItemToBeInactive,
    expectDataDimensionModalToBeVisible,
    expectDataTypeToBe,
    expectGroupSelectToNotBeVisible,
    expectNoDataItemsToBeSelected,
    inputSearchTerm,
    switchDataTypeTo,
    clearSearchTerm,
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
    expectRelativePeriodTypeToBe,
    expectRelativeToBeSelected,
    expectNoPeriodsToBeSelected,
    expectRelativePeriodTypeSelectToContain,
    expectFixedPeriodTypeSelectToContain,
    openRelativePeriodsTypeSelect,
    selectPeriodType,
    switchToFixedPeriods,
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
        Fixed period year

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
