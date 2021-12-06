import { RECEIVED_SNACKBAR_MESSAGE, CLEAR_SNACKBAR } from '../reducers/snackbar'

export const acReceivedSnackbarMessage = (value) => ({
    type: RECEIVED_SNACKBAR_MESSAGE,
    value,
})

export const acClearSnackbar = () => ({
    type: CLEAR_SNACKBAR,
})
