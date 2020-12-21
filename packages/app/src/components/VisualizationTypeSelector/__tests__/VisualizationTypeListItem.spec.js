import React from 'react'
import { shallow } from 'enzyme'
import { VIS_TYPE_COLUMN } from '@dhis2/analytics'

import VisualizationTypeListItem from '../VisualizationTypeListItem'
import ListItemIcon from '../ListItemIcon'

describe('VisualizationTypeListItem component ', () => {
    let props
    let shallowElement

    const element = () => {
        if (!shallowElement) {
            shallowElement = shallow(<VisualizationTypeListItem {...props} />)
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
        expect(element().find('div').first().length).toEqual(1)
    })

    it('renders ListItemIcon', () => {
        expect(element().find(ListItemIcon).first().length).toEqual(1)
    })
})
