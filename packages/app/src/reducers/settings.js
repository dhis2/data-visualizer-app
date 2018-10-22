export const actionTypes = {
    SET_SETTINGS: 'SET_SETTINGS',
    ADD_SETTINGS: 'ADD_SETTINGS',
};

export const DEFAULT_SETTINGS = {
    keyDateFormat: 'yyyy-MM-dd',
    keyAnalysisRelativePeriod: 'LAST_12_MONTHS',
    keyAnalysisDigitGroupSeparator: 'SPACE',
    keyAnalysisDisplayProperty: 'name',
};

export default (state = DEFAULT_SETTINGS, action) => {
    switch (action.type) {
        case actionTypes.SET_SETTINGS: {
            return Object.assign({}, action.value);
        }
        case actionTypes.ADD_SETTINGS: {
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
