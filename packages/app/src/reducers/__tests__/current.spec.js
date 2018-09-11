import reducer, { DEFAULT_CURRENT, actionTypes } from '../current';

describe('reducer: current', () => {
    it('should return the default state', () => {
        const actualState = reducer(undefined, { type: 'NO_MATCH' });

        expect(actualState).toEqual(DEFAULT_CURRENT);
    });

    it('SET_CURRENT: should set the new current', () => {
        const current = {};
        const actualState = reducer(undefined, {
            type: actionTypes.SET_CURRENT,
            value: current,
        });

        expect(current).toEqual(actualState);
    });
});
