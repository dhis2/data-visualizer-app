import {
    render,
    screen,
    queryByAttribute,
    fireEvent,
} from '@testing-library/react'
import React from 'react'
import { UnconnectedSelectBaseOption as SelectBaseOption } from '../Options/SelectBaseOption.jsx'

jest.mock('@dhis2/ui', () => {
    const originalModule = jest.requireActual('@dhis2/ui')
    return {
        ...originalModule,
        SingleSelectOption: ({ value, label }) => (
            <div value={value} data-test={`option-${value}`}>
                {label}
            </div>
        ),
        SingleSelectField: ({ children, ...props }) => (
            <select {...props} data-test={`${props.dataTest}-select`}>
                {children}
            </select>
        ),
    }
})

describe('DV > Options > SelectBaseOption', () => {
    const onChange = jest.fn()

    const props = {
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
        dataTest: 'hello',
    }

    test('renders a <Checkbox />', () => {
        const { container } = render(<SelectBaseOption {...props} />)
        const checkbox = screen.getByRole('checkbox', {
            name: props.label,
        })
        expect(checkbox).toBeInTheDocument()
        expect(checkbox).toHaveProperty('checked', false)

        const getByDataTest = queryByAttribute.bind(null, 'data-test')
        const select = getByDataTest(container, 'hello-select-select')
        expect(select).not.toBeInTheDocument()
    })

    test('renders a <Checkbox /> and <SingleSelectField /> when the checkbox is enabled', () => {
        props.value = 'opt1'

        const { container } = render(<SelectBaseOption {...props} />)
        expect(container).toMatchSnapshot()

        const checkbox = screen.getByRole('checkbox', {
            name: props.label,
        })
        expect(checkbox).toBeInTheDocument()

        const getByDataTest = queryByAttribute.bind(null, 'data-test')
        const select = getByDataTest(container, 'hello-select-select')
        expect(select).toBeInTheDocument()
    })

    test('renders a <SingleSelectField /> when not toggleable', () => {
        props.toggleable = false
        const { container } = render(<SelectBaseOption {...props} />)
        expect(container).toMatchSnapshot()

        const getByDataTest = queryByAttribute.bind(null, 'data-test')
        const select = getByDataTest(container, 'hello-select-select')
        expect(select).toBeInTheDocument()

        const options = Array.from(select.children)
        expect(options).toHaveLength(3)
        options.forEach((option, index) => {
            expect(option.getAttribute('value')).toEqual(`opt${index + 1}`)
        })
    })

    test('should trigger the onChange callback on select change', () => {
        props.toggleable = false
        const { container } = render(<SelectBaseOption {...props} />)

        const getByDataTest = queryByAttribute.bind(null, 'data-test')
        const select = getByDataTest(container, 'hello-select-select')
        expect(select).toBeInTheDocument()

        fireEvent.change(select, { target: { value: 'opt2' } })

        expect(onChange).toHaveBeenCalled()
        // expect(onChange).toHaveBeenCalledWith('opt2')
    })
})
