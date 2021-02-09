import { DIMENSION_ID_DATA } from '@dhis2/analytics'

import { expectDimensionModalToBeVisible } from '.'

const optionEl = 'data-dimension-transfer-option'
const selectableItemsEl = 'data-dimension-transfer-sourceoptions'
const selectedItemsEl = 'data-dimension-transfer-pickedoptions'
const dataTypesSelectButtonEl = 'data-dimension-data-types-select-field-content'
const groupSelectButtonEl = 'data-dimension-groups-select-field-content'
const dataElementsOptionEl =
    'data-dimension-data-types-select-field-option-DATA_ELEMENT'
const addAllButtonEl = 'data-dimension-transfer-actions-addall'
const removeAllButtonEl = 'data-dimension-transfer-actions-removeall'
const tabbarEl = 'dialog-manager-modal-tabs'
const rightHeaderEl = 'data-dimension-transfer-rightheader'

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

export const expectDataDimensionModalWarningToContain = text =>
    cy.getBySel(rightHeaderEl).should('contain', text)

export const expectDataItemToBeInactive = id =>
    cy
        .get(`[data-value="${id}"]`)
        .children()
        .first()
        .should('have.class', 'inactive')

export const selectDataElements = dataElements => {
    switchToDataType(dataElementsOptionEl)
    dataElements.forEach(item => clickUnselectedItem(item))
}

export const expectDataItemToBeSelected = dataItem =>
    cy.getBySel(selectedItemsEl).should('contain', dataItem)

export const expectDataItemToBeSelectable = dataItem =>
    cy.getBySel(selectableItemsEl).should('contain', dataItem)

export const selectAllDataItems = () => cy.getBySel(addAllButtonEl).click()

export const unselectAllDataItems = () => cy.getBySel(removeAllButtonEl).click()

export const selectIndicators = indicators =>
    indicators.forEach(item => clickUnselectedItem(item))

export const switchDataTab = tabName =>
    cy.getBySel(tabbarEl).contains(tabName).click()

export const clickUnselectedItem = item =>
    //FIXME: Wait for the loading spinner to disappear before trying to click an item
    cy.getBySel(selectableItemsEl).contains(item).dblclick()

export const clickSelectedItem = item =>
    cy.getBySel(selectedItemsEl).contains(item).dblclick()

export const expectDataTypeToBe = type =>
    cy.getBySel(dataTypesSelectButtonEl).should('contain', type)

export const expectGroupSelectToNotBeVisible = () =>
    cy.getBySel(groupSelectButtonEl).should('not.exist')

const switchToDataType = dataType => {
    cy.getBySel(dataTypesSelectButtonEl).click()
    cy.getBySel(dataType).click()
}

/* TODO: Find a way to use random items
    export const replaceDataItemsWithRandomDataElements = amount => {
        expectDataDimensionModalToBeVisible()
        unselectAllDataItems()
        selectRandomDataElements(amount)
        expectDataItemsAmountToBeSelected(amount)
    }

    const selectRandomDataElements = amount => {
        switchToDataType(dataElementsOptionEl)
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
