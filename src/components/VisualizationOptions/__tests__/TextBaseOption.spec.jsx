import { render, screen, queryByAttribute } from '@testing-library/react'
import React from 'react'
import { UnconnectedTextBaseOption as TextBaseOption } from '../Options/TextBaseOption.jsx'

describe('DV > Options > TextBaseOption', () => {
    test('renders an <InputField /> for input type "text"', () => {
        const props = {
            value: 'Romeo and Juliet',
            type: 'text',
            label: 'Your favorite tragedy',
            onChange: jest.fn(),
            option: {
                name: 'tragedy',
            },
            helpText: 'a tragedy',
            placeholder: 'Suggest one of the tragedies',
            width: '100px',
        }

        render(<TextBaseOption {...props} />)

        const inputNode = screen.getByLabelText('Your favorite tragedy', {
            selector: 'input',
        })

        expect(inputNode.disabled).toBeFalsy()
        expect(inputNode.type).toEqual('text')
        expect(inputNode.value).toEqual('Romeo and Juliet')
        expect(inputNode.placeholder).toEqual('Suggest one of the tragedies')
        // expect(inputNode.helpText).toEqual('a tragedy')
        // expect(inputNode.style.width).toEqual('100px')

        // userEvent.type(inputNode, 'King Lear')
        // expect(props.onChange).toHaveBeenCalledWith('King Lear')
    })

    test('renders a <Input /> field when inline is passed', () => {
        const props = {
            type: 'text',
            onChange: jest.fn(),
            option: {
                name: 'tragedy',
            },
            value: 'Romeo and Juliet',
            placeholder: 'Suggest one of the tragedies',
            inline: true,
            disabled: false,
            dataTest: 'tragedy-input',
        }

        const getByDataTest = queryByAttribute.bind(null, 'data-test')
        const { container } = render(<TextBaseOption {...props} />)

        const containerDiv = getByDataTest(container, 'tragedy-input-input')
        expect(containerDiv).toBeInTheDocument()

        const inputNode = containerDiv.firstChild

        expect(inputNode.disabled).toBeFalsy()
        expect(inputNode.type).toEqual('text')
        expect(inputNode.value).toEqual('Romeo and Juliet')
        expect(inputNode.placeholder).toEqual('Suggest one of the tragedies')
    })

    test('renders a <Checkbox />', () => {
        const props = {
            checked: false,
            label: 'Your favorite tragedy',
            option: {
                name: 'input1',
            },
            toggleable: true,
            onToggle: jest.fn(),
        }

        render(<TextBaseOption {...props} />)

        const checkbox = screen.getByRole('checkbox', {
            name: 'Your favorite tragedy',
        })
        expect(checkbox).toBeInTheDocument()
        expect(checkbox.checked).toBe(false)
        expect(checkbox).toHaveAttribute('name', 'input1-toggle')
        expect(checkbox).toHaveAttribute('type', 'checkbox')
    })

    test('does render a <InputField /> when the checkbox is checked', () => {
        const props = {
            checked: true,
            label: 'Your favorite tragedy',
            option: {
                name: 'input1',
            },
            toggleable: true,
            onToggle: jest.fn(),
        }

        render(<TextBaseOption {...props} />)

        const checkbox = screen.getByRole('checkbox', {
            name: 'Your favorite tragedy',
        })

        expect(checkbox).toBeInTheDocument()
        expect(checkbox.checked).toBe(true)
        expect(checkbox).toHaveAttribute('name', 'input1-toggle')
        expect(checkbox).toHaveAttribute('type', 'checkbox')
    })

    // Need to add redux store to test this
    test.skip('renders a TextStyle component when fontStyleKey is passed', () => {
        const props = {
            value: 'Arial',
            type: 'text',
            label: 'Font Style',
            onChange: jest.fn(),
            option: {
                name: 'fontStyle',
            },
            fontStyleKey: 'fontStyle',
            helpText: 'Select a font style',
            placeholder: 'Choose a font style',
            width: '100px',
            dataTest: 'font-style-input',
        }

        const getByDataTest = queryByAttribute.bind(null, 'data-test')

        const { container } = render(<TextBaseOption {...props} />)

        const containerDiv = getByDataTest(
            container,
            'font-style-input-text-style'
        )
        expect(containerDiv).toBeInTheDocument()
    })
})
