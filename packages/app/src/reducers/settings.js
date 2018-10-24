export const SET_SETTINGS = 'SET_SETTINGS';
export const ADD_SETTINGS = 'ADD_SETTINGS';

export const DEFAULT_SETTINGS = {
    keyDateFormat: 'yyyy-MM-dd',
    keyAnalysisRelativePeriod: 'LAST_12_MONTHS',
    keyAnalysisDigitGroupSeparator: 'SPACE',
    displayNameProperty: 'name',
    uiLocale: 'en',
};

export default (state = DEFAULT_SETTINGS, action) => {
    switch (action.type) {
        case SET_SETTINGS: {
            return Object.assign({}, action.value);
        }
        case ADD_SETTINGS: {
            return {
                ...state,
                ...action.value,
            };
        }
        default:
            return state;
    }
};

// Selectors

export const sGetSettings = state => state.settings;
export const sGetDisplayNameProperty = state =>
    state.settings.displayNameProperty;
