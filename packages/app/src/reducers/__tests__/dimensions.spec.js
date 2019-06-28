import { FIXED_DIMENSIONS } from '@dhis2/analytics';

import reducer, { SET_DIMENSIONS } from '../dimensions';

describe('reducer: dimensions', () => {
    const dimensionsToSet = {
        abc: {
            id: 'abc',
            name: 'ABC',
        },
    };

    it('should return the default state', () => {
        const actualState = reducer(undefined, { type: 'NO_MATCH' });
        expect(actualState).toEqual(FIXED_DIMENSIONS);
    });

    it(`${SET_DIMENSIONS}: should set the new dimensions object`, () => {
        const actualState = reducer(
            {},
            {
                type: SET_DIMENSIONS,
                value: dimensionsToSet,
            }
        );

        const expectedState = {
            ...FIXED_DIMENSIONS,
            ...dimensionsToSet,
        };

        expect(actualState).toEqual(expectedState);
    });
});
