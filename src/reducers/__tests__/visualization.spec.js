import reducer, {
    DEFAULT_VISUALIZATION,
    SET_VISUALIZATION,
    CLEAR_VISUALIZATION,
} from '../visualization.js'

describe('reducer: visualization', () => {
    it('should return the default state', () => {
        const actualState = reducer(undefined, { type: 'NO_MATCH' })

        expect(actualState).toEqual(DEFAULT_VISUALIZATION)
    })

    it('SET_VISUALIZATION: should set the new visualization', () => {
        const visualization = {}
        const actualState = reducer(undefined, {
            type: SET_VISUALIZATION,
            value: visualization,
        })

        expect(visualization).toEqual(actualState)
    })

    it('CLEAR_VISUALIZATION should set the default state', () => {
        const actualState = reducer(
            { currentVal: 123 },
            { type: CLEAR_VISUALIZATION }
        )

        expect(actualState).toEqual(DEFAULT_VISUALIZATION)
    })
})
