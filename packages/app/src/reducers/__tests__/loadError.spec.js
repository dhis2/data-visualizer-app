import reducer, {
    DEFAULT_LOAD_ERROR,
    SET_LOAD_ERROR,
    CLEAR_LOAD_ERROR,
} from '../loadError';

describe('reducer: loadError', () => {
    const error = 'fail!';

    it('should return the default state', () => {
        const actualState = reducer(undefined, { type: 'NO_MATCH' });
        expect(actualState).toEqual(DEFAULT_LOAD_ERROR);
    });

    it(`${SET_LOAD_ERROR}: should set the new loadError`, () => {
        const actualState = reducer(DEFAULT_LOAD_ERROR, {
            type: SET_LOAD_ERROR,
            value: error,
        });

        expect(actualState).toEqual(error);
    });

    it(`${CLEAR_LOAD_ERROR}: should clear the loadError`, () => {
        const actualState = reducer(error, {
            type: CLEAR_LOAD_ERROR,
        });

        expect(actualState).toEqual(DEFAULT_LOAD_ERROR);
    });
});
