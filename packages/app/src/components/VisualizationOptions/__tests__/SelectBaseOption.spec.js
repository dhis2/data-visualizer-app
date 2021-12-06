import { Checkbox, SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import { shallow } from 'enzyme'
import React from 'react'
import { SelectBaseOption } from '../Options/SelectBaseOption'

describe('DV > Options > SelectBaseOption', () => {
    let props
    let shallowSelectBaseOption
    const onChange = jest.fn()

    const selectBaseOption = (props) => {
        shallowSelectBaseOption = shallow(<SelectBaseOption {...props} />)

        return shallowSelectBaseOption
    }

    describe('toggleable', () => {
        beforeEach(() => {
            props = {
                value: '',
                label: 'toggleable test',
                option: {
                    name: 'toggleable-select',
                    defaultValue: '',
                    items: [
                        { value: 'opt1', label: 'Option 1' },
                        { value: 'opt2', label: 'Option 2' },
                        { value: 'opt3', label: 'Option 3' },
                    ],
                },
                onChange,
                toggleable: true,
            }

            shallowSelectBaseOption = undefined
        })

        it('renders a <Checkbox />', () => {
            expect(selectBaseOption(props).find(Checkbox)).toHaveLength(1)
        })

        it('does not render a <SingleSelectField />', () => {
            expect(
                selectBaseOption(props).find(SingleSelectField)
            ).toHaveLength(0)
        })

        it('does render a <SingleSelectField /> when the checkbox is enabled', () => {
            const select = selectBaseOption(props)
            const checkbox = select.find(Checkbox)
            checkbox.simulate('change', { checked: true })

            expect(select.find(SingleSelectField)).toHaveLength(1)
            expect(onChange).toHaveBeenCalledWith(props.option.items[0].value)
            expect(select.find(Checkbox).props().checked).toBe(true)
        })
    })

    describe('non toggleable', () => {
        beforeEach(() => {
            props = {
                value: '',
                option: {
                    name: 'non-toggleable-select',
                    defaultValue: '',
                    items: [
                        { value: 'opt1', label: 'Option 1' },
                        { value: 'opt2', label: 'Option 2' },
                        { value: 'opt3', label: 'Option 3' },
                    ],
                },
                onChange,
                toggleable: false,
            }

            shallowSelectBaseOption = undefined
        })

        it('renders a <SingleSelectField />', () => {
            expect(
                selectBaseOption(props).find(SingleSelectField)
            ).toHaveLength(1)
        })

        it('renders the list of options', () => {
            const options = selectBaseOption(props).find(SingleSelectOption)

            options.forEach((item, index) => {
                const option = props.option.items[index]

                expect(item.props().value).toEqual(option.value)
                expect(item.props().label).toEqual(option.label)
            })
        })

        it('should trigger the onChange callback on select change', () => {
            const select = selectBaseOption(props).find(SingleSelectField)

            select.simulate('change', {
                selected: {
                    value: props.option.items.find(
                        (item) => item.value === 'opt2'
                    ),
                },
            })

            expect(onChange).toHaveBeenCalled()
        })
    })
})
