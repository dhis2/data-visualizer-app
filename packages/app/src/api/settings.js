import { SYSTEM_SETTINGS } from '../modules/settings.js'
import { onError } from './index.js'

const systemSettingsQuery = {
    resource: 'systemSettings',
    params: {
        key: SYSTEM_SETTINGS,
    },
}

export const apiFetchSystemSettings = async dataEngine => {
    const systemSettingsData = await dataEngine.query(
        { systemSettings: systemSettingsQuery },
        {
            onError,
        }
    )

    return systemSettingsData.systemSettings
}
