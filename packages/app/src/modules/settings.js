export const SYSTEM_SETTINGS = [
    'keyDateFormat',
    'keyAnalysisRelativePeriod',
    'keyAnalysisDigitGroupSeparator',
];

export const extractUserSettings = settings => {
    const nameProp = settings.keyAnalysisDisplayProperty;

    return {
        displayNameProperty:
            nameProp === 'name' ? 'displayName' : 'displayShortName',
        uiLocale: settings.keyUiLocale,
    };
};
