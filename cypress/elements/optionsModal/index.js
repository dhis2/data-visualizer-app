const tabBarEl = 'options-modal-tab-bar'
const optionsModalEl = 'options-modal'
const optionsModalUpdateButtonEl = 'options-modal-action-confirm'
const optionsModalHideButtonEl = 'options-modal-action-cancel'

export const OPTIONS_TAB_STYLE = 'Style'
export const OPTIONS_TAB_DATA = 'Data'
export const OPTIONS_TAB_AXES = 'Axes'
export const OPTIONS_TAB_OUTLIERS = 'Outliers'
export const OPTIONS_TAB_SERIES = 'Series'
export const OPTIONS_TAB_LEGEND = 'Legend'

export const clickOptionsTab = (name) =>
    cy.getBySel(tabBarEl).contains(name).click()

export const expectOptionsTabToBeHidden = (name) =>
    cy.getBySel(tabBarEl).should('not.contain', name)

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
    changeColor,
} from './fontStyles.js'

export {
    setAxisTitleText,
    expectAxisTitleToBeValue,
    setAxisRangeMinValue,
    expectAxisRangeMinToBeValue,
    setAxisRangeMaxValue,
    expectAxisRangeMaxToBeValue,
    switchAxesTabTo,
    setAxisTitleTextModeTo,
    setAxisDecimalsValue,
    setAxisStepsValue,
} from './axes.js'

export {
    clickTrendLineCheckbox,
    selectTrendLineType,
    clickTargetLineCheckbox,
    setTargetLineValue,
    setTargetLineLabel,
    clickBaseLineCheckbox,
    setBaseLineLabel,
    setBaseLineValue,
} from './lines.js'

export { setCustomSubtitle } from './subtitle.js'

export { clickOutliersCheckbox } from './outliers.js'

export { setItemToAxis, setItemToType } from './series.js'

export {
    toggleLegend,
    expectLegendToBeEnabled,
    expectLegendDisplayStrategyToBeByDataItem,
    expectLegendDisplayStrategyToBeFixed,
    changeDisplayStrategyToFixed,
    changeFixedLegendSet,
    expectFixedLegendSetToBe,
    changeDisplayStyleToText,
    changeDisplayStyleToFill,
    expectLegendDisplayStyleToBeText,
    expectLegendDisplayStyleToBeFill,
    expectSingleValueToNotHaveTextColor,
    expectSingleValueToHaveTextColor,
    expectSingleValueToNotHaveBackgroundColor,
    expectSingleValueToHaveBackgroundColor,
    toggleLegendKeyOption,
    expectLegendKeyOptionToBeEnabled,
    expectLegendKeyOptionToBeDisabled,
    expectLegendKeyToBeHidden,
    expectLegendKeyToBeVisible,
    expectLegedKeyItemAmountToBe,
} from './legend.js'
