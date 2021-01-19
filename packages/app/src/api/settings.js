import { onError } from './index'
import { SYSTEM_SETTINGS } from '../modules/settings'

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
