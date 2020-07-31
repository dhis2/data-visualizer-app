import React from 'react'
import { shallow } from 'enzyme'

import { Tab, TabBar } from '@dhis2/ui'

import { VisualizationOptions } from '../VisualizationOptions'
import { getOptionsByType } from '../../../modules/options/config'

describe('VisualizationOptions', () => {
    let props
    let shallowVisualizationOptions
    let options

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
            visualizationType: 'COLUMN',
            ui: {
                layout: {
                    columns: ['dx'],
                },
                itemsByDimension: {
                    dx: ['abcdef'],
                },
                options: {
                    series: [
                        {
                            dimensionItem: 'abcdef',
                            axis: 0,
                        },
                    ],
                },
            },
        }

        shallowVisualizationOptions = undefined

        options = getOptionsByType(props.visualizationType)
    })

    it('renders the <TabBar /> and <Tab /> components', () => {
        const component = visualizationOptions()

        expect(component.find(TabBar).length).toBe(1)
        expect(component.find(Tab).length).toBe(options.length)
    })

    it('renders the correct <Tab /> content based on current state', () => {
        const index = 1

        const component = visualizationOptions()
        component.setState({ activeTabKey: options[index].key })

        const tabs = component.find(Tab)
        expect(tabs.get(index - 1).props.selected).toBe(false)
        expect(tabs.get(index).props.selected).toBe(true)

        const optionComponents = options[index].content.reduce((acc, obj) => {
            acc.push(...obj.content)
            return acc
        }, [])

        optionComponents.forEach(optionComponent =>
            expect(component.find(optionComponent.type).length).toBe(1)
        )
    })
})
