import React from 'react'
import { shallow } from 'enzyme'
import { DndDimensionsPanel } from '../DndDimensionsPanel'

import { Dimensions } from '../DimensionsPanel'

describe('Dimensions component ', () => {
    let shallowDimensions
    let props
    const dimensionsComponent = () => {
        if (!shallowDimensions) {
            shallowDimensions = shallow(<Dimensions {...props} />)
        }
        return shallowDimensions
    }

    beforeEach(() => {
        shallowDimensions = undefined
        props = {
            ui: {
                layout: {},
                type: '',
            },
            itemsByDimension: {},
            axisItemHandler: () => {},
            removeItemHandler: () => {},
            getCurrentAxisId: () => '',
        }
    })

    it('renders a div', () => {
        expect(dimensionsComponent().find('div').length).toEqual(1)
    })

    it('renders a div containing everything else', () => {
        const wrappingDiv = dimensionsComponent()
            .find('div')
            .first()

        expect(wrappingDiv.children()).toEqual(dimensionsComponent().children())
    })

    it('renders a DndDimensionsPanel', () => {
        const dimensionsComp = dimensionsComponent()

        expect(dimensionsComp.find(DndDimensionsPanel).length).toEqual(1)
    })
})
