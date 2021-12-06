import { apiFetchOrganisationUnitRoots } from '@dhis2/analytics'
import { apiFetchSystemSettings } from '../api/settings'
import { ADD_SETTINGS } from '../reducers/settings'

export const acAddSettings = (value) => ({
    type: ADD_SETTINGS,
    value,
})

export const tAddSettings =
    (...extraSettings) =>
    async (dispatch, getState, engine) => {
        const onSuccess = (fetchedSettings) => {
            dispatch(
                acAddSettings(
                    Object.assign({}, fetchedSettings, ...extraSettings)
                )
            )
        }

        const onError = (error) => {
            console.log('Error (apiFetchSystemSettings): ', error)
            return error
        }

        try {
            const fetchSystemSettings = apiFetchSystemSettings(engine)
            const fetchOrgUnitRoots = apiFetchOrganisationUnitRoots(engine)

            // run in parallel
            const [systemSettings, orgUnitRoots] = await Promise.all([
                fetchSystemSettings,
                fetchOrgUnitRoots,
            ])

            return onSuccess({
                ...systemSettings,
                rootOrganisationUnits: orgUnitRoots,
            })
        } catch (err) {
            return onError(err)
        }
    }
