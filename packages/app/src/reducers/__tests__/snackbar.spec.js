import reducer, {
    DEFAULT_SNACKBAR,
    RECEIVED_SNACKBAR_MESSAGE,
    CLEAR_SNACKBAR,
} from '../snackbar'

import {
    VARIANT_ERROR,
    VARIANT_WARNING,
} from '../../components/Snackbar/Snackbar'

describe('reducer: snackbar', () => {
    it('should return the default state', () => {
        const actualState = reducer(undefined, {})

        expect(actualState).toEqual(DEFAULT_SNACKBAR)
    })

    it('should handle RECEIVED_SNACKBAR_MESSAGE action object containing only message text', () => {
        const message = 'Loading "tinkywinky" dashboard'

        const action = {
            type: RECEIVED_SNACKBAR_MESSAGE,
            value: {
                message,
            },
        }

        const expectedState = {
            message,
            duration: null,
        }

        const actualState = reducer(DEFAULT_SNACKBAR, action)
        expect(actualState).toEqual(expectedState)
    })

    it('should handle RECEIVED_SNACKBAR_MESSAGE action object with duration previously set', () => {
        const message = 'Loading "tinkywinky" dashboard'
        const duration = 3000

        const action = {
            type: RECEIVED_SNACKBAR_MESSAGE,
            value: {
                message,
            },
        }

        const expectedState = {
            message,
            duration,
        }

        const currentState = {
            message: 'You just won 1000 dollars',
            duration,
        }

        const actualState = reducer(currentState, action)
        expect(actualState).toEqual(expectedState)
    })

    it('should handle RECEIVED_SNACKBAR_MESSAGE action object containing text and duration', () => {
        const message = 'Loading "tinkywinky" dashboard'
        const duration = 3000

        const action = {
            type: RECEIVED_SNACKBAR_MESSAGE,
            value: {
                message,
                duration,
            },
        }

        const expectedState = {
            message,
            duration,
        }

        const actualState = reducer(DEFAULT_SNACKBAR, action)
        expect(actualState).toEqual(expectedState)
    })

    it('should handle the RECEIVED_SNACKBAR_MESSAGE action when passing a variant', () => {
        const message = 'Cannot delete because used in dashboard'
        const variant = VARIANT_WARNING

        const action = {
            type: RECEIVED_SNACKBAR_MESSAGE,
            value: {
                variant,
                message,
            },
        }

        const expectedState = {
            variant,
            message,
            duration: null,
        }

        const actualState = reducer(DEFAULT_SNACKBAR, action)
        expect(actualState).toEqual(expectedState)
    })

    it('should handle the CLEAR_SNACKBAR action', () => {
        const action = {
            type: CLEAR_SNACKBAR,
        }

        const currentState = {
            variant: VARIANT_ERROR,
            message: 'You just won 1000 dollars',
            duration: 3000,
        }

        const actualState = reducer(currentState, action)

        expect(actualState).toEqual(DEFAULT_SNACKBAR)
    })
})
