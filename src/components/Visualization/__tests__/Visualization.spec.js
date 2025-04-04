import { shallow } from 'enzyme'
import React from 'react'
import LoadingMask from '../../../widgets/LoadingMask.js'
import { VisualizationErrorInfo } from '../../VisualizationErrorInfo/VisualizationErrorInfo.js'
import { VisualizationPlugin } from '../../VisualizationPlugin/VisualizationPlugin.js'
import StartScreen from '../StartScreen.js'
import { UnconnectedVisualization as Visualization } from '../Visualization.js'

describe('Visualization', () => {
    describe('component', () => {
        let props
        let shallowVisualization
        const setChart = jest.fn()
        const vis = () => {
            if (!shallowVisualization) {
                shallowVisualization = shallow(<Visualization {...props} />, {
                    context: {
                        setChart,
                    },
                })
            }
            return shallowVisualization
        }

        beforeEach(() => {
            props = {
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

            shallowVisualization = undefined
        })

        it('renders the loading indicator when loading', () => {
            props.isLoading = true
            expect(vis().find(LoadingMask).exists()).toBeTruthy()
        })

        it('hides the loading indicator when not loading', () => {
            props.isLoading = false
            expect(vis().find(LoadingMask).exists()).toBeFalsy()
        })

        it('renders a StartScreen when there is no visualization', () => {
            props.visualization = undefined
            expect(vis().find(StartScreen).length).toEqual(1)
        })

        it('renders a VisualizationErrorInfo when there is an error', () => {
            props.error = new Error('some error')
            expect(vis().find(VisualizationErrorInfo).length).toEqual(1)
        })

        it('renders a VisualizationPlugin when visualization available', () => {
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
            const highChartChartInstanceMock = {}

            vis().instance().onChartGenerated(highChartChartInstanceMock)

            expect(setChart).toHaveBeenCalled()
            expect(setChart).toHaveBeenCalledWith(highChartChartInstanceMock)
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
