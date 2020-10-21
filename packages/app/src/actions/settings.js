import { SET_SETTINGS, ADD_SETTINGS } from '../reducers/settings'
import { apiFetchSystemSettings } from '../api/settings'
import { apiFetchOrganisationUnitRoots } from '../api/organisationUnits'

export const acSetSettings = value => ({
    type: SET_SETTINGS,
    value,
})

export const acAddSettings = value => ({
    type: ADD_SETTINGS,
    value,
})

export const tAddSettings = (...extraSettings) => async (
    dispatch,
    getState,
    engine
) => {
    const onSuccess = fetchedSettings => {
        dispatch(
            acAddSettings(Object.assign({}, fetchedSettings, ...extraSettings))
        )
    }

    const onError = error => {
        console.log('Error (apiFetchSystemSettings): ', error)
        return error
    }

    try {
        const systemSettingsData = await apiFetchSystemSettings(engine)
        const ouData = await apiFetchOrganisationUnitRoots(engine)

        return onSuccess({
            ...systemSettingsData.systemSettings,
            rootOrganisationUnit: ouData.orgUnitRoots[0], // multiple roots?
        })
    } catch (err) {
        return onError(err)
    }
}
