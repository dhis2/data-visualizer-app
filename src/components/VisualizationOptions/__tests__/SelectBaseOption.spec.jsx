import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { UnconnectedSelectBaseOption as SelectBaseOption } from '../Options/SelectBaseOption.jsx'

jest.mock('@dhis2/ui', () => {
    const originalModule = jest.requireActual('@dhis2/ui')
    return {
        ...originalModule,
        SingleSelectOption: ({ value, label }) => (
            <option value={value} data-test={`option-${value}`}>
                {label}
            </option>
        ),
        SingleSelectField: ({ children, dataTest, label, name, onChange }) => (
            <select
                label={label}
                name={name}
                data-test={dataTest}
                onChange={onChange}
            >
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
            name: 'toggleable',
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
        const { queryByTestId } = render(<SelectBaseOption {...props} />)
        const checkbox = screen.getByRole('checkbox', {
            name: props.label,
        })
        expect(checkbox).toBeInTheDocument()
        expect(checkbox).toHaveProperty('checked', false)

        const select = queryByTestId('hello-select')
        expect(select).not.toBeInTheDocument()
    })

    test('renders a <Checkbox /> and <SingleSelectField /> when the checkbox is enabled', () => {
        props.value = 'opt1'

        const { container, queryByTestId } = render(
            <SelectBaseOption {...props} />
        )
        expect(container).toMatchSnapshot()

        const checkbox = screen.getByRole('checkbox', {
            name: props.label,
        })
        expect(checkbox).toBeInTheDocument()

        const select = queryByTestId('hello-select')
        expect(select).toBeInTheDocument()
    })

    test('renders a <SingleSelectField /> when not toggleable', () => {
        props.toggleable = false
        const { container, queryByTestId } = render(
            <SelectBaseOption {...props} />
        )
        expect(container).toMatchSnapshot()

        const select = queryByTestId('hello-select')
        expect(select).toBeInTheDocument()

        const options = Array.from(select.children)
        expect(options).toHaveLength(3)
        options.forEach((option, index) => {
            expect(option.getAttribute('value')).toEqual(`opt${index + 1}`)
        })
    })

    test('should trigger the onChange callback on select change', () => {
        props.toggleable = false
        const { queryByTestId } = render(<SelectBaseOption {...props} />)

        const select = queryByTestId('hello-select')
        expect(select).toBeInTheDocument()

        fireEvent.change(select, { target: { value: 'opt2' } })

        expect(onChange).toHaveBeenCalled()
        // expect(onChange).toHaveBeenCalledWith('opt2')
    })
})
