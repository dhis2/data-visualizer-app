import React from 'react'
import { shallow } from 'enzyme'
import VisualizationPlugin from '@dhis2/data-visualizer-plugin'
import {
    Visualization,
    visConfigSelector,
    visFiltersSelector,
} from '../Visualization'
import StartScreen from '../StartScreen'

jest.mock('@dhis2/data-visualizer-plugin', () => () => <div />)

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
                visConfig: {},
                visFilters: null,
                error: null,
                rightSidebarOpen: false,
                acAddMetadata: jest.fn(),
                acSetChart: jest.fn(),
                acClearLoadError: jest.fn(),
                acSetLoadError: jest.fn(),
            }

            shallowVisualization = undefined
        })

        it('renders a StartScreen when error', () => {
            props.error = 'there was a catastrophic error'

            expect(vis().find(StartScreen).length).toEqual(1)
        })

        it('renders a VisualizationPlugin when no error and visConfig available', () => {
            expect(vis().find(VisualizationPlugin).length).toEqual(1)
        })

        it('triggers addMetadata action when responses received from chart plugin', () => {
            const items = {
                a: { id: 'a', name: 'a' },
                b: { id: 'b', name: 'b' },
                c: { id: 'c', name: 'c' },
            }

            vis().simulate('responsesReceived', [{ metaData: { items } }])

            expect(props.acAddMetadata).toHaveBeenCalled()
            expect(props.acAddMetadata).toHaveBeenCalledWith(items)
        })

        it('triggers setChart action when chart has been generated', () => {
            const svg = 'coolChart'

            vis().simulate('chartGenerated', svg)

            expect(props.acSetChart).toHaveBeenCalled()
            expect(props.acSetChart).toHaveBeenCalledWith(svg)
        })

        it('triggers setLoadError when error received from chart plugin', () => {
            const errorMsg = 'catastrophic error'

            vis().simulate('error', { message: errorMsg })

            expect(props.acSetLoadError).toHaveBeenCalled()
            expect(props.acSetLoadError).toHaveBeenCalledWith(errorMsg)
        })

        it('renders visualization with new id when rightSidebarOpen prop changes', () => {
            const wrapper = vis()

            const initialId = wrapper.find(VisualizationPlugin).prop('id')
            wrapper.setProps({ ...props, rightSidebarOpen: true })
            const updatedId = wrapper.find(VisualizationPlugin).prop('id')

            expect(initialId).not.toEqual(updatedId)
        })
    })

    describe('reselectors', () => {
        const state = {
            current: 'current',
            visualization: 'vis',
            ui: {
                interpretation: {},
            },
        }

        describe('visConfigSelector', () => {
            it('equals the visualization if interpretation selected', () => {
                const newState = Object.assign({}, state, {
                    ui: { interpretation: { id: 'rainbow dash' } },
                })

                const selector = visConfigSelector(newState)
                expect(selector).toEqual('vis')
            })

            it('equals the current if no interpretation selected', () => {
                const selector = visConfigSelector(state)
                expect(selector).toEqual('current')
            })
        })

        describe('visFiltersSelector', () => {
            it('equals object with interpretation date if interpretation selected', () => {
                const created = 'the near future'
                const newState = Object.assign({}, state, {
                    ui: {
                        interpretation: {
                            created,
                        },
                    },
                })
                const selector = visFiltersSelector(newState)
                expect(selector).toEqual({
                    relativePeriodDate: created,
                })
            })

            it('equals empty object if no interpretation selected', () => {
                const selector = visFiltersSelector(state)
                expect(selector).toEqual({})
            })
        })
    })
})
