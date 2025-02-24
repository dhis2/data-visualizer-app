import { DIMENSION_ID_DATA } from '@dhis2/analytics'
import { clearInput, typeInput } from '../common.js'
import {
    expectDimensionModalToBeVisible,
    expectSourceToNotBeLoading,
    selectItemByDoubleClick,
} from './index.js'

const optionContentEl = 'data-dimension-transfer-option-content'
const optionInfoButtonEl = 'data-dimension-transfer-option-info-button'
const optionInfoTableEl = 'data-dimension-info-table'
const selectableItemsEl = 'data-dimension-transfer-sourceoptions'
const selectedItemsEl = 'data-dimension-transfer-pickedoptions'
const dataTypesSelectButtonEl =
    'data-dimension-left-header-data-types-select-field-content'
const dataTypesSelectHelpEl =
    'data-dimension-left-header-data-types-select-field-help'
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
const tabbarEl = 'dialog-manager-modal-tabs'
const rightHeaderEl = 'data-dimension-transfer-rightheader'
const searchFieldEl = 'data-dimension-left-header-filter-input-field-content'
const emptySourceEl = 'data-dimension-empty-source'

export const expectDataItemsToBeInSource = (items) => {
    cy.getBySelLike('transfer-sourceoptions').should(($elems) => {
        const $container = $elems.first()
        expect($container).to.have.class('container')
        const $options = $container.find('[data-test*="transfer-option"]')
        items.forEach((item) => expect($options).to.contain(item))
    })
}

export const expectDataItemsToBeInOptionViewModeSource = (items) => {
    cy.getBySelLike('option-view-mode-transfer-sourceoptions').should(
        ($elems) => {
            const $container = $elems.first()
            expect($container).to.have.class('container')
            const $options = $container.find('[data-test*="transfer-option"]')
            items.forEach((item) => expect($options).to.contain(item))
        }
    )
}

export const expectDataDimensionModalToBeVisible = () =>
    expectDimensionModalToBeVisible(DIMENSION_ID_DATA)

export const expectNoDataItemsToBeSelected = () =>
    cy.getBySel(selectedItemsEl).should('contain', 'No items selected')

export const expectDataDimensionModalWarningToContain = (text) =>
    cy.getBySel(rightHeaderEl).should('contain', text)

export const expectDataItemToShowDataType = (id, type) =>
    cy
        .get(`[data-value="${id}"]`)
        .findBySel(optionContentEl)
        .find('.type')
        .should('contain', type)

export const expectDataItemToShowInfoTable = (id) => {
    cy.get(`[data-value="${id}"]`).findBySel(optionInfoButtonEl).click()
    cy.getBySel(optionInfoTableEl).contains('Name')
    cy.getBySel(optionInfoTableEl).closePopper()
}

export const expectDataItemToBeInactive = (id) =>
    cy
        .get(`[data-value="${id}"]`)
        .findBySel(optionContentEl)
        .should('have.class', 'inactive')

export const scrollSourceToBottom = () => {
    cy.getBySel(selectableItemsEl).scrollTo('bottom')
}

export const selectDataElements = (dataElements) => {
    expectSourceToNotBeLoading()
    switchDataTypeTo('Data elements')
    expectDataItemsToBeInSource(dataElements)
    dataElements.forEach((item) => selectItemByDoubleClick(item))
}

export const selectDataItems = (dataItems) => {
    expectSourceToNotBeLoading()
    expectDataItemsToBeInSource(dataItems)
    dataItems.forEach((item) => selectItemByDoubleClick(item))
}

export const selectFirstDataItem = () =>
    cy.getBySel(selectableItemsEl).findBySel(optionContentEl).eq(0).dblclick()

export const selectIndicators = (indicators) => {
    expectSourceToNotBeLoading()
    switchDataTypeTo('Indicators')
    expectDataItemsToBeInSource(indicators)
    indicators.forEach((item) => selectItemByDoubleClick(item))
}

export const switchDataTab = (tabName) => {
    cy.getBySel(tabbarEl).contains(tabName).click()
}

export const expectDataTypeToBe = (type) =>
    cy.getBySel(dataTypesSelectButtonEl).should('contain', type)

export const expectDataTypeSelectHelpToContain = (text) =>
    cy.getBySel(dataTypesSelectHelpEl).should('have.text', text)

export const expectGroupSelectToNotBeVisible = () =>
    cy.getBySel(groupSelectButtonEl).should('not.exist')

export const expectGroupSelectToBeVisible = () =>
    cy.getBySel(groupSelectButtonEl).should('exist')

export const expectGroupSelectToBe = (group) =>
    cy.getBySel(groupSelectButtonEl).should('contain', group)

export const switchGroupTo = (group) => {
    cy.getBySel(groupSelectButtonEl).click()
    cy.getBySelLike(groupSelectOptionEl).should('have.length.least', 2)
    cy.getBySelLike('singleselect-loading').should('not.exist')
    cy.getBySelLike(groupSelectOptionEl).contains(group).click()
}

export const switchGroupToAll = () => {
    cy.getBySel(groupSelectButtonEl).click()
    cy.getBySelLike(groupSelectOptionEl).eq(0).click()
}

export const expectSubGroupSelectToBeVisible = () =>
    cy.getBySel(subGroupSelectButtonEl).should('exist')

export const expectSubGroupSelectToBe = (group) =>
    cy.getBySel(subGroupSelectButtonEl).should('contain', group)

export const switchSubGroupTo = (group) => {
    cy.getBySel(subGroupSelectButtonEl).click()
    cy.getBySelLike(subGroupSelectOptionEl).contains(group).click()
}

export const switchDataTypeTo = (dataType) => {
    cy.getBySel(dataTypesSelectButtonEl).then(($typesSelect) => {
        // account for disabled type selector with preselected item
        if (!$typesSelect.text().includes(dataType)) {
            cy.getBySel(dataTypesSelectButtonEl).click()
            cy.getBySelLike(dataTypeSelectOptionEl).contains(dataType).click()
        }
    })
}

export const switchDataTypeToAll = () => {
    cy.getBySel(dataTypesSelectButtonEl).click()
    cy.getBySelLike(dataTypeSelectOptionEl).eq(0).click()
}

export const inputSearchTerm = (searchTerm) => {
    typeInput(searchFieldEl, searchTerm)
}

export const clearSearchTerm = () => {
    clearInput(searchFieldEl)
}

export const expectEmptySourceMessageToBe = (message) => {
    cy.getBySel(emptySourceEl).should('contain', message)
}

export const clickEDIEditButton = (item) =>
    cy
        .getBySel(optionContentEl)
        .contains(item)
        .parent()
        .findBySel('data-dimension-transfer-option-edit-calculation-button')
        .click()

export const clickOptionViewModeButton = (item) =>
    cy
        .getBySel(optionContentEl)
        .contains(item)
        .parent()
        .findBySel('data-dimension-transfer-option-option-set-button')
        .click()

export const clickOptionViewModeBackButton = () =>
    cy.getBySel('data-dimension-option-set-back-button').click()

export const expectSelectableDataItemsAmountToBe = (amount) =>
    cy.getBySelLike('transfer-sourceoptions').should(($elems) => {
        const $container = $elems.first()
        expect(
            $container.find('[data-test="data-dimension-transfer-option"]')
        ).to.have.lengthOf(amount)
    })

export const expectSelectableDataItemsAmountToBeLeast = (amount) =>
    cy.getBySelLike('transfer-sourceoptions').should(($elems) => {
        const $container = $elems.first()
        expect(
            $container.find('[data-test="data-dimension-transfer-option"]')
        ).to.have.length.of.at.least(amount)
    })

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
