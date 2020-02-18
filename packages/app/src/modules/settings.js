export const SYSTEM_SETTINGS = [
    'keyDateFormat',
    'keyAnalysisRelativePeriod',
    'keyAnalysisDigitGroupSeparator',
    'keyIgnoreAnalyticsApprovalYearThreshold',
]

export const extractUserSettings = settings => {
    const nameProp = settings.keyAnalysisDisplayProperty

    return {
        displayNameProperty:
            nameProp === 'name' ? 'displayName' : 'displayShortName',
        uiLocale: settings.keyUiLocale,
    }
}
