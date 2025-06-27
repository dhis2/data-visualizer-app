import { screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { renderWithProviders } from '../../../../config/testsContext.js'
import { setupTestStore } from '../../../configureStore.js'
import { DEFAULT_UI } from '../../../reducers/ui.js'
import { CheckboxBaseOption } from '../Options/CheckboxBaseOption.jsx'

test('CheckboxBaseOption renders a label for checkbox', () => {
    const reduxState = {
        ui: {
            ...DEFAULT_UI,
            options: {
                completedOnly: true,
            },
        },
    }

    const store = setupTestStore(reduxState)
    const label = 'Show only completed tasks'

    renderWithProviders(
        <CheckboxBaseOption
            label={label}
            option={{
                name: 'completedOnly',
            }}
        />,
        store
    )
    expect(screen.getByLabelText(label)).toBeInTheDocument()

    const checkbox = screen.getByRole('checkbox', { name: label })
    expect(checkbox.checked).toEqual(true)
})

test('CheckboxBaseOption dispatches an action on checkbox change', () => {
    const reduxState = {
        ui: {
            ...DEFAULT_UI,
            options: {
                completedOnly: true,
            },
        },
    }

    const store = setupTestStore(reduxState)
    jest.spyOn(store, 'dispatch')
    const label = 'Show only completed tasks'

    renderWithProviders(
        <CheckboxBaseOption
            label={label}
            option={{
                name: 'completedOnly',
            }}
        />,
        store
    )

    const checkbox = screen.getByRole('checkbox', { name: label })
    fireEvent.click(checkbox)
    expect(store.dispatch.mock.calls.length).toBe(1)
})
