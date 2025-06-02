import { render, screen } from '@testing-library/react'
import React from 'react'
// import LoadingMask from '../../../widgets/LoadingMask.jsx'
import { VisualizationErrorInfo } from '../../VisualizationErrorInfo/VisualizationErrorInfo.jsx'
import { VisualizationPlugin } from '../../VisualizationPlugin/VisualizationPlugin.jsx'
import StartScreen from '../StartScreen.jsx'
import { UnconnectedVisualization as Visualization } from '../Visualization.jsx'

// mock the LoadingMask component
jest.mock('../../../widgets/LoadingMask.jsx', () => {
    return {
        __esModule: true,
        default: jest.fn(() => (
            <div data-testid="loading-mask">Loading...</div>
        )),
    }
})

// mock the StartScreen component which is a default export
jest.mock('../StartScreen.jsx', () => {
    return {
        __esModule: true,
        default: jest.fn(() => (
            <div data-testid="start-screen">Start Screen</div>
        )),
    }
})

// mock the VisualizationPlugin component which is a named export
jest.mock('../../VisualizationErrorInfo/VisualizationErrorInfo.jsx', () => ({
    VisualizationErrorInfo: jest.fn(() => (
        <div data-testid="visualization-error-info">Error Info</div>
    )),
}))
jest.mock('../../VisualizationPlugin/VisualizationPlugin.jsx', () => ({
    VisualizationPlugin: jest.fn(({ id }) => (
        <div data-testid="visualization-plugin" id={id}>
            Visualization Plugin
        </div>
    )),
}))

describe('Visualization', () => {
    const setChart = jest.fn()

    test('renders the loading indicator when loading', () => {
        const props = {
            error: undefined,
            visualization: {},
            userSettings: {
                displayProperty: 'shortName',
            },
            rightSidebarOpen: false,
            addMetadata: jest.fn(),
            clearLoadError: jest.fn(),
            setLoadError: jest.fn(),
            onLoadingComplete: jest.fn(),
        }
        props.isLoading = true
        render(<Visualization {...props} setChart={setChart} />)
        const loadingMask = screen.getByTestId('loading-mask')
        expect(loadingMask).toBeInTheDocument()
    })

    test('Visualizationhides the loading indicator when not loading', () => {
        const props = {
            error: undefined,
            visualization: {},
            userSettings: {
                displayProperty: 'shortName',
            },
            rightSidebarOpen: false,
            addMetadata: jest.fn(),
            clearLoadError: jest.fn(),
            setLoadError: jest.fn(),
            onLoadingComplete: jest.fn(),
            isLoading: false,
        }
        render(<Visualization {...props} />)
        const loadingMask = screen.queryByTestId('loading-mask')
        expect(loadingMask).not.toBeInTheDocument()
    })

    test('renders a StartScreen when there is no visualization', () => {
        const props = {
            error: undefined,
            visualization: null,
            userSettings: {
                displayProperty: 'shortName',
            },
            rightSidebarOpen: false,
            addMetadata: jest.fn(),
            clearLoadError: jest.fn(),
            setLoadError: jest.fn(),
            onLoadingComplete: jest.fn(),
        }
        render(<Visualization {...props} setChart={setChart} />)
        const startScreen = screen.getByTestId('start-screen')
        expect(startScreen).toBeInTheDocument()
    })

    test('renders a VisualizationErrorInfo when there is an error', () => {
        const props = {
            error: new Error('some error'),
        }
        render(<Visualization {...props} setChart={setChart} />)
        const errorInfo = screen.getByTestId('visualization-error-info')
        expect(errorInfo).toBeInTheDocument()
        const startScreen = screen.queryByTestId('start-screen')
        expect(startScreen).not.toBeInTheDocument()
        const visualizationPlugin = screen.queryByTestId('visualization-plugin')
        expect(visualizationPlugin).not.toBeInTheDocument()
    })

    test('renders a VisualizationPlugin when visualization available', () => {
        const props = {
            visualization: { id: 'test-visualization' },
            userSettings: {
                displayProperty: 'shortName',
            },
            rightSidebarOpen: false,
            addMetadata: jest.fn(),
            clearLoadError: jest.fn(),
            setLoadError: jest.fn(),
            onLoadingComplete: jest.fn(),
        }
        render(<Visualization {...props} setChart={setChart} />)
        const visualizationPlugin = screen.getByTestId('visualization-plugin')
        expect(visualizationPlugin).toBeInTheDocument()
        const startScreen = screen.queryByTestId('start-screen')
        expect(startScreen).not.toBeInTheDocument()
    })

    test.skip('triggers addMetadata action when responses received from chart plugin', () => {})

    test.skip('triggers setChart action when chart has been generated', () => {})

    test('renders visualization with new id when rightSidebarOpen prop changes', () => {
        const props = {
            visualization: { id: 'test-visualization' },
            userSettings: {
                displayProperty: 'shortName',
            },
            rightSidebarOpen: false,
            addMetadata: jest.fn(),
            clearLoadError: jest.fn(),
            setLoadError: jest.fn(),
            onLoadingComplete: jest.fn(),
        }
        const vis = (additionalProps = {}) => {
            return render(<Visualization {...props} {...additionalProps} />)
        }
        // Initial render
        const { rerender } = vis()
        const initialPlugin = screen.getByTestId('visualization-plugin')
        expect(initialPlugin).toBeInTheDocument()
        const initialId = initialPlugin.getAttribute('id')
        expect(initialId).toBe(null)

        // re-render with rightSidebarOpen prop changed
        rerender(<Visualization {...props} rightSidebarOpen={true} />)
        const updatedPlugin = screen.getByTestId('visualization-plugin')
        expect(updatedPlugin).toBeInTheDocument()
        const updatedId = updatedPlugin.getAttribute('id')
        expect(updatedId).toBe('1')

        expect(initialId).not.toEqual(updatedId)
    })
})
