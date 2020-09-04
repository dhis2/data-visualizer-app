import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as fromActions from '../index'
import * as api from '../../api/visualization'
import * as history from '../../modules/history'

import {
    SET_VISUALIZATION,
    CLEAR_VISUALIZATION,
} from '../../reducers/visualization'
import { SET_CURRENT, CLEAR_CURRENT } from '../../reducers/current'
import {
    SET_UI_FROM_VISUALIZATION,
    CLEAR_UI,
    SET_UI_RIGHT_SIDEBAR_OPEN,
    SET_UI_INTERPRETATION,
} from '../../reducers/ui'
import {
    SET_LOAD_ERROR,
    CLEAR_LOAD_ERROR,
    SET_PLUGIN_LOADING,
} from '../../reducers/loader'
import { RECEIVED_SNACKBAR_MESSAGE } from '../../reducers/snackbar'
import * as selectors from '../../reducers/settings'
import { GenericServerError } from '../../modules/error'

import { VARIANT_SUCCESS } from '../../components/Snackbar/Snackbar'

const middlewares = [thunk.withExtraArgument('dataEngine')]
const mockStore = configureMockStore(middlewares)

const rootOrganisationUnit = 'abc123'
const relativePeriod = 'xyzpdq'
const digitGroupSeparator = 'COMMA'
selectors.sGetRootOrgUnit = () => rootOrganisationUnit
selectors.sGetRelativePeriod = () => relativePeriod
selectors.sGetSettingsDigitGroupSeparator = () => digitGroupSeparator

jest.mock('../../modules/orgUnit', () => ({
    convertOuLevelsToUids: (ouLevels, vis) => vis,
}))

jest.mock('../../api/organisationUnits', () => ({
    apiFetchOrganisationUnitLevels: () =>
        Promise.resolve([
            {
                level: 2,
                id: '2nd-floor',
            },
        ]),
}))

describe('index', () => {
    describe('tDoLoadVisualization', () => {
        it('dispatches the correct actions after successfully fetching visualization', () => {
            const vis = {
                name: 'hey',
                interpretations: [{ id: 1, created: '2018-12-03' }],
            }

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

            api.apiFetchVisualization = () =>
                Promise.resolve({ visualization: vis })

            const expectedActions = [
                {
                    type: SET_PLUGIN_LOADING,
                    value: true,
                },
                {
                    type: SET_UI_INTERPRETATION,
                    value: interpretation,
                },
                {
                    type: SET_UI_RIGHT_SIDEBAR_OPEN,
                },
                {
                    type: SET_VISUALIZATION,
                    value: vis,
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
                        interpretationId: 1,
                        ouLevels: [],
                    })
                )
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        it('dispatches CLEAR_LOAD_ERROR last', () => {
            const vis = { name: 'hey' }
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

            api.apiFetchVisualization = () => Promise.reject(error)

            const expectedActions = [
                { type: SET_LOAD_ERROR, value: error },
                { type: CLEAR_VISUALIZATION },
                { type: CLEAR_CURRENT },
                {
                    type: CLEAR_UI,
                    value: {
                        rootOrganisationUnit,
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

    describe('clearVisualization', () => {
        it('dispatches the correct actions when clearing the visualization', () => {
            const expectedActions = [
                { type: CLEAR_LOAD_ERROR },
                { type: CLEAR_VISUALIZATION },
                { type: CLEAR_CURRENT },
                {
                    type: CLEAR_UI,
                    value: {
                        rootOrganisationUnit,
                        relativePeriod,
                        digitGroupSeparator,
                    },
                },
            ]

            const store = mockStore({})

            fromActions.clearVisualization(store.dispatch, store.getState)

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

    describe('tDoRenameVisualization', () => {
        const visualization = {
            id: 'r1',
            content: 'burp!',
        }

        const current = {
            ...visualization,
            modified: true,
        }

        const extraParams = {
            name: 'rename-test',
            description: 'Rename test',
        }

        it('dispatches the correct actions after successfully renaming the original visualization', () => {
            const store = mockStore({
                visualization,
                current: visualization,
            })

            const expectedActions = [
                {
                    type: SET_VISUALIZATION,
                    value: { ...visualization, ...extraParams },
                },
                {
                    type: SET_CURRENT,
                    value: { ...visualization, ...extraParams },
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

            store.dispatch(fromActions.tDoRenameVisualization(extraParams))

            expect(store.getActions()).toEqual(expectedActions)
        })

        it('dispatched the correct actions after successfully renaming the modified visualization', () => {
            const store = mockStore({
                visualization,
                current,
            })

            const expectedActions = [
                {
                    type: SET_VISUALIZATION,
                    value: { ...visualization, ...extraParams },
                },
                {
                    type: SET_CURRENT,
                    value: { ...current, ...extraParams },
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

            store.dispatch(fromActions.tDoRenameVisualization(extraParams))

            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    describe('tDoSaveVisualization', () => {
        let uid = 1

        const vis = {
            id: uid,
            content: 'hey',
        }

        const extraParams = { name: 'test', description: 'test' }

        const store = mockStore({
            current: vis,
        })

        // history function mocks
        history.default.push = jest.fn()
        history.default.replace = jest.fn()

        api.apiSaveVisualization = jest.fn(() => {
            return Promise.resolve({
                status: 'OK',
                response: {
                    uid,
                },
            })
        })

        it('replaces the location in history on successful save', () => {
            const expectedVis = {
                ...vis,
                ...extraParams,
            }

            return store
                .dispatch(fromActions.tDoSaveVisualization(extraParams, false))
                .then(() => {
                    expect(api.apiSaveVisualization).toHaveBeenCalled()
                    expect(api.apiSaveVisualization).toHaveBeenCalledWith(
                        'dataEngine',
                        expectedVis
                    )
                    expect(history.default.replace).toHaveBeenCalled()
                    expect(history.default.replace).toHaveBeenCalledWith({
                        pathname: `/${uid}`,
                        state: { isSaving: true },
                    })
                })
        })

        it('pushes a new location in history on successful save as', () => {
            uid = 2

            const expectedVis = {
                ...vis,
                id: undefined,
                ...extraParams,
            }

            return store
                .dispatch(fromActions.tDoSaveVisualization(extraParams, true))
                .then(() => {
                    expect(api.apiSaveVisualization).toHaveBeenCalled()
                    expect(api.apiSaveVisualization).toHaveBeenCalledWith(
                        'dataEngine',
                        expectedVis
                    )
                    expect(history.default.push).toHaveBeenCalled()
                    expect(history.default.push).toHaveBeenCalledWith({
                        pathname: `/${uid}`,
                        state: { isSaving: true },
                    })
                })
        })
    })
})
