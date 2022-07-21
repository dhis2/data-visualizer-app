import reducer, { DEFAULT_USER, RECEIVED_USER } from '../user.js'

describe('reducer: user', () => {
    it('should return the default state', () => {
        const actualState = reducer(undefined, {})

        expect(actualState).toEqual(DEFAULT_USER)
    })

    it('should handle RECEIVED_USER action', () => {
        const id = '35abc42'
        const username = 'tinkywinky'

        const action = {
            type: RECEIVED_USER,
            value: {
                id,
                username,
                authorities: [
                    'ALL'
                ],
            },
        }

        const expectedState = {
            id,
            username,
            isSuperuser: true,
        }

        const actualState = reducer(DEFAULT_USER, action)
        expect(actualState).toEqual(expectedState)
    })
})
