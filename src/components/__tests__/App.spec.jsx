import React from 'react'
import { waitFor, act } from '@testing-library/react'
import { renderWithProviders } from '../../../config/testsContext.js'
// import { USER_DATASTORE_CURRENT_AO_KEY } from '../../modules/currentAnalyticalObject.js'
// import history from '../../modules/history.js'
// import * as ui from '../../modules/ui.js'
import { App } from '../App.jsx'
import * as fromActions from '../../actions/index.js'
import history from '../../modules/history.js'
import { DEFAULT_CURRENT } from '../../reducers/current.js'
import { setupTestStore } from '../../configureStore.js'
import { apiFetchVisualization } from '../../api/visualization.js'
import { DEFAULT_VISUALIZATION } from '../../reducers/visualization.js'
import { useSetting } from '@dhis2/app-service-datastore'
import { USER_DATASTORE_CURRENT_AO_KEY } from '../../modules/currentAnalyticalObject.js'

jest.mock('@dhis2/analytics', () => ({
    ...jest.requireActual('@dhis2/analytics'),
    // apiFetchOrganisationUnitLevels: jest.fn(),
    // getPredefinedDimensions: () => {},
    visTypeDisplayNames: {},
    Toolbar: () => <div>Toolbar</div>,
    useCachedDataQuery: jest.fn(() => ({
        currentUser: { id: 'user1', settings: {} },
        orgUnitLevels: [],
        rootOrgUnits: [],
        systemSettings: {},
    })),
    convertOuLevelsToUids: jest.fn((ouLevels, visualization) => visualization),
    apiFetchDimensions: jest.fn(() =>
        Promise.resolve([
            { id: 'dim1', name: 'Dimension 1' },
            { id: 'dim2', name: 'Dimension 2' },
            { id: 'dim3', name: 'Dimension 3' },
        ])
    ),
}))

jest.mock('@dhis2/app-service-datastore', () => ({
    ...jest.requireActual('@dhis2/app-service-datastore'),
    useSetting: jest.fn(() => [{}]), // default: empty object
}))

jest.mock('../../api/visualization.js', () => ({
    ...jest.requireActual('../../api/visualization.js'),
    apiFetchVisualization: jest.fn(() =>
        Promise.resolve({
            visualization: {},
        })
    ),
}))

jest.mock('../../api/dataStatistics.js', () => ({
    ...jest.requireActual('../../api/dataStatistics.js'),
    apiPostDataStatistics: jest.fn(() => Promise.resolve({ result: 'ok' })),
}))

jest.mock('../DndContext.jsx', () => () => <div>DndContext</div>)
jest.mock('../DetailsPanel/DetailsPanel.jsx', () => () => (
    <div>DetailsPanel</div>
))

jest.mock('@dhis2/ui', () => {
    const original = jest.requireActual('@dhis2/ui')
    return {
        ...original,
        Modal: (props) => <div {...props}>Modal</div>,
    }
})

jest.mock('@dhis2/app-runtime', () => ({
    useDataEngine: jest.fn(() => ({
        query: Function.prototype,
    })),
}))

jest.mock('../Visualization/Visualization.jsx', () => ({
    __esModule: true,
    Visualization: () => <div />,
}))

