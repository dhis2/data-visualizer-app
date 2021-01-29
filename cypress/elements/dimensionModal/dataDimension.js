import { DIMENSION_ID_DATA } from '@dhis2/analytics'

import { expectDimensionModalToBeVisible } from '.'

const unselectedListEl = 'data-dimension-transfer-sourceoptions'
const dataTypesSelectButtonEl = 'data-dimension-data-types-select-field-content'
const selectedItemEl = 'data-dimension-transfer-pickedoptions'
const dataElementsOptionEl =
    'data-dimension-data-types-select-field-option-DATA_ELEMENT'
const removeAllButtonEl = 'data-dimension-transfer-actions-removeall'
//const addAllButtonEl = 'data-dimension-item-selector-unselected-items-select-all-button'
const tabbarEl = 'dialog-manager-modal-tabs'
const rightHeaderEl = 'data-dimension-transfer-rightheader'

export const expectDataDimensionModalToBeVisible = () =>
    expectDimensionModalToBeVisible(DIMENSION_ID_DATA)

export const removeAllDataItems = () => cy.getBySel(removeAllButtonEl).click()

export const expectNoDataItemsToBeSelected = () =>
    cy.getBySel(selectedItemEl).should('not.exist')

export const expectDataItemsAmountToBeSelected = amount =>
    cy.getBySel(selectedItemEl).should('be.visible').and('have.length', amount)

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

export const selectIndicators = indicators =>
    indicators.forEach(item => clickUnselectedItem(item))

export const switchDataTab = tabName =>
    cy.getBySel(tabbarEl).contains(tabName).click()

const clickUnselectedItem = item =>
    //FIXME: Wait for the loading spinner to disappear before trying to click an item
    cy.getBySel(unselectedListEl).contains(item).dblclick()

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
