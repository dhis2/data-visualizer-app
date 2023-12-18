import { checkCheckbox, typeInput } from '../common.js'

const trendLineCheckboxEl = 'option-trend-line-checkbox'
const trendLineSelectEl = 'option-trend-line-select'
const trendLineSelectOptionEl = 'option-trend-line-option'
const targetLineCheckboxEl = 'option-target-line-checkbox'
const targetLineValueInputEl = 'option-target-line-value-input'
const targetLineLabelInputEl = 'option-target-line-label-input'
const baseLineCheckboxEl = 'option-base-line-checkbox'
const baseLineValueInputEl = 'option-base-line-value-input'
const baseLineLabelInputEl = 'option-base-line-label-input'

export const checkTrendLineCheckbox = () => checkCheckbox(trendLineCheckboxEl)

export const selectTrendLineType = (optionName) => {
    cy.getBySel(trendLineSelectEl).findBySel('dhis2-uicore-select').click()
    cy.getBySel(trendLineSelectOptionEl).contains(optionName).click()
}

export const checkTargetLineCheckbox = () => checkCheckbox(targetLineCheckboxEl)

export const setTargetLineValue = (text) =>
    typeInput(targetLineValueInputEl, text)

export const setTargetLineLabel = (text) =>
    typeInput(targetLineLabelInputEl, text)

export const checkBaseLineCheckbox = () => checkCheckbox(baseLineCheckboxEl)

export const setBaseLineValue = (text) => typeInput(baseLineValueInputEl, text)

export const setBaseLineLabel = (text) => typeInput(baseLineLabelInputEl, text)