describe('App', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    test('renders the app skeleton', async () => {
        const reduxState = {
            visualization: { name: 'Hello', id: 'hello-id' },
            current: { name: 'Hello', id: 'hello-id' },
            ui: { rightSidebarOpen: false },
        }

        Object.defineProperty(history, 'location', {
            configurable: true,
            get: () => ({
                pathname: '/',
                search: '',
                state: {},
                hash: '',
                key: 'test-key',
            }),
        })

        const store = setupTestStore(reduxState)
        jest.spyOn(store, 'dispatch')
        const { container } = renderWithProviders(<App />, store)

        await waitFor(() => {
            expect(container).toHaveTextContent('Toolbar')
        })

        expect(container).toMatchSnapshot()

        // TODO
        // const calls = store.dispatch.mock.calls.map(([action]) => action)
        // console.log('Dispatched actions:', calls)

        // const wasClearVisualizationDispatched = calls.some(
        //     (action) =>
        //         typeof action === 'object' &&
        //         action.type ===
        //             fromActions.fromVisualization.acClearVisualization().type
        // )
        // expect(wasClearVisualizationDispatched).toBe(true)

        // const wasClearCurrentDispatched = calls.some(
        //     ([action]) =>
        //         typeof action === 'object' &&
        //         action.type === fromActions.fromCurrent.acClearCurrent().type
        // )
        // expect(wasClearCurrentDispatched).toBe(true)
    })

    test('calls setVisualization when location pathname has length', async () => {
        const reduxState = {
            loader: {
                isLoading: false,
                loadingError: 'there was an error',
                isPluginLoading: true,
            },
        }

        const newVisualization = {
            id: 'goodbye-id',
            name: 'Goodbye',
            columns: [{ dimension: 'dx', items: [{ id: 'anc1' }] }],
            rows: [{ dimension: 'ou', items: [{ id: 'myou1' }] }],
            filters: [{ dimension: 'pe', items: [{ id: '202301' }] }],
        }

        apiFetchVisualization.mockResolvedValueOnce({
            visualization: newVisualization,
        })

        Object.defineProperty(history, 'location', {
            get: () => ({
                pathname: '/goodbyeuid',
            }),
        })

        const store = setupTestStore(reduxState)

        expect(store.getState().visualization).toEqual(DEFAULT_VISUALIZATION)
        expect(store.getState().current).toEqual(DEFAULT_CURRENT)
        expect(store.getState().loader).toEqual({
            isLoading: false,
            loadingError: 'there was an error',
            isPluginLoading: true,
        })
        const { container } = renderWithProviders(<App />, store)

        await waitFor(() => {
            expect(container).toHaveTextContent('Toolbar')
        })

        expect(apiFetchVisualization).toHaveBeenCalled()

        expect(store.getState().visualization).toEqual(newVisualization)
        expect(store.getState().current).toEqual(newVisualization)
        expect(store.getState().loader).toEqual({
            isLoading: false,
            loadingError: null,
            isPluginLoading: true,
        })
    })

    test('resets state when location pathname is root', async () => {
        const reduxState = {
            visualization: { name: 'Hello', id: 'hello-id' },
            current: { name: 'Hello', id: 'hello-id' },
            ui: { rightSidebarOpen: true },
        }

        Object.defineProperty(history, 'location', {
            configurable: true,
            get: () => ({
                pathname: '/',
                search: '',
                state: {},
                hash: '',
                key: 'test-key',
            }),
        })

        const store = setupTestStore(reduxState)
        renderWithProviders(<App />, store)

        await waitFor(() => {
            expect(store.getState().visualization).toEqual(null)
            expect(store.getState().current).toEqual(null)
            expect(store.getState().ui.rightSidebarOpen).toBe(false)
        })
    })

    test('loads AO from user data store if id equals to "currentAnalyticalObject"', async () => {
        // Arrange: set up the AO object to be returned by useSetting
        const aoFromUserDataStore = {
            columns: [{ dimension: 'dx', items: [{ id: 'anc1' }] }],
            rows: [{ dimension: 'ou', items: [{ id: 'myou1' }] }],
            filters: [{ dimension: 'pe', items: [{ id: '202301' }] }],
        }
        useSetting
            .mockImplementationOnce(() => [aoFromUserDataStore]) // First call
            .mockImplementationOnce(() => [aoFromUserDataStore]) // Second call

        // Set up initial redux state
        const reduxState = {
            visualization: { name: 'Hello', id: 'hello-id' },
            current: { name: 'Hello', id: 'hello-id' },
            ui: { rightSidebarOpen: true },
        }

        // Mock the location to simulate the special AO key
        Object.defineProperty(history, 'location', {
            get: () => ({
                pathname: `/${USER_DATASTORE_CURRENT_AO_KEY}`,
            }),
        })

        const store = setupTestStore(reduxState)
        renderWithProviders(<App />, store)

        expect(store.getState().visualization).toEqual(null)
        expect(store.getState().current).toEqual(
            expect.objectContaining(aoFromUserDataStore)
        )
        expect(store.getState().ui.rightSidebarOpen).toBe(true)
        expect(store.getState().ui.itemsByDimension).toEqual({
            dx: ['anc1'],
            ou: ['myou1'],
            pe: ['202301'],
        })
    })

    test('reloads visualization when opening the same visualization', async () => {
        // Initial redux state
        const reduxState = {
            visualization: { id: 'fluttershy', name: 'Fluttershy' },
            current: { id: 'fluttershy', name: 'Fluttershy' },
            ui: { rightSidebarOpen: false },
        }

        // Set initial location
        Object.defineProperty(history, 'location', {
            configurable: true,
            get: () => ({
                pathname: '/fluttershy',
                search: '',
                state: {},
                hash: '',
                key: 'test-key',
            }),
        })

        const store = setupTestStore(reduxState)
        renderWithProviders(<App />, store)

        // Wait for initial visualization load
        await waitFor(() => {
            expect(store.getState().visualization).toEqual(
                expect.objectContaining({ id: 'fluttershy' })
            )
        })

        // Simulate opening the same visualization again
        await act(async () => {
            history.replace({ pathname: '/fluttershy' }, { isOpening: true })
        })

        // Wait for the visualization to reload (should be called again)
        await waitFor(() => {
            expect(apiFetchVisualization).toHaveBeenCalledTimes(2)
        })
    })

    test('does not reload visualization when interpretation toggled', async () => {
        // Initial redux state
        const reduxState = {
            visualization: { id: 'applejack', name: 'Applejack' },
            current: { id: 'applejack', name: 'Applejack' },
            ui: { rightSidebarOpen: false },
        }

        // Set initial location to interpretation route
        Object.defineProperty(history, 'location', {
            get: () => ({
                pathname: '/applejack/interpretation/xyz123',
            }),
        })

        const store = setupTestStore(reduxState)
        renderWithProviders(<App />, store)

        // Wait for initial visualization load
        await waitFor(() => {
            expect(store.getState().visualization).toEqual(
                expect.objectContaining({ id: 'applejack' })
            )
        })

        // Simulate toggling interpretation (navigating to base visualization route)
        await act(async () => {
            history.push('/applejack')
        })

        // The visualization should NOT reload (apiFetchVisualization should only be called once)
        expect(apiFetchVisualization).toHaveBeenCalledTimes(1)
    })

    test('reloads visualization when same pathname pushed when saving', async () => {
        // Initial redux state
        const reduxState = {
            visualization: { id: 'fluttershy', name: 'Fluttershy' },
            current: { id: 'fluttershy', name: 'Fluttershy' },
            ui: { rightSidebarOpen: false },
        }

        // Set initial location
        Object.defineProperty(history, 'location', {
            get: () => ({
                pathname: '/fluttershy',
            }),
        })

        const store = setupTestStore(reduxState)
        renderWithProviders(<App />, store)

        // Wait for initial visualization load
        await waitFor(() => {
            expect(store.getState().visualization).toEqual(
                expect.objectContaining({ id: 'fluttershy' })
            )
        })

        // Simulate pushing the same pathname with isSaving flag
        await act(async () => {
            history.replace({ pathname: '/fluttershy' }, { isSaving: true })
        })

        // The visualization should reload (apiFetchVisualization should be called twice)
        expect(apiFetchVisualization).toHaveBeenCalledTimes(2)
    })

    test('triggers popstate events on history push events', async () => {
        // Set initial location
        Object.defineProperty(history, 'location', {
            configurable: true,
            get: () => ({
                pathname: '/rarity',
                search: '',
                state: {},
                hash: '',
                key: 'test-key',
            }),
        })

        const reduxState = {
            visualization: { id: 'rarity', name: 'Rarity' },
            current: { id: 'rarity', name: 'Rarity' },
            ui: { rightSidebarOpen: false },
        }

        const popstateHandler = jest.fn()
        window.addEventListener('popstate', popstateHandler)

        const store = setupTestStore(reduxState)
        renderWithProviders(<App />, store)

        // Simulate history.push
        await act(async () => {
            history.push('/rainbowdash')
        })

        expect(popstateHandler).toBeCalledTimes(1)

        window.removeEventListener('popstate', popstateHandler)
    })

    test('triggers popstate events on history replace events', async () => {
        // Set initial location
        Object.defineProperty(history, 'location', {
            configurable: true,
            get: () => ({
                pathname: '/rarity',
                search: '',
                state: {},
                hash: '',
                key: 'test-key',
            }),
        })

        const reduxState = {
            visualization: { id: 'rarity', name: 'Rarity' },
            current: { id: 'rarity', name: 'Rarity' },
            ui: { rightSidebarOpen: false },
        }

        const popstateHandler = jest.fn()
        window.addEventListener('popstate', popstateHandler)

        const store = setupTestStore(reduxState)
        renderWithProviders(<App />, store)

        // Simulate history.replace
        await act(async () => {
            history.replace('/rainbowdash')
        })

        expect(popstateHandler).toBeCalledTimes(1)

        window.removeEventListener('popstate', popstateHandler)
    })
})
