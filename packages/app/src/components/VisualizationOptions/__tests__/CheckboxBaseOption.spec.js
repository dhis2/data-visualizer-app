import React from 'react'
import { shallow } from 'enzyme'

import { Checkbox } from '@dhis2/ui'

import { CheckboxBaseOption } from '../Options/CheckboxBaseOption'

describe('DV > Options > CheckboxBaseOption', () => {
    let props
    let shallowCheckboxBaseOption
    let onChange

    const checkboxBaseOption = props => {
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
            checkboxBaseOption(props)
                .find(Checkbox)
                .props().label
        ).toEqual(props.label)
    })

    it('renders the checkbox with the correct checked state', () => {
        expect(
            checkboxBaseOption(props)
                .find(Checkbox)
                .props().checked
        ).toBe(props.value)
    })

    it('should trigger the onChange callback on checkbox change', () => {
        const checkbox = checkboxBaseOption(props).find(Checkbox)

        checkbox.simulate('change', { checked: true })

        expect(onChange).toHaveBeenCalled()
    })
})
