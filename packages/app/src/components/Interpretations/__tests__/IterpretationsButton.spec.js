import React from 'react'
import { shallow } from 'enzyme'
import { InterpretationsButton } from '../InterpretationsButton'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

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

    it('renders a <Button>', () => {
        expect(
            interpretationsButton()
                .find(Button)
                .first().length
        ).toEqual(1)
    })

    it('renders a disabled <Button> if no id is passed', () => {
        props.id = null

        expect(
            interpretationsButton()
                .find(Button)
                .prop('disabled')
        ).toEqual(true)
    })

    it('it triggers onClick when the button is clicked', () => {
        interpretationsButton()
            .find(Button)
            .simulate('click')

        expect(onClick).toHaveBeenCalled()
    })

    it('uses the correct arrow icon based on props', () => {
        expect(
            interpretationsButton()
                .find(KeyboardArrowLeftIcon)
                .first().length
        ).toEqual(1)
    })

    it('uses the correct arrow icon when the panel is open', () => {
        props.rightSidebarOpen = true

        expect(
            interpretationsButton()
                .find(KeyboardArrowRightIcon)
                .first().length
        ).toEqual(1)
    })
})
