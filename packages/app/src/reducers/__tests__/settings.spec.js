import reducer, { DEFAULT_SETTINGS, ADD_SETTINGS } from '../settings'

describe('reducer: settings', () => {
    const currentState = {
        keyAnalysisRelativePeriod: 'LAST_12_MONTHS',
        keyAnalysisDisplayProperty: 'name',
    }

    it('should return the default state', () => {
        const actualState = reducer(DEFAULT_SETTINGS, { type: 'NO_MATCH' })

        expect(actualState).toEqual(DEFAULT_SETTINGS)
    })

    it(`${ADD_SETTINGS}: should add settings`, () => {
        const stateToAdd = {
            keyAnalysisDisplayProperty: 'shortName',
            keyAnalysisDigitGroupSeparator: 'SPACE',
        }

        const actualState = reducer(currentState, {
            type: ADD_SETTINGS,
            value: stateToAdd,
        })

        const expectedState = {
            // Keep this prop
            keyAnalysisRelativePeriod: 'LAST_12_MONTHS',
            // Update this prop
            keyAnalysisDisplayProperty: 'shortName',
            // Add this prop
            keyAnalysisDigitGroupSeparator: 'SPACE',
        }

        expect(actualState).toEqual(expectedState)
    })
})
