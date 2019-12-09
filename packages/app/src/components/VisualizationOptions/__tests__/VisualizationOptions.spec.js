import React from 'react'
import { shallow } from 'enzyme'
import Tabs from '@material-ui/core/Tabs'

import { VisualizationOptions } from '../VisualizationOptions'
import DataTab from '../DataTab'
import AxisAndLegendTab from '../AxisAndLegendTab'
import StyleTab from '../StyleTab'

describe('VisualizationOptions', () => {
    let props
    let shallowVisualizationOptions

    const visualizationOptions = () => {
        if (!shallowVisualizationOptions) {
            shallowVisualizationOptions = shallow(
                <VisualizationOptions {...props} />
            )
        }
        return shallowVisualizationOptions
    }

    beforeEach(() => {
        props = {
            classes: {},
        }

        shallowVisualizationOptions = undefined
    })

    it('renders the <Tabs /> component', () => {
        expect(visualizationOptions().find(Tabs).length).toBe(1)
    })

    it('renders the <DataTab /> component if activeTab is set to 0,', () => {
        expect(visualizationOptions().find(DataTab).length).toBe(1)
    })

    it('renders the <AxisAndLegendTab /> component if activeTab is set to 1', () => {
        const viz = visualizationOptions()
        viz.setState({ activeTab: 1 })

        expect(viz.find(AxisAndLegendTab).length).toBe(1)
    })

    it('renders the <StyleTab /> component if activeTab is set to 2', () => {
        const viz = visualizationOptions()
        viz.setState({ activeTab: 2 })

        expect(viz.find(StyleTab).length).toBe(1)
    })
})
