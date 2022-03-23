import {
    getDisplayNameByVisType,
    convertOuLevelsToUids,
    ALL_DYNAMIC_DIMENSION_ITEMS,
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    DIMENSION_ID_ORGUNIT,
    DIMENSION_ID_ASSIGNED_CATEGORIES,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import { apiPostDataStatistics } from '../api/dataStatistics'
import {
    apiFetchVisualization,
    apiSaveVisualization,
} from '../api/visualization'
import { VARIANT_SUCCESS } from '../components/Snackbar/Snackbar'
import {
    GenericServerError,
    VisualizationNotFoundError,
} from '../modules/error'
import history from '../modules/history'
import { getVisualizationFromCurrent } from '../modules/visualization'
import { sGetCurrent } from '../reducers/current'
import {
    sGetRootOrgUnit,
    sGetRelativePeriod,
    sGetSettingsDigitGroupSeparator,
} from '../reducers/settings'
import { sGetVisualization } from '../reducers/visualization'
import * as fromChart from './chart'
import * as fromCurrent from './current'
import * as fromDimensions from './dimensions'
import * as fromLoader from './loader'
import * as fromMetadata from './metadata'
import * as fromRecommended from './recommendedIds'
import * as fromSettings from './settings'
import * as fromSnackbar from './snackbar'
import * as fromUi from './ui'
import * as fromUser from './user'
import * as fromVisualization from './visualization'

export {
    fromVisualization,
    fromCurrent,
    fromDimensions,
    fromRecommended,
    fromUi,
    fromMetadata,
    fromSettings,
    fromUser,
    fromChart,
    fromSnackbar,
    fromLoader,
}

const logError = (action, error) => {
    console.log(`Error in action ${action}: ${error}`)
}

const adaptAxisItems = axis =>
    (axis || []).map(ai => ({
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
    ({ id, interpretationId, ouLevels }) =>
    async (dispatch, getState, engine) => {
        const onSuccess = async response => {
            dispatch(fromLoader.acSetPluginLoading(true))
            const visualization = convertOuLevelsToUids(
                ouLevels,
                response.visualization
            )

            visualization.columns = adaptAxisItems(visualization.columns)
            visualization.rows = adaptAxisItems(visualization.rows)
            visualization.filters = adaptAxisItems(visualization.filters)

            if (interpretationId) {
                const interpretation = visualization.interpretations.find(
                    i => i.id === interpretationId
                )

                if (interpretation) {
                    dispatch(fromUi.acSetUiInterpretation(interpretation))
                    dispatch(fromUi.acSetUiRightSidebarOpen())
                }
            }

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
            } else if (errorResponse?.message) {
                error = errorResponse.message
            } else {
                error = new GenericServerError()
            }
            dispatch(clearAll(error))

            logError('tDoLoadVisualization', error)
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

        dispatch(fromVisualization.acClear())
        dispatch(fromCurrent.acClear())

        const rootOrganisationUnit = sGetRootOrgUnit(getState())
        const relativePeriod = sGetRelativePeriod(getState())
        const digitGroupSeparator = sGetSettingsDigitGroupSeparator(getState())

        dispatch(
            fromUi.acClear({
                rootOrganisationUnit,
                relativePeriod,
                digitGroupSeparator,
            })
        )
    }

export const tDoRenameVisualization =
    ({ name, description }) =>
    (dispatch, getState) => {
        const state = getState()

        const visualization = sGetVisualization(state)
        const current = sGetCurrent(state)

        const updatedVisualization = { ...visualization }
        const updatedCurrent = { ...current }

        if (name) {
            updatedVisualization.name = updatedCurrent.name = name
        }

        if (description) {
            updatedVisualization.description = updatedCurrent.description =
                description
        }

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

export const tDoSaveVisualization =
    ({ name, description }, copy) =>
    async (dispatch, getState, engine) => {
        const onSuccess = res => {
            if (res.status === 'OK' && res.response.uid) {
                if (copy) {
                    history.push({
                        pathname: `/${res.response.uid}`,
                        state: { isSaving: true },
                    }) // Save as
                } else {
                    history.replace({
                        pathname: `/${res.response.uid}`,
                        state: { isSaving: true },
                    }) // Save
                }
            }
        }

        try {
            dispatch(fromLoader.acSetPluginLoading(true))
            const visualization = getVisualizationFromCurrent(
                sGetCurrent(getState())
            )

            // remove the id to trigger a POST request and save a new AO
            if (copy) {
                delete visualization.id
            }

            visualization.name =
                // name provided in the Save dialog
                name ||
                // existing name when saving the same modified visualization
                visualization.name ||
                // new visualization with no name provided in Save dialog
                i18n.t(
                    'Untitled {{visualizationType}} visualization, {{date}}',
                    {
                        visualizationType: getDisplayNameByVisType(
                            visualization.type
                        ),
                        date: new Date().toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                        }),
                    }
                )

            if (description) {
                visualization.description = description
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
            message: i18n.t('"{{deletedObject}}" successfully deleted.', {
                deletedObject: current.name,
            }),
            duration: 2000,
        })
    )

    history.push('/')
}
