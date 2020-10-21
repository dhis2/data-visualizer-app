import { onError } from './index'
import { SYSTEM_SETTINGS } from '../modules/settings'

const systemSettingsQuery = {
    systemSettings: {
        resource: 'systemSettings',
        params: {
            key: SYSTEM_SETTINGS,
        },
    },
}

export const apiFetchSystemSettings = dataEngine =>
    dataEngine.query(systemSettingsQuery, { onError })
