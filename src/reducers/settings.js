export const ADD_SETTINGS = 'ADD_SETTINGS'

export const DEFAULT_SETTINGS = {
    keyDateFormat: 'yyyy-MM-dd',
    keyAnalysisRelativePeriod: 'LAST_12_MONTHS',
    keyAnalysisDigitGroupSeparator: 'SPACE',
    keyIgnoreAnalyticsApprovalYearThreshold: -1,
    displayNameProperty: 'displayName',
    uiLocale: 'en',
    rootOrganisationUnits: [],
}

export default (state = DEFAULT_SETTINGS, action) => {
    switch (action.type) {
        case ADD_SETTINGS: {
            return {
                ...state,
                ...action.value,
            }
        }
        default:
            return state
    }
}

// Selectors

export const sGetSettings = (state) => state.settings

export const sGetSettingsDisplayNameProperty = (state) =>
    sGetSettings(state).displayNameProperty

export const sGetSettingsDigitGroupSeparator = (state) =>
    sGetSettings(state).keyAnalysisDigitGroupSeparator

export const sGetRootOrgUnits = (state) =>
    sGetSettings(state).rootOrganisationUnits

export const sGetRelativePeriod = (state) =>
    sGetSettings(state).keyAnalysisRelativePeriod

export const sGetUiLocale = (state) => sGetSettings(state).uiLocale
