import { Checkbox, Input, InputField } from '@dhis2/ui'
import { shallow } from 'enzyme'
import React from 'react'
import { TextBaseOption } from '../Options/TextBaseOption'

describe('DV > Options > TextBaseOption', () => {
    let props
    let shallowTextBaseOption
    let onChange

    const textBaseOption = props => {
        shallowTextBaseOption = shallow(<TextBaseOption {...props} />)

        return shallowTextBaseOption
    }

    describe('non toggleable', () => {
        beforeEach(() => {
            onChange = jest.fn()

            props = {
                value: 'test',
                type: 'text',
                label: 'Input field',
                option: {
                    name: 'input1',
                },

                onChange,
            }

            shallowTextBaseOption = undefined
        })

        it('renders a <InputField />', () => {
            expect(textBaseOption(props).find(InputField)).toHaveLength(1)
        })

        it('sets the type prop to what passed in the prop', () => {
            expect(textBaseOption(props).find(InputField).props().type).toEqual(
                props.type
            )
        })

        it('sets the label prop to what passed in the prop', () => {
            expect(
                textBaseOption(props).find(InputField).props().label
            ).toEqual(props.label)
        })

        it('sets the value to what passed in the prop', () => {
            expect(
                textBaseOption(props).find(InputField).props().value
            ).toEqual(props.value)
        })

        it('sets the help text to what passed in the prop', () => {
            props.helpText = 'helper text'

            expect(
                textBaseOption(props).find(InputField).props().helpText
            ).toEqual(props.helpText)
        })

        it('sets the placeholder to what passed in the prop', () => {
            props.placeholder = 'placeholder text'

            expect(
                textBaseOption(props).find(InputField).props().placeholder
            ).toEqual(props.placeholder)
        })

        it('sets the width prop to what passed in the prop', () => {
            props.width = '105px'

            expect(
                textBaseOption(props).find(InputField).props().inputWidth
            ).toEqual(props.width)
        })

        it('should trigger the onChange callback on text change', () => {
            const text = textBaseOption(props).find(InputField)

            text.simulate('change', { value: 'test' })

            expect(onChange).toHaveBeenCalled()
        })

        it('renders a <Input /> field when inline is passed', () => {
            props.inline = true

            expect(textBaseOption(props).find(Input)).toHaveLength(1)
            expect(textBaseOption(props).find(InputField)).toHaveLength(0)
        })
    })

    describe('toggleable', () => {
        beforeEach(() => {
            props = {
                value: 'test',
                type: 'text',
                label: 'Input field',
                option: {
                    name: 'input1',
                },
                toggleable: true,

                onChange: jest.fn(),
                onToggle: jest.fn(),
            }

            shallowTextBaseOption = undefined
        })

        it('renders a <Checkbox />', () => {
            expect(textBaseOption(props).find(Checkbox)).toHaveLength(1)
        })

        it('does not render a <InputField />', () => {
            expect(textBaseOption(props).find(InputField)).toHaveLength(0)
        })

        it('does render a <InputField /> when the checkbox is checked', () => {
            props.checked = true

            const text = textBaseOption(props)
            expect(text.find(InputField)).toHaveLength(1)
            expect(text.find(Checkbox).props().checked).toBe(true)
        })
    })
})
