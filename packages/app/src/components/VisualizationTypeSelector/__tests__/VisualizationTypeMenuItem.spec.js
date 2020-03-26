import React from 'react'
import { shallow } from 'enzyme'
import { VIS_TYPE_COLUMN } from '@dhis2/analytics'

import VisualizationTypeMenuItem from '../VisualizationTypeMenuItem'
import MenuItemIcon from '../MenuItemIcon'

describe('VisualizationTypeMenuItem component ', () => {
    let props
    let shallowElement

    const element = () => {
        if (!shallowElement) {
            shallowElement = shallow(<VisualizationTypeMenuItem {...props} />)
        }
        return shallowElement
    }

    beforeEach(() => {
        props = {
            type: VIS_TYPE_COLUMN,
            visualizationType: VIS_TYPE_COLUMN,
        }
        shallowElement = undefined
    })

    it('renders a div', () => {
        expect(
            element()
                .find('div')
                .first().length
        ).toEqual(1)
    })

    it('renders MenuItemIcon', () => {
        expect(
            element()
                .find(MenuItemIcon)
                .first().length
        ).toEqual(1)
    })
})
