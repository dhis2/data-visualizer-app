import { typeInput } from '../common'

const titleInputEl = 'axis-title-input'
const rangeMinInputEl = 'axis-range-min-input'
const rangeMaxInputEl = 'axis-range-max-input'
const axisTitleRadiosEl = 'option-chart-title'
const verticalTabsEl = 'axes-tabs'

const getAxisSelector = (axis, selector) => `${axis}-${selector}`

export const switchAxesTabTo = tab =>
    cy.getBySel(verticalTabsEl).containsExact(tab).click()

export const setAxisTitleText = (axis, text) =>
    typeInput(getAxisSelector(axis, titleInputEl), text)

export const setAxisTitleToCustom = () =>
    cy.getBySel(axisTitleRadiosEl).contains('Custom').click()

export const expectAxisTitleToBeValue = (axis, value) =>
    cy
        .getBySel(getAxisSelector(axis, titleInputEl))
        .find('input')
        .scrollIntoView()
        .should('be.visible')
        .and('have.value', value)

export const setAxisRangeMinValue = (axis, value) =>
    cy
        .getBySel(getAxisSelector(axis, rangeMinInputEl))
        .find('input')
        .type(value)

export const expectAxisRangeMinToBeValue = (axis, value) =>
    cy
        .getBySel(getAxisSelector(axis, rangeMinInputEl))
        .find('input')
        .should('be.visible')
        .and('have.value', value)

export const setAxisRangeMaxValue = (axis, value) =>
    cy
        .getBySel(getAxisSelector(axis, rangeMaxInputEl))
        .find('input')
        .type(value)

export const expectAxisRangeMaxToBeValue = (axis, value) =>
    cy
        .getBySel(getAxisSelector(axis, rangeMaxInputEl))
        .find('input')
        .should('be.visible')
        .and('have.value', value)
