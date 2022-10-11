import { shallow } from 'enzyme'
import React from 'react'
import { GenericServerError } from '../../../modules/error.js'
import LoadingMask from '../../../widgets/LoadingMask.js'
import { VisualizationPlugin } from '../../VisualizationPlugin/VisualizationPlugin.js'
import StartScreen from '../StartScreen.js'
import { UnconnectedVisualization as Visualization } from '../Visualization.js'

jest.mock(
    '@dhis2/data-visualizer-plugin',
    () =>
        function DVPlugin() {
            return <div />
        }
)

describe('Visualization', () => {
    describe('component', () => {
        let props
        let shallowVisualization
        const vis = () => {
            if (!shallowVisualization) {
                shallowVisualization = shallow(<Visualization {...props} />)
            }
            return shallowVisualization
        }

        beforeEach(() => {
            props = {
                visualization: {},
                error: null,
                rightSidebarOpen: false,
                addMetadata: jest.fn(),
                setChart: jest.fn(),
                clearLoadError: jest.fn(),
                setLoadError: jest.fn(),
                onLoadingComplete: jest.fn(),
            }

            shallowVisualization = undefined
        })

        it('renders a StartScreen when error', () => {
            props.error = new GenericServerError()

            expect(vis().find(StartScreen).length).toEqual(1)
        })

        it('renders the loading indicator when loading', () => {
            props.isLoading = true
            expect(vis().find(LoadingMask).exists()).toBeTruthy()
        })

        it('hides the loading indicator when not loading', () => {
            props.isLoading = false
            expect(vis().find(LoadingMask).exists()).toBeFalsy()
        })

        it('renders a VisualizationPlugin when no error and visualization available', () => {
            expect(vis().find(VisualizationPlugin).length).toEqual(1)
        })

        it('triggers addMetadata action when responses received from chart plugin', () => {
            const items = {
                a: { id: 'a', name: 'a' },
                b: { id: 'b', name: 'b' },
                c: { id: 'c', name: 'c' },
            }

            vis()
                .instance()
                .onResponsesReceived([{ metaData: { items }, rows: [1, 2, 3] }])

            expect(props.addMetadata).toHaveBeenCalled()
            expect(props.addMetadata).toHaveBeenCalledWith(items)
        })

        it('triggers setChart action when chart has been generated', () => {
            const svg = 'coolChart'

            vis().instance().onChartGenerated(svg)

            expect(props.setChart).toHaveBeenCalled()
            expect(props.setChart).toHaveBeenCalledWith(svg)
        })

        it('renders visualization with new id when rightSidebarOpen prop changes', () => {
            const wrapper = vis()

            const initialId = wrapper.find(VisualizationPlugin).prop('id')
            wrapper.setProps({ ...props, rightSidebarOpen: true })
            const updatedId = wrapper.find(VisualizationPlugin).prop('id')

            expect(initialId).not.toEqual(updatedId)
        })
    })
})
