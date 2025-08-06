import { screen, act } from '@testing-library/react'
import React from 'react'
import { renderWithProviders } from '../../../../config/testsContext.js'
import { setupTestStore } from '../../../configureStore.js'
import { __setChart as setChart } from '../../ChartProvider.jsx' // eslint-disable-line import/named
import { VisualizationPlugin } from '../../VisualizationPlugin/VisualizationPlugin.jsx'
import { Visualization } from '../Visualization.jsx'

jest.mock('../../ChartProvider.jsx', () => {
    const setChart = jest.fn()
    return {
        ...jest.requireActual('../../ChartProvider.jsx'),
        useChartContext: () => ({
            setChart,
            getChart: jest.fn(),
        }),
        ChartProvider: ({ children }) => (
            <div data-testid="chart-provider">{children}</div>
        ),
        __setChart: setChart,
    }
})

// mock the StartScreen component which is a default export
jest.mock('../StartScreen.jsx', () => {
    return {
        __esModule: true,
        default: jest.fn(() => (
            <div data-test="start-screen">Start Screen</div>
        )),
    }
})

// mock the VisualizationPlugin component which is a named export
jest.mock('../../VisualizationErrorInfo/VisualizationErrorInfo.jsx', () => ({
    VisualizationErrorInfo: jest.fn(() => (
        <div data-test="visualization-error-info">Error Info</div>
    )),
}))
jest.mock('../../VisualizationPlugin/VisualizationPlugin.jsx', () => ({
    VisualizationPlugin: jest.fn((props) => (
        <div data-test="visualization-plugin" id={props.id}>
            Visualization Plugin
        </div>
    )),
}))

