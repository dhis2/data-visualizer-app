import reducer, {
    DEFAULT_LOADING,
    SET_LOAD_ERROR,
    CLEAR_LOAD_ERROR,
    SET_LOADING,
} from '../loader.js'

describe('reducer: loader', () => {
    const errorMsg = 'fail!'

    it('should return the default state', () => {
        const actualState = reducer(undefined, { type: 'NO_MATCH' })
        expect(actualState).toEqual(DEFAULT_LOADING)
    })

    it(`${SET_LOAD_ERROR}: should set the new loadError`, () => {
        const actualState = reducer(DEFAULT_LOADING, {
            type: SET_LOAD_ERROR,
            value: errorMsg,
        })

        expect(actualState.loadingError).toEqual(errorMsg)
    })

    it(`${CLEAR_LOAD_ERROR}: should clear the loadError`, () => {
        const actualState = reducer(
            {
                isLoading: false,
                loadingError: errorMsg,
                isPluginLoading: true,
            },
            { type: CLEAR_LOAD_ERROR }
        )

        expect(actualState).toEqual(DEFAULT_LOADING)
    })

    it(`${SET_LOADING}: should set the loading flag`, () => {
        const actualState = reducer(DEFAULT_LOADING, {
            type: SET_LOADING,
            value: true,
        })

        expect(actualState.isLoading).toEqual(true)
    })
})
