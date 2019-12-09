import React from 'react'
import { shallow } from 'enzyme'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { ADD_TO_LAYOUT_OPTIONS } from '../../../../../modules/layout'

import { DropDown } from '../Menu'
import DropDownButton from '../DropDownButton'

describe('The DropDownButton component ', () => {
    let props
    let shallowDropDown

    const dropDown = () => {
        if (!shallowDropDown) {
            shallowDropDown = shallow(<DropDown {...props} />)
        }
        return shallowDropDown
    }

    beforeEach(() => {
        props = {
            anchorEl: null,
            classes: {},
            menuItems: [],
            onClick: jest.fn(),
            onClose: jest.fn(),
            addToButtonRef: { offsetWidth: 100 },
        }
        shallowDropDown = undefined
    })

    it('renders a <Fragment /> containing everything else ', () => {
        const button = dropDown()
            .find('Fragment')
            .first()

        expect(button.children()).toEqual(dropDown().children())
    })

    it('renders a <DropDownButton /> ', () => {
        const dropDownButton = dropDown().find(DropDownButton)

        expect(dropDownButton.length).toEqual(1)
    })

    it('renders a <Menu /> with no children if prop anchorEl is equal to a falsy value', () => {
        const menu = dropDown()
            .find(Menu)
            .dive()

        expect(menu.children().length).toEqual(0)
    })

    it('renders a Menu with children if prop anchorel is equal to a truthy value', () => {
        props.anchorEl = { getBoundingClientRect: () => ({ bottom: 100 }) }

        props.menuItems = ADD_TO_LAYOUT_OPTIONS.map((option, i) => (
            <MenuItem key={i} value={option.axisId} />
        ))

        const menu = dropDown()
            .find(Menu)
            .dive()

        expect(menu.children().length).toEqual(3)
    })
    it('should set the width based on the prop addToButtonRef', () => {
        const MARGIN = 5
        props.addToButtonRef = { offsetWidth: 1000 }

        const actualMinWidth = props.addToButtonRef.offsetWidth - MARGIN

        const menu = dropDown().find(Menu)
        const renderedMinWidth = menu.props().MenuListProps.style.minWidth

        expect(renderedMinWidth).toEqual(actualMinWidth)
    })
})
