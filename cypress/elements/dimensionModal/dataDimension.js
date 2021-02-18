import { DIMENSION_ID_DATA } from '@dhis2/analytics'

import { expectDimensionModalToBeVisible } from '.'

const optionEl = 'data-dimension-transfer-option'
const optionContentEl = 'data-dimension-transfer-option-content'
const selectableItemsEl = 'data-dimension-transfer-sourceoptions'
const selectedItemsEl = 'data-dimension-transfer-pickedoptions'
const dataTypesSelectButtonEl =
    'data-dimension-left-header-data-types-select-field-content'
const dataTypeSelectOptionEl =
    'data-dimension-left-header-data-types-select-field-option'
const groupSelectButtonEl =
    'data-dimension-left-header-groups-select-field-content'
const groupSelectOptionEl =
    'data-dimension-left-header-groups-select-field-option'
const subGroupSelectButtonEl =
    'data-dimension-left-header-sub-group-select-field-content'
const subGroupSelectOptionEl =
    'data-dimension-left-header-sub-group-select-field-option'
const addAllButtonEl = 'data-dimension-transfer-actions-addall'
const removeAllButtonEl = 'data-dimension-transfer-actions-removeall'
const addOneButtonEl = 'data-dimension-transfer-actions-addindividual'
const removeOneButtonEl = 'data-dimension-transfer-actions-removeindividual'
const tabbarEl = 'dialog-manager-modal-tabs'
const rightHeaderEl = 'data-dimension-transfer-rightheader'
const searchFieldEl = 'data-dimension-left-header-filter-input-field-content'
const emptySourceEl = 'data-dimension-empty-source'
const leftContainerEl = 'data-dimension-transfer-leftside'
const loadingEl = 'dhis2-uicore-circularloader'

export const expectDataDimensionModalToBeVisible = () =>
    expectDimensionModalToBeVisible(DIMENSION_ID_DATA)

export const expectNoDataItemsToBeSelected = () =>
    cy.getBySel(selectedItemsEl).should('contain', 'No items selected')

export const expectDataItemsSelectedAmountToBeLeast = amount =>
    cy
        .getBySel(selectedItemsEl)
        .findBySel(optionEl)
        .should('have.length.least', amount)

export const expectDataItemsSelectableAmountToBeLeast = amount =>
    cy
        .getBySel(selectableItemsEl)
        .findBySel(optionEl)
        .should('have.length.least', amount)

export const expectDataItemsSelectableAmountToBe = amount =>
    cy
        .getBySel(selectableItemsEl)
        .findBySel(optionEl)
        .should('have.length', amount)

export const expectDataItemsSelectedAmountToBe = amount =>
    cy
        .getBySel(selectedItemsEl)
        .findBySel(optionEl)
        .should('have.length', amount)

export const expectDataDimensionModalWarningToContain = text =>
    cy.getBySel(rightHeaderEl).should('contain', text)

export const expectDataItemToBeInactive = id =>
    cy
        .get(`[data-value="${id}"]`)
        .findBySel(optionContentEl)
        .should('have.class', 'inactive')

export const scrollSourceToBottom = () => {
    cy.getBySel(selectableItemsEl).scrollTo('bottom')
    expectSourceToNotBeLoading()
}

export const selectDataElements = dataElements => {
    switchDataTypeTo('Data elements')
    dataElements.forEach(item => selectItemByDoubleClick(item))
}

export const expectDataItemToBeSelected = dataItem =>
    cy.getBySel(selectedItemsEl).should('contain', dataItem)

export const expectDataItemToBeSelectable = dataItem =>
    cy.getBySel(selectableItemsEl).should('contain', dataItem)

export const selectAllDataItems = () => {
    cy.getBySel(addAllButtonEl).click()
    expectSourceToNotBeLoading()
}

export const selectFirstDataItem = () =>
    cy.getBySel(selectableItemsEl).findBySel(optionContentEl).eq(0).dblclick()

export const unselectAllDataItems = () => {
    cy.getBySel(removeAllButtonEl).click()
    expectSourceToNotBeLoading()
}