describe('Visualization', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('renders the loading indicator and plugin when loading', () => {
        const reduxState = {
            loader: {
                isLoading: true,
                loadingError: null,
                isPluginLoading: true,
            },
            current: {
                id: 'test-visualization',
            },
        }
        const store = setupTestStore(reduxState)
        renderWithProviders(<Visualization />, store)

        const loadingMask = screen.getByTestId('loading-mask')
        expect(loadingMask).toBeInTheDocument()
        const vis = screen.getByTestId('visualization-plugin')
        expect(vis).toBeInTheDocument()
    })

    test('renders the plugin and not loading indicator when not loading', () => {
        const reduxState = {
            loader: {
                isLoading: false,
                loadingError: null,
                isPluginLoading: false,
            },
            current: {
                id: 'test-visualization',
            },
        }
        const store = setupTestStore(reduxState)
        renderWithProviders(<Visualization />, store)

        const loadingMask = screen.queryByTestId('loading-mask')
        expect(loadingMask).not.toBeInTheDocument()
        const vis = screen.getByTestId('visualization-plugin')
        expect(vis).toBeInTheDocument()
    })

    test('renders a StartScreen when there is no visualization', () => {
        const reduxState = {
            loader: {
                isLoading: false,
                loadingError: null,
                isPluginLoading: false,
            },
        }
        const store = setupTestStore(reduxState)
        renderWithProviders(<Visualization />, store)

        const loadingMask = screen.queryByTestId('loading-mask')
        expect(loadingMask).not.toBeInTheDocument()
        const vis = screen.queryByTestId('visualization-plugin')
        expect(vis).not.toBeInTheDocument()
        const startScreen = screen.getByTestId('start-screen')
        expect(startScreen).toBeInTheDocument()
    })

    test('renders a VisualizationErrorInfo when there is an error', () => {
        const reduxState = {
            loader: {
                isLoading: false,
                loadingError: { message: 'An error occurred' },
                isPluginLoading: false,
            },
            current: {
                id: 'test-visualization',
            },
        }
        const store = setupTestStore(reduxState)
        renderWithProviders(<Visualization />, store)

        const errorInfo = screen.getByTestId('visualization-error-info')
        expect(errorInfo).toBeInTheDocument()
        const startScreen = screen.queryByTestId('start-screen')
        expect(startScreen).not.toBeInTheDocument()
        const visualizationPlugin = screen.queryByTestId('visualization-plugin')
        expect(visualizationPlugin).not.toBeInTheDocument()
    })

    test('renders a VisualizationPlugin when visualization available', () => {
        const reduxState = {
            loader: {
                isLoading: false,
                loadingError: null,
                isPluginLoading: false,
            },
            current: {
                id: 'test-visualization',
            },
        }
        const store = setupTestStore(reduxState)
        renderWithProviders(<Visualization />, store)
        const visualizationPlugin = screen.getByTestId('visualization-plugin')
        expect(visualizationPlugin).toBeInTheDocument()
        const startScreen = screen.queryByTestId('start-screen')
        expect(startScreen).not.toBeInTheDocument()
    })

    test('triggers addMetadata action when responses received from chart plugin', () => {
        const reduxState = {
            loader: {
                isLoading: false,
                loadingError: null,
                isPluginLoading: false,
            },
            current: {
                id: 'test-visualization',
            },
        }
        const store = setupTestStore(reduxState)
        jest.spyOn(store, 'dispatch')
        renderWithProviders(<Visualization />, store)

        // Find the last call to the VisualizationPlugin mock
        const lastCall =
            VisualizationPlugin.mock.calls[
                VisualizationPlugin.mock.calls.length - 1
            ]
        const props = lastCall[0]

        // Mock responses array
        const items = {
            a: { id: 'a', name: 'a' },
            b: { id: 'b', name: 'b' },
            c: { id: 'c', name: 'c' },
        }
        const mockResponses = [{ metaData: { items }, rows: [1, 2, 3] }]

        // Spy on store.dispatch to check for addMetadata action

        // Simulate chart plugin sending responses
        props.onResponsesReceived(mockResponses)

        // Assert that addMetadata was dispatched with the correct items
        const calls = store.dispatch.mock.calls.map(([action]) => action)
        const wasAddMetadataDispatched = calls.some(
            (action) => action.type === 'ADD_METADATA'
        )
        expect(wasAddMetadataDispatched).toBe(true)
    })

    test('triggers setChart action when chart has been generated', () => {
        const reduxState = {
            loader: {
                isLoading: false,
                loadingError: null,
                isPluginLoading: false,
            },
            current: {
                id: 'test-visualization',
            },
        }
        const store = setupTestStore(reduxState)

        renderWithProviders(<Visualization />, store)

        // Find the last call to the VisualizationPlugin mock
        const lastCall =
            VisualizationPlugin.mock.calls[
                VisualizationPlugin.mock.calls.length - 1
            ]
        const props = lastCall[0]

        // Simulate chart generation
        const fakeChart = { id: 'chart-123' }
        props.onChartGenerated(fakeChart)

        expect(setChart).toHaveBeenCalledWith(fakeChart)
    })

    test('renders visualization with new id when rightSidebarOpen prop changes', () => {
        // Set up initial redux state
        const reduxState = {
            loader: {
                isLoading: false,
                loadingError: null,
                isPluginLoading: false,
            },
            current: {
                id: 'test-visualization',
            },
            ui: {
                rightSidebarOpen: false,
            },
        }
        const store = setupTestStore(reduxState)
        renderWithProviders(<Visualization />, store)

        const initialPlugin = screen.getByTestId('visualization-plugin')
        expect(initialPlugin).toBeInTheDocument()
        const initialId = initialPlugin.getAttribute('id')
        expect(initialId).toBe(null)

        act(() => {
            store.dispatch({
                type: 'SET_UI_RIGHT_SIDEBAR_OPEN',
                value: true,
            })
        })

        // The component should update automatically via react-redux
        const updatedPlugin = screen.getByTestId('visualization-plugin')
        expect(updatedPlugin).toBeInTheDocument()
        const updatedId = updatedPlugin.getAttribute('id')
        expect(updatedId).toBe('1')

        expect(initialId).not.toEqual(updatedId)
    })
})
