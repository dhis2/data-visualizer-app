import reducer, { DEFAULT_SETTINGS, actionTypes } from '../settings';

const currentState = {
    keyAnalysisRelativePeriod: 'LAST_12_MONTHS',
    keyAnalysisDisplayProperty: 'name',
};

describe('reducer: settings', () => {
    it('should return the default state', () => {
        const actualState = reducer(DEFAULT_SETTINGS, { type: 'NO_MATCH' });

        expect(actualState).toEqual(DEFAULT_SETTINGS);
    });

    it(`${actionTypes.SET_SETTINGS}: should set settings`, () => {
        const stateToSet = {
            keyAnalysisRelativePeriod: 'LAST_4_QUARTERS',
            keyAnalysisDisplayProperty: 'shortName',
        };

        const actualState = reducer(currentState, {
            type: actionTypes.SET_SETTINGS,
            value: stateToSet,
        });

        const expectedState = stateToSet;

        expect(actualState).toEqual(expectedState);
    });

    it(`${actionTypes.ADD_SETTINGS}: should add settings`, () => {
        const stateToAdd = {
            keyAnalysisDisplayProperty: 'shortName',
            keyAnalysisDigitGroupSeparator: 'SPACE',
        };

        const actualState = reducer(currentState, {
            type: actionTypes.ADD_SETTINGS,
            value: stateToAdd,
        });

        const expectedState = {
            // Keep this prop
            keyAnalysisRelativePeriod: 'LAST_12_MONTHS',
            // Update this prop
            keyAnalysisDisplayProperty: 'shortName',
            // Add this prop
            keyAnalysisDigitGroupSeparator: 'SPACE',
        };

        expect(actualState).toEqual(expectedState);
    });
});
