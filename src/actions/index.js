import {
    convertOuLevelsToUids,
    ALL_DYNAMIC_DIMENSION_ITEMS,
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    DIMENSION_ID_ORGUNIT,
    DIMENSION_ID_ASSIGNED_CATEGORIES,
    preparePayloadForSaveAs,
    preparePayloadForSave,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import { apiPostDataStatistics } from '../api/dataStatistics.js'
import {
    apiFetchVisualization,
    apiSaveVisualization,
    apiFetchVisualizationNameDesc,
    apiFetchVisualizationSubscribers,
} from '../api/visualization.js'
import {
    VARIANT_SUCCESS,
    VARIANT_WARNING,
} from '../components/Snackbar/Snackbar.jsx'
import {
    GenericServerError,
    VisualizationNotFoundError,
} from '../modules/error.js'
import history from '../modules/history.js'
import { getSaveableVisualization } from '../modules/visualization.js'
import { sGetCurrent } from '../reducers/current.js'
import {
    sGetRootOrgUnits,
    sGetRelativePeriod,
    sGetSettingsDigitGroupSeparator,
} from '../reducers/settings.js'
import { sGetVisualization } from '../reducers/visualization.js'
import * as fromCurrent from './current.js'
import * as fromDimensions from './dimensions.js'
import * as fromLoader from './loader.js'
import * as fromMetadata from './metadata.js'
import * as fromRecommended from './recommendedIds.js'
import * as fromSettings from './settings.js'
import * as fromSnackbar from './snackbar.js'
import * as fromUi from './ui.js'
import * as fromVisualization from './visualization.js'

export {
    fromVisualization,
    fromCurrent,
    fromDimensions,
    fromRecommended,
    fromUi,
    fromMetadata,
    fromSettings,
    fromSnackbar,
    fromLoader,
}

const logError = (action, error) => {
    const isJestTestRun = process.env.JEST_WORKER_ID !== undefined

    if (!isJestTestRun) {
        console.log(`Error in action ${action}: ${error}`)
    }
}

const adaptAxisItems = (axis) =>
    (axis || []).map((ai) => ({
        ...ai,
        items: ai?.items?.length
            ? ai.items
            : ![
                  DIMENSION_ID_DATA,
                  DIMENSION_ID_PERIOD,
                  DIMENSION_ID_ORGUNIT,
                  DIMENSION_ID_ASSIGNED_CATEGORIES,
              ].includes(ai.dimension)
            ? [
                  {
                      id: ALL_DYNAMIC_DIMENSION_ITEMS,
                      name: i18n.t('All items'),
                  },
              ]
            : null,
    }))

// visualization, current, ui

export const tDoLoadVisualization =
    ({ id, ouLevels }) =>
    async (dispatch, getState, engine) => {
        const onSuccess = async (response) => {
            dispatch(fromLoader.acSetPluginLoading(true))
            const visualization = convertOuLevelsToUids(
                ouLevels,
                response.visualization
            )

            visualization.columns = adaptAxisItems(visualization.columns)
            visualization.rows = adaptAxisItems(visualization.rows)
            visualization.filters = adaptAxisItems(visualization.filters)

            apiPostDataStatistics(engine, visualization.id)

            dispatch(fromVisualization.acSetVisualization(visualization))
            dispatch(fromCurrent.acSetCurrent(visualization))
            dispatch(fromUi.acSetUiFromVisualization(visualization))
            dispatch(fromLoader.acClearLoadError())
        }

        try {
            return onSuccess(await apiFetchVisualization(engine, id))
        } catch (errorResponse) {
            let error = errorResponse

            if (errorResponse?.details?.httpStatusCode === 404) {
                error = new VisualizationNotFoundError()
                history.push('/')
            } else if (!errorResponse?.message) {
                error = new GenericServerError()
            }
            dispatch(clearAll(error))

            logError('tDoLoadVisualization', error.description || error.message)
        }
    }

export const clearAll =
    (error = null) =>
    (dispatch, getState) => {
        if (error) {
            dispatch(fromLoader.acSetLoadError(error))
        } else {
            dispatch(fromLoader.acClearLoadError())
        }

        dispatch(fromVisualization.acClearVisualization())
        dispatch(fromCurrent.acClearCurrent())

        const rootOrganisationUnits = sGetRootOrgUnits(getState())
        const relativePeriod = sGetRelativePeriod(getState())
        const digitGroupSeparator = sGetSettingsDigitGroupSeparator(getState())

        dispatch(
            fromUi.acClearUi({
                rootOrganisationUnits,
                relativePeriod,
                digitGroupSeparator,
            })
        )
    }

export const tDoRenameVisualization =
    ({ name, description }, onRenameComplete) =>
    async (dispatch, getState, engine) => {
        const onSuccess = (updatedVis) => {
            const state = getState()

            const visualization = sGetVisualization(state)
            const current = sGetCurrent(state)

            const updatedVisualization = { ...visualization, ...updatedVis }
            const updatedCurrent = { ...current, ...updatedVis }

            dispatch(fromVisualization.acSetVisualization(updatedVisualization))

            // keep the same reference for current if there are no changes
            // other than the name/description
            if (visualization === current) {
                dispatch(fromCurrent.acSetCurrent(updatedVisualization))
            } else {
                dispatch(fromCurrent.acSetCurrent(updatedCurrent))
            }

            dispatch(
                fromSnackbar.acReceivedSnackbarMessage({
                    variant: VARIANT_SUCCESS,
                    message: i18n.t('Rename successful'),
                    duration: 2000,
                })
            )
        }

        try {
            const { visualization } = await apiFetchVisualization(
                engine,
                sGetVisualization(getState()).id
            )

            const visToSave = preparePayloadForSave({
                visualization: getSaveableVisualization(visualization),
                name,
                description,
                engine,
            })

            const res = await apiSaveVisualization(engine, visToSave)
            if (res.status === 'OK' && res.response.uid) {
                onRenameComplete()
                const { visualization: updatedVisualization } =
                    await apiFetchVisualizationNameDesc(
                        engine,
                        res.response.uid
                    )
                onSuccess(updatedVisualization)
            }
        } catch (error) {
            logError('tDoRenameVisualization', error)

            dispatch(
                fromSnackbar.acReceivedSnackbarMessage({
                    variant: VARIANT_WARNING,
                    message: i18n.t('Rename failed'),
                })
            )
        }
    }

export const tDoSaveVisualization =
    ({ name, description }, copy) =>
    async (dispatch, getState, engine) => {
        const onSuccess = (res) => {
            if (res.status === 'OK' && res.response.uid) {
                if (copy) {
                    history.push(
                        { pathname: `/${res.response.uid}` },
                        { isSaving: true }
                    ) // Save as
                } else {
                    history.replace(
                        { pathname: `/${res.response.uid}` },
                        { isSaving: true }
                    ) // Save
                }
            }
        }

        try {
            dispatch(fromLoader.acSetPluginLoading(true))
            let visualization = getSaveableVisualization(
                sGetCurrent(getState())
            )

            if (copy) {
                // remove subscribers from the visualization object
                // eslint-disable-next-line no-unused-vars
                const { subscribers, ...visualizationWithoutSubscribers } =
                    visualization

                visualization = preparePayloadForSaveAs({
                    visualization: visualizationWithoutSubscribers,
                    name,
                    description,
                })
            } else {
                const { visualizationSubscribers } =
                    await apiFetchVisualizationSubscribers(
                        engine,
                        visualization.id
                    )

                visualization = preparePayloadForSave({
                    visualization: {
                        ...visualization,
                        ...visualizationSubscribers,
                    },
                    name,
                    description,
                    engine,
                })
            }

            return onSuccess(await apiSaveVisualization(engine, visualization))
        } catch (error) {
            dispatch(fromLoader.acSetPluginLoading(false))
            logError('tDoSaveVisualization', error)

            // TODO: Once the API returns custom error codes for validation errors, make sure they're relayed properly to be displayed to the user
            // In the meantime we only display a generic error (doesn't give any constructive information but at least it doesn't fail silently any more)
            dispatch(fromLoader.acSetLoadError(new GenericServerError()))
        }
    }

export const tDoDeleteVisualization = () => (dispatch, getState) => {
    const current = sGetCurrent(getState())

    dispatch(
        fromSnackbar.acReceivedSnackbarMessage({
            variant: VARIANT_SUCCESS,
            message: i18n.t('"{{- deletedObject}}" successfully deleted.', {
                deletedObject: current.name,
            }),
            duration: 2000,
        })
    )

    history.push('/')
}
