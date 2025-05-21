import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as api from '../../api/visualization.js'
import { VARIANT_SUCCESS } from '../../components/Snackbar/Snackbar.js'
import { SET_CURRENT } from '../../reducers/current.js'
import * as selectors from '../../reducers/settings.js'
import { RECEIVED_SNACKBAR_MESSAGE } from '../../reducers/snackbar.js'
import { SET_VISUALIZATION } from '../../reducers/visualization.js'
import DataEngineMock from '../__mocks__/DataEngine.js'
import * as fromActions from '../index.js'

const dataEngineMock = new DataEngineMock()
const middlewares = [thunk.withExtraArgument(dataEngineMock)]
const mockStore = configureMockStore(middlewares)

const rootOrganisationUnits = ['abc123']
const relativePeriod = 'xyzpdq'
const digitGroupSeparator = 'COMMA'
/* eslint-disable no-import-assign, import/namespace */
selectors.sGetRootOrgUnits = () => rootOrganisationUnits
selectors.sGetRelativePeriod = () => relativePeriod
selectors.sGetSettingsDigitGroupSeparator = () => digitGroupSeparator
jest.mock('@dhis2/analytics', () => ({
    ...jest.requireActual('@dhis2/analytics'),
    apiFetchOrganisationUnitLevels: () =>
        Promise.resolve([
            {
                level: 2,
                id: '2nd-floor',
            },
        ]),
    convertOuLevelsToUids: (ouLevels, vis) => vis,
    preparePayloadForSave: ({ visualization, name, description }) => ({
        ...visualization,
        name,
        description,
    }),
}))
/* eslint-enable no-import-assign, import/namespace */

const uid = 'xyzpdq789ab'
const visualization = {
    id: uid,
    name: 'Original name',
    displayName: 'Original name',
    description: 'Original description',
    displayDescription: 'Original description',
    content: {
        type: 'chart',
        level: 'medium',
    },
    color: 'blue',
    subscribers: ['jklmn'],
}

const current = {
    ...visualization,
    content: {
        type: 'chart',
        level: 'highest',
    },
    color: 'blue',
}

const renamedProps = {
    name: 'Renamed name',
    displayName: 'Renamed name',
    description: 'Renamed description',
    displayDescription: 'Renamed description',
}

describe('index tDoRenameVisualization', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.resetAllMocks()

        // eslint-disable-next-line no-import-assign, import/namespace
        api.apiFetchVisualization = jest
            .fn()
            .mockResolvedValue({ visualization })

        // eslint-disable-next-line no-import-assign, import/namespace
        api.apiSaveVisualization = jest.fn().mockResolvedValue({
            status: 'OK',
            response: {
                uid,
            },
        })

        // eslint-disable-next-line no-import-assign, import/namespace
        api.apiFetchVisualizationNameDesc = jest.fn().mockResolvedValue({
            visualization: renamedProps,
        })
    })

    it('dispatches the correct actions after successfully renaming the original visualization', () => {
        const store = mockStore({
            visualization,
            current: visualization,
        })

        const onRenameComplete = jest.fn()

        const expectedUpdatedVisualization = {
            ...visualization,
            ...renamedProps,
        }

        const expectedActions = [
            {
                type: SET_VISUALIZATION,
                value: expectedUpdatedVisualization,
                metadata: [],
            },
            {
                type: SET_CURRENT,
                value: expectedUpdatedVisualization,
            },
            {
                type: RECEIVED_SNACKBAR_MESSAGE,
                value: {
                    message: 'Rename successful',
                    duration: 2000,
                    variant: VARIANT_SUCCESS,
                },
            },
        ]

        return store
            .dispatch(
                fromActions.tDoRenameVisualization(
                    {
                        name: renamedProps.name,
                        description: renamedProps.description,
                    },
                    onRenameComplete
                )
            )
            .then(() => {
                // Check that apiFetchVisualization was called
                expect(api.apiFetchVisualization).toHaveBeenCalledWith(
                    expect.objectContaining({
                        id: visualization.id,
                        withSubscribers: true,
                    })
                )
                expect(onRenameComplete).toHaveBeenCalled()

                expect(api.apiSaveVisualization).toHaveBeenCalledWith(
                    expect.any(Object), // The engine
                    {
                        ...visualization,
                        name: renamedProps.name,
                        description: renamedProps.description,
                    } // The visualization to save
                )

                expect(api.apiFetchVisualizationNameDesc).toHaveBeenCalled()

                // Check the dispatched actions
                expect(store.getActions()).toEqual(expectedActions)
            })
    })

    it('for modified visualization preserves values in current except for name, description, displayName, displayDescription', () => {
        const store = mockStore({
            visualization,
            current,
        })

        const onRenameComplete = jest.fn()

        const expectedActions = [
            {
                type: SET_VISUALIZATION,
                value: { ...visualization, ...renamedProps },
                metadata: [],
            },
            {
                type: SET_CURRENT,
                value: { ...current, ...renamedProps },
            },
            {
                type: RECEIVED_SNACKBAR_MESSAGE,
                value: {
                    message: 'Rename successful',
                    duration: 2000,
                    variant: VARIANT_SUCCESS,
                },
            },
        ]

        return store
            .dispatch(
                fromActions.tDoRenameVisualization(
                    {
                        name: renamedProps.name,
                        description: renamedProps.description,
                    },
                    onRenameComplete
                )
            )
            .then(() => {
                // Check that apiFetchVisualization was called
                expect(api.apiFetchVisualization).toHaveBeenCalledWith(
                    expect.objectContaining({
                        id: visualization.id,
                        withSubscribers: true,
                    })
                )
                expect(onRenameComplete).toHaveBeenCalled()

                expect(api.apiSaveVisualization).toHaveBeenCalledWith(
                    expect.any(Object), // The engine
                    {
                        ...visualization,
                        name: renamedProps.name,
                        description: renamedProps.description,
                    } // The visualization to save
                )

                expect(api.apiFetchVisualizationNameDesc).toHaveBeenCalled()

                // Check the dispatched actions
                expect(store.getActions()).toEqual(expectedActions)
            })
    })

    it('does not dispatch actions if rename fails', () => {
        const store = mockStore({
            visualization,
            current,
        })

        const onRenameComplete = jest.fn()

        // Mock the API to simulate a failure
        api.apiSaveVisualization.mockResolvedValueOnce({
            status: 'ERROR',
            response: {
                error: 'Failed to save visualization',
            },
        })

        return store
            .dispatch(
                fromActions.tDoRenameVisualization(
                    {
                        name: renamedProps.name,
                        description: renamedProps.description,
                    },
                    onRenameComplete
                )
            )
            .then(() => {
                expect(api.apiFetchVisualization).toHaveBeenCalledWith(
                    expect.objectContaining({
                        id: visualization.id,
                        withSubscribers: true,
                    })
                )

                expect(api.apiSaveVisualization).toHaveBeenCalledWith(
                    expect.any(Object), // The engine
                    {
                        ...visualization,
                        name: renamedProps.name,
                        description: renamedProps.description,
                    } // The visualization to save
                )
                expect(onRenameComplete).not.toHaveBeenCalled()

                // Check that no actions were dispatched
                expect(store.getActions()).toEqual([])
            })
    })
})
