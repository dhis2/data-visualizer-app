import { DIMENSION_ID_DATA } from '@dhis2/analytics'

import { expectDimensionModalToBeVisible } from '.'

const unselectedListEl = 'data-dimension-item-selector-unselected-items-list'
//const unselectedItemEl = 'data-dimension-item-selector-unselected-items-list-item'
const dataTypesSelectButtonEl = 'data-dimension-data-types-select-field-content'
//const selctedListEl = 'data-dimension-item-selector-selected-items-list'
const selectedItemEl = 'data-dimension-item-selector-selected-items-list-item'
const dataElementsOptionEl =
    'data-dimension-data-types-select-field-option-dataElements'
const removeAllButtonEl =
    'data-dimension-item-selector-selected-items-deselect-all-button'
//const addAllButtonEl = 'data-dimension-item-selector-unselected-items-select-all-button'

export const expectDataDimensionModalToBeVisible = () =>
    expectDimensionModalToBeVisible(DIMENSION_ID_DATA)

export const removeAllDataItems = () => cy.getBySel(removeAllButtonEl).click()

export const expectNoDataItemsToBeSelected = () =>
    cy
        .getBySel(selectedItemEl)
        .should('not.be.visible')
        .and('have.length', 0)

export const expectDataItemsAmountToBeSelected = amount =>
    cy
        .getBySel(selectedItemEl)
        .should('not.be.visible')
        .and('have.length', amount)

export const selectDataElements = dataElements => {
    switchToDataType(dataElementsOptionEl)
    dataElements.forEach(item => clickUnselectedItem(item))
}

export const selectIndicators = indicators =>
    indicators.forEach(item => clickUnselectedItem(item))

const clickUnselectedItem = item =>
    cy
        .getBySel(unselectedListEl)
        .contains(item)
        .dblclick()

const switchToDataType = dataType => {
    cy.getBySel(dataTypesSelectButtonEl).click()
    cy.getBySel(dataType).click()
}

/* TODO: Find a way to use random items
    export const replaceDataItemsWithRandomDataElements = amount => {
        expectDataDimensionModalToBeVisible()
        removeAllDataItems()
        selectRandomDataElements(amount)
        expectDataItemsAmountToBeSelected(amount)
    }

    const selectRandomDataElements = amount => {
        switchToDataType(dataElementsOptionEl)
        selectRandomItems(amount)
    }

    const selectRandomItems = amount => {
        for (let i = 0; i < amount; i++) {
            cy.getBySel(unselectedItemEl)
                .its('length')
                .then(size => {
                    cy.getBySel(unselectedListEl)
                        .children()
                        .eq(generateRandomNumber(0, size - 1))
                        .dblclick()
                })
        }
    }
*/
