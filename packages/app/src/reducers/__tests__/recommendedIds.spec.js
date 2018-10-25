import reducer, {
    DEFAULT_RECOMMENDED_IDS,
    SET_RECOMMENDED_IDS,
} from '../recommendedIds';

describe('reducer: recommendedIds', () => {
    const ids = ['abc', 'bcd'];
    const expectedState = {
        fetchedIds: ids,
        previousRequestedIds: [],
    };

    it('should return the default state', () => {
        const actualState = reducer(undefined, { type: 'NO_MATCH' });
        expect(actualState).toEqual(DEFAULT_RECOMMENDED_IDS);
    });

    it(`${SET_RECOMMENDED_IDS}: should set the new recommendedIds`, () => {
        const actualState = reducer(DEFAULT_RECOMMENDED_IDS, {
            type: SET_RECOMMENDED_IDS,
            value: ids,
        });

        expect(actualState).toEqual(expectedState);
    });

    it(`${SET_RECOMMENDED_IDS}: should clear recommendedIds`, () => {
        const testState = {
            fetchedIds: ids,
            previousRequestedIds: [],
        };

        const actualState = reducer(testState, {
            type: SET_RECOMMENDED_IDS,
            value: undefined,
        });

        expect(actualState).toEqual(DEFAULT_RECOMMENDED_IDS);
    });
});
