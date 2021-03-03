const tabBarEl = 'options-modal-tab-bar'
const optionsModalEl = 'options-modal'
const optionsModalUpdateButtonEl = 'options-modal-action-confirm'
const optionsModalHideButtonEl = 'options-modal-action-cancel'

export const OPTIONS_TAB_STYLE = 'Style'
export const OPTIONS_TAB_DATA = 'Data'
export const OPTIONS_TAB_AXES = 'Axes'
export const OPTIONS_TAB_OUTLIERS = 'Outliers'
export const TYPE_TITLE = 'title'
export const TYPE_SUBTITLE = 'subtitle'

export const clickOptionsTab = name =>
    cy.getBySel(tabBarEl).contains(name).click()

export const expectOptionsModalToBeVisible = () =>
    cy.getBySel(optionsModalEl).should('be.visible')

export const expectOptionsModalToNotBeVisible = () =>
    cy.getBySelLike(optionsModalEl).should('not.exist')

export const clickOptionsModalUpdateButton = () =>
    cy.getBySel(optionsModalUpdateButtonEl).click()

export const clickOptionsModalHideButton = () =>
    cy.getBySel(optionsModalHideButtonEl).click()

export {
    changeTextAlignOption,
    changeFontSizeOption,
    clickBoldButton,
    clickItalicButton,
} from './fontStyles'

export {
    enableAxisTitle,
    setAxisTitle,
    expectAxisTitleToBeValue,
    setAxisRangeMinValue,
    expectAxisRangeMinToBeValue,
    setAxisRangeMaxValue,
    expectAxisRangeMaxToBeValue,
} from './axes'

export { clickTrendLineCheckbox, selectTrendLineType } from './lines'

export { setCustomSubtitle } from './subtitle'

export { enableOutliers } from './outliers'
