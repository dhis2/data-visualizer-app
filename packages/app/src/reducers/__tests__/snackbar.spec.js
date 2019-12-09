import reducer, {
    DEFAULT_SNACKBAR,
    RECEIVED_SNACKBAR_MESSAGE,
    CLOSE_SNACKBAR,
} from '../snackbar'

import {
    VARIANT_INFORMATION,
    VARIANT_ERROR,
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
            variant: VARIANT_INFORMATION,
            message,
            duration: null,
            open: false,
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
            variant: VARIANT_INFORMATION,
            message,
            duration,
            open: true,
        }

        const currentState = {
            variant: VARIANT_INFORMATION,
            message: 'You just won 1000 dollars',
            duration,
            open: true,
        }

        const actualState = reducer(currentState, action)
        expect(actualState).toEqual(expectedState)
    })

    it('should handle RECEIVED_SNACKBAR_MESSAGE action object containing text and duration', () => {
        const message = 'Loading "tinkywinky" dashboard'
        const duration = 3000
        const open = true

        const action = {
            type: RECEIVED_SNACKBAR_MESSAGE,
            value: {
                message,
                duration,
                open,
            },
        }

        const expectedState = {
            variant: VARIANT_INFORMATION,
            message,
            duration,
            open,
        }

        const actualState = reducer(DEFAULT_SNACKBAR, action)
        expect(actualState).toEqual(expectedState)
    })

    it('should handle the RECEIVED_SNACKBAR_MESSAGE action when passing a variant', () => {
        const message = 'Cannot delete because used in dashboard'
        const variant = 'warning'

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
            open: false,
        }

        const actualState = reducer(DEFAULT_SNACKBAR, action)
        expect(actualState).toEqual(expectedState)
    })

    it('should handle the CLOSE_SNACKBAR action', () => {
        const action = {
            type: CLOSE_SNACKBAR,
        }

        const currentState = {
            variant: VARIANT_ERROR,
            message: 'You just won 1000 dollars',
            duration: 3000,
            open: true,
        }

        const actualState = reducer(currentState, action)

        expect(actualState).toEqual(DEFAULT_SNACKBAR)
    })
})
