import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as api from '../../api/visualization.js'
import { VARIANT_SUCCESS } from '../../components/Snackbar/Snackbar.js'
import { GenericServerError } from '../../modules/error.js'
import * as history from '../../modules/history.js'
import { SET_CURRENT, CLEAR_CURRENT } from '../../reducers/current.js'
import {
    SET_LOAD_ERROR,
    CLEAR_LOAD_ERROR,
    SET_PLUGIN_LOADING,
} from '../../reducers/loader.js'
import * as selectors from '../../reducers/settings.js'
import { RECEIVED_SNACKBAR_MESSAGE } from '../../reducers/snackbar.js'
import { SET_UI_FROM_VISUALIZATION, CLEAR_UI } from '../../reducers/ui.js'
import {
    SET_VISUALIZATION,
    CLEAR_VISUALIZATION,
} from '../../reducers/visualization.js'
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
}))
/* eslint-enable no-import-assign, import/namespace */

describe.skip('index', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.resetAllMocks()
    })
    describe('tDoLoadVisualization', () => {
        it('dispatches the correct actions after successfully fetching visualization', () => {
            const vis = {
                name: 'hey',
                interpretations: [{ id: 1, created: '2018-12-03' }],
            }

            // eslint-disable-next-line no-import-assign, import/namespace
            api.apiFetchVisualization = () =>
                Promise.resolve({ visualization: vis })

            const expectedActions = [
                {
                    type: SET_PLUGIN_LOADING,
                    value: true,
                },
                {
                    type: SET_VISUALIZATION,
                    value: vis,
                    metadata: [],
                },
                { type: SET_CURRENT, value: vis },
                {
                    type: SET_UI_FROM_VISUALIZATION,
                    value: vis,
                },
                { type: CLEAR_LOAD_ERROR },
            ]

            const store = mockStore({})

            return store
                .dispatch(
                    fromActions.tDoLoadVisualization({
                        type: 'test',
                        id: 1,
                    })
                )
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        it('dispatches the correct actions after successfully fetching visualization and interpretation', () => {
            const interpretation = { id: 1, created: '2018-12-03' }

            const vis = {
                name: 'hey',
                interpretations: [interpretation],
            }

            // eslint-disable-next-line no-import-assign, import/namespace
            api.apiFetchVisualization = () =>
                Promise.resolve({ visualization: vis })

            const expectedActions = [
                {
                    type: SET_PLUGIN_LOADING,
                    value: true,
                },
                {
                    type: SET_VISUALIZATION,
                    value: vis,
                    metadata: [],
                },
                { type: SET_CURRENT, value: vis },
                {
                    type: SET_UI_FROM_VISUALIZATION,
                    value: vis,
                },
                { type: CLEAR_LOAD_ERROR },
            ]

            const store = mockStore({})

            return store
                .dispatch(
                    fromActions.tDoLoadVisualization({
                        type: 'test',
                        id: 1,
                        ouLevels: [],
                    })
                )
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        it('dispatches CLEAR_LOAD_ERROR last', () => {
            const vis = { name: 'hey' }
            // eslint-disable-next-line no-import-assign, import/namespace
            api.apiFetchVisualization = () =>
                Promise.resolve({ visualization: vis })

            const store = mockStore({})

            return store
                .dispatch(
                    fromActions.tDoLoadVisualization({
                        type: 'test',
                        id: 1,
                    })
                )
                .then(() => {
                    expect(store.getActions().slice(-1)[0].type).toEqual(
                        CLEAR_LOAD_ERROR
                    )
                })
        })

        it('dispatches the correct actions when fetch visualization fails', () => {
            const error = new GenericServerError()

            // eslint-disable-next-line no-import-assign, import/namespace
            api.apiFetchVisualization = () => Promise.reject(error)

            const expectedActions = [
                { type: SET_LOAD_ERROR, value: error },
                { type: CLEAR_VISUALIZATION },
                { type: CLEAR_CURRENT },
                {
                    type: CLEAR_UI,
                    value: {
                        rootOrganisationUnits,
                        relativePeriod,
                        digitGroupSeparator,
                    },
                },
            ]

            const store = mockStore({})

            return store
                .dispatch(
                    fromActions.tDoLoadVisualization({
                        type: 'test',
                        id: 1,
                    })
                )
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })
    })

    describe('clearAll', () => {
        it('dispatches the correct actions when clearing the visualization', () => {
            const expectedActions = [
                { type: CLEAR_LOAD_ERROR },
                { type: CLEAR_VISUALIZATION },
                { type: CLEAR_CURRENT },
                {
                    type: CLEAR_UI,
                    value: {
                        rootOrganisationUnits,
                        relativePeriod,
                        digitGroupSeparator,
                    },
                },
            ]

            const store = mockStore({})

            fromActions.clearAll()(store.dispatch, store.getState)

            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    describe('tDoDeleteVisualization', () => {
        it('dispatches the correct actions when deleting the visualization', () => {
            // history function mocks
            history.default.push = jest.fn()

            const store = mockStore({
                current: {
                    id: 'd1',
                    name: 'delete test',
                },
            })

            const expectedActions = [
                {
                    type: RECEIVED_SNACKBAR_MESSAGE,
                    value: {
                        message: '"delete test" successfully deleted.',
                        duration: 2000,
                        variant: VARIANT_SUCCESS,
                    },
                },
            ]

            store.dispatch(fromActions.tDoDeleteVisualization())

            expect(store.getActions()).toEqual(expectedActions)
            expect(history.default.push).toHaveBeenCalled()
            expect(history.default.push).toHaveBeenCalledWith('/')
        })
    })
})
