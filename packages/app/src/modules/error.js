import { EmptySeries } from '../assets/ErrorIcons'
import i18n from '@dhis2/d2-i18n'

export class NoSeriesError extends Error {
    icon = EmptySeries
    title = i18n.t('Series is empty')
    description = i18n.t('Add at least one item to Series.')
}

export const parseError = ({ message, httpStatusCode }) => ({
    message,
    type: String(httpStatusCode).match(/50\d/) ? 'error' : 'warning',
})
