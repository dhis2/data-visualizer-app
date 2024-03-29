import { CheckboxField } from '@dhis2/ui'
import { shallow } from 'enzyme'
import React from 'react'
import { UnconnectedCheckboxBaseOption as CheckboxBaseOption } from '../Options/CheckboxBaseOption.js'

describe('DV > Options > CheckboxBaseOption', () => {
    let props
    let shallowCheckboxBaseOption
    let onChange

    const checkboxBaseOption = (props) => {
        shallowCheckboxBaseOption = shallow(<CheckboxBaseOption {...props} />)

        return shallowCheckboxBaseOption
    }

    beforeEach(() => {
        onChange = jest.fn()

        props = {
            value: false,
            label: 'text',
            option: { name: 'checkbox1' },
            onChange,
        }

        shallowCheckboxBaseOption = undefined
    })

    it('renders a label for checkbox', () => {
        expect(
            checkboxBaseOption(props).find(CheckboxField).props().label
        ).toEqual(props.label)
    })

    it('renders the checkbox with the correct checked state', () => {
        expect(
            checkboxBaseOption(props).find(CheckboxField).props().checked
        ).toBe(props.value)
    })

    it('should trigger the onChange callback on checkbox change', () => {
        const checkbox = checkboxBaseOption(props).find(CheckboxField)

        checkbox.simulate('change', { checked: true })

        expect(onChange).toHaveBeenCalled()
    })
})
