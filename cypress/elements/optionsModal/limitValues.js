import { typeInput } from '../common.js'

const minValueInput = 'measure-critiera-min-value'
const maxValueInput = 'measure-critiera-max-value'
const minOperatorSelect = 'measure-critiera-min-operator'
const minOperatorSelectOption = 'measure-critiera-min-operator-option'
const maxOperatorSelect = 'measure-critiera-max-operator'
const maxOperatorSelectOption = 'measure-critiera-max-operator-option'

export const setMinValue = (text) => typeInput(minValueInput, text)

export const setMaxValue = (text) => typeInput(maxValueInput, text)

export const changeMinOperator = (optionName) => {
    cy.getBySel(minOperatorSelect).click()
    cy.getBySelLike(minOperatorSelectOption).contains(optionName).click()
}

export const changeMaxOperator = (optionName) => {
    cy.getBySel(maxOperatorSelect).click()
    cy.getBySelLike(maxOperatorSelectOption).contains(optionName).click()
}

export const expectMinValueToBeValue = (value) =>
    cy.getBySel(minValueInput).find('input').should('have.value', value)

export const expectMaxValueToBeValue = (value) =>
    cy.getBySel(maxValueInput).find('input').should('have.value', value)

export const expectMinOperatorToBeOption = (optionName) =>
    cy.getBySel(minOperatorSelect).containsExact(optionName)

export const expectMaxOperatorToBeOption = (optionName) =>
    cy.getBySel(maxOperatorSelect).containsExact(optionName)