export const selectIndicators = indicators => {
    switchDataTypeTo('Indicators')
    indicators.forEach(item => selectItemByDoubleClick(item))
}

export const switchDataTab = tabName => {
    cy.getBySel(tabbarEl).contains(tabName).click()
    expectSourceToNotBeLoading()
}

export const unselectItemByDoubleClick = item =>
    cy.getBySel(selectedItemsEl).contains(item).dblclick()

export const selectItemByDoubleClick = item =>
    cy.getBySel(selectableItemsEl).contains(item).dblclick()

export const unselectItemByButton = item => {
    cy.getBySel(selectedItemsEl).contains(item).click()
    cy.getBySel(removeOneButtonEl).click()
}

export const selectItemByButton = item => {
    cy.getBySel(selectableItemsEl).contains(item).click()
    cy.getBySel(addOneButtonEl).click()
}

export const expectDataTypeToBe = type =>
    cy.getBySel(dataTypesSelectButtonEl).should('contain', type)

export const expectGroupSelectToNotBeVisible = () =>
    cy.getBySel(groupSelectButtonEl).should('not.exist')

export const expectGroupSelectToBeVisible = () =>
    cy.getBySel(groupSelectButtonEl).should('exist')

export const expectGroupSelectToBe = group =>
    cy.getBySel(groupSelectButtonEl).should('contain', group)

export const switchGroupTo = group => {
    cy.getBySel(groupSelectButtonEl).click()
    cy.getBySelLike(groupSelectOptionEl).contains(group).click()
    expectSourceToNotBeLoading()
}

export const switchGroupToAll = () => {
    cy.getBySel(groupSelectButtonEl).click()
    cy.getBySelLike(groupSelectOptionEl).eq(0).click()
    expectSourceToNotBeLoading()
}

export const expectSubGroupSelectToBeVisible = () =>
    cy.getBySel(subGroupSelectButtonEl).should('exist')

export const expectSubGroupSelectToBe = group =>
    cy.getBySel(subGroupSelectButtonEl).should('contain', group)

export const switchSubGroupTo = group => {
    cy.getBySel(subGroupSelectButtonEl).click()
    cy.getBySelLike(subGroupSelectOptionEl).contains(group).click()
    expectSourceToNotBeLoading()
}

export const switchDataTypeTo = dataType => {
    cy.getBySel(dataTypesSelectButtonEl).click()
    cy.getBySelLike(dataTypeSelectOptionEl).contains(dataType).click()
    expectSourceToNotBeLoading()
}

export const switchDataTypeToAll = () => {
    cy.getBySel(dataTypesSelectButtonEl).click()
    cy.getBySelLike(dataTypeSelectOptionEl).eq(0).click()
    expectSourceToNotBeLoading()
}

export const inputSearchTerm = searchTerm => {
    cy.getBySel(searchFieldEl).find('input').type(searchTerm)
    expectSourceToNotBeLoading()
}

export const clearSearchTerm = () => {
    cy.getBySel(searchFieldEl).find('input').clear()
    expectSourceToNotBeLoading()
}

export const expectEmptySourceMessageToBe = message => {
    cy.getBySel(emptySourceEl).should('contain', message)
}

const expectSourceToNotBeLoading = () =>
    cy.getBySel(leftContainerEl).findBySel(loadingEl).should('not.exist')

/* TODO: Find a way to use random items
    export const replaceDataItemsWithRandomDataElements = amount => {
        expectDataDimensionModalToBeVisible()
        unselectAllDataItems()
        selectRandomDataElements(amount)
        expectDataItemsAmountToBeSelected(amount)
    }

    const selectRandomDataElements = amount => {
        switchDataTypeTo("Data elements")
        selectRandomItems(amount)
    }

    const selectRandomItems = amount => {
        for (let i = 0; i < amount; i++) {
            cy.getBySel(selectableItemsEl)
                .its('length')
                .then(size => {
                    cy.getBySel(selectableItemsEl)
                        .children()
                        .eq(generateRandomNumber(0, size - 1))
                        .dblclick()
                })
        }
    }
*/
