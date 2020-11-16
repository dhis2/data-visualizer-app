const tabBarEl = 'options-modal-tab-bar'
const optionsModalEl = 'options-modal'
const optionsModalUpdateButtonEl = 'options-modal-action-confirm'
const optionsModalHideButtonEl = 'options-modal-action-cancel'

export const OPTIONS_TAB_STYLE = 'Style'
export const OPTIONS_TAB_DATA = 'Data'
export const OPTIONS_TAB_AXES = 'Axes'
export const TYPE_TITLE = 'title'
export const TYPE_SUBTITLE = 'subtitle'

export const clickOptionsTab = name =>
    cy
        .getBySel(tabBarEl)
        .contains(name)
        .click()

export const expectOptionsModalToBeVisible = () =>
    cy.getBySel(optionsModalEl).should('be.visible')

export const expectOptionsModalToNotBeVisible = () =>
    cy.getBySelLike(optionsModalEl).should('not.be.visible')

export const clickOptionsModalUpdateButton = () => {
    cy.getBySel(optionsModalUpdateButtonEl).click()
    expectOptionsModalToNotBeVisible()
}
export const clickOptionsModalHideButton = () => {
    cy.getBySel(optionsModalHideButtonEl).click()
    expectOptionsModalToNotBeVisible()
}

export {
    changeTextAlignOption,
    changeFontSizeOption,
    clickBoldButton,
    clickItalicButton,
} from './fontStyles'

export {
    enableVerticalAxisTitle,
    setVerticalAxisTitle,
    expectVerticalAxisTitleToBeValue,
    setVerticalAxisRangeMinValue,
    expectVerticalAxisRangeMinToBeValue,
    setVerticalAxisRangeMaxValue,
    expectVerticalAxisRangeMaxToBeValue,
} from './verticalAxis'

export { enableTrendLine, selectTrendLineType } from './lines'

export { setCustomSubtitle } from './subtitle'
