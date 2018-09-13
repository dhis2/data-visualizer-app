import reducer, { DEFAULT_VISUALIZATION, actionTypes } from '../visualization';

describe('reducer: visualization', () => {
    it('should return the default state', () => {
        const actualState = reducer(undefined, { type: 'NO_MATCH' });

        expect(actualState).toEqual(DEFAULT_VISUALIZATION);
    });

    it('SET_VISUALIZATION: should set the new visualization', () => {
        const visualization = {};
        const actualState = reducer(undefined, {
            type: actionTypes.SET_VISUALIZATION,
            value: visualization,
        });

        expect(visualization).toEqual(actualState);
    });
});
