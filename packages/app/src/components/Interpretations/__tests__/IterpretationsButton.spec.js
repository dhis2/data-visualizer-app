import { IconChevronRight24, IconChevronLeft24 } from '@dhis2/ui'
import { shallow } from 'enzyme'
import React from 'react'
import MenuButton from '../../MenuButton/MenuButton.js'
import { InterpretationsButton } from '../InterpretationsButton.js'

describe('InterpretationsButton component', () => {
    let props
    let shallowInterpretationsButton

    const interpretationsButton = () => {
        if (!shallowInterpretationsButton) {
            shallowInterpretationsButton = shallow(
                <InterpretationsButton {...props} />
            )
        }
        return shallowInterpretationsButton
    }

    const onClick = jest.fn()

    beforeEach(() => {
        props = {
            classes: {},
            id: 'test',
            rightSidebarOpen: false,
            onClick,
        }

        shallowInterpretationsButton = undefined
    })

    it('renders a <MenuButton>', () => {
        expect(interpretationsButton().find(MenuButton).first().length).toEqual(
            1
        )
    })

    it('renders a disabled <MenuButton> if no id is passed', () => {
        props.id = null

        expect(
            interpretationsButton().find(MenuButton).prop('disabled')
        ).toEqual(true)
    })

    it('it triggers onClick when the button is clicked', () => {
        interpretationsButton().find(MenuButton).simulate('click')

        expect(onClick).toHaveBeenCalled()
    })

    it('uses the correct arrow icon based on props', () => {
        expect(
            interpretationsButton().find(IconChevronLeft24).first().length
        ).toEqual(1)
    })

    it('uses the correct arrow icon when the panel is open', () => {
        props.rightSidebarOpen = true

        expect(
            interpretationsButton().find(IconChevronRight24).first().length
        ).toEqual(1)
    })
})
