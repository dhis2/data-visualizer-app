export const parseError = ({ message, httpStatusCode }) => ({
    message,
    type: String(httpStatusCode).match(/50\d/) ? 'error' : 'warning',
})
