import React from 'react'
import { render, screen, queryByAttribute } from '@testing-library/react'
import { TextBaseOption } from '../Options/TextBaseOption.jsx'
import { setupTestStore } from '../../../configureStore.js'
import { renderWithProviders } from '../../../../config/testsContext.js'
import { DEFAULT_UI } from '../../../reducers/ui.js'
import {
    OPTION_FONT_SIZE,
    OPTION_TARGET_LINE_ENABLED,
} from '../../../modules/options.js'

jest.mock('@dhis2/ui', () => ({
    ...jest.requireActual('@dhis2/ui'),
    Input: ({ name, value }) => <div id="input" name={name} value={value} />,
    InputField: ({ name, value }) => (
        <div id="inputfield" name={name} value={value} />
    ),
    Checkbox: ({ name, value }) => (
        <div id="checkbox" name={name} value={value} />
    ),
    Box: ({ children }) => <div id="box">{children}</div>,
}))

test('TextBaseOption renders an <InputField />', () => {
    const option = { name: 'title' }
    const initialState = {
        ui: {
            ...DEFAULT_UI,
            options: {
                ...DEFAULT_UI.options,
                title: 'hello',
            },
        },
    }
    const store = setupTestStore(initialState)

    const { container } = renderWithProviders(
        <TextBaseOption option={option} />,
        store
    )

    expect(container).toMatchSnapshot()
})

test('TextBaseOption renders a <Input /> field when inline is true', () => {
    const option = { name: 'title' }
    const initialState = {
        ui: {
            ...DEFAULT_UI,
            options: {
                ...DEFAULT_UI.options,
                title: 'hello',
            },
        },
    }
    const store = setupTestStore(initialState)

    const { container } = renderWithProviders(
        <TextBaseOption option={option} inline={true} toggleable={false} />,
        store
    )

    expect(container).toMatchSnapshot()
})

test('TextBaseOption renders a <Checkbox /> when toggleable is set to true', () => {
    const option = { name: 'title' }
    const store = setupTestStore({})

    const { container } = renderWithProviders(
        <TextBaseOption label="The label" option={option} toggleable={true} />,
        store
    )

    expect(container).toMatchSnapshot()
})

test('TextBaseOption renders a <InputField /> when the checkbox is checked', () => {
    const option = { enabledId: 'targetLineEnabled', axisId: 'x_0' }
    const initialState = {
        ui: {
            ...DEFAULT_UI,
            options: {
                ...DEFAULT_UI.options,
                axes: [
                    {
                        index: 0,
                        type: 'x',
                        targetLine: { enabled: true },
                    },
                ],
            },
        },
    }
    const store = setupTestStore(initialState)

    const { container } = renderWithProviders(
        <TextBaseOption label="The label" option={option} toggleable={false} />,
        store
    )

    expect(container).toMatchSnapshot()
})

test('TextBaseOption renders a TextStyle component when fontStyleKey is passed', () => {
    const option = { id: OPTION_FONT_SIZE, name: OPTION_FONT_SIZE }
    const helpText = 'Font size help'
    const initialState = {
        ui: {
            ...DEFAULT_UI,
            options: {
                ...DEFAULT_UI.options,
                [OPTION_FONT_SIZE]: 'LARGE',
            },
        },
    }
    const store = setupTestStore(initialState)

    const getByDataTest = queryByAttribute.bind(null, 'data-test')

    const { container } = renderWithProviders(
        <TextBaseOption
            option={option}
            helpText={helpText}
            fontStyleKey={OPTION_FONT_SIZE}
            dataTest="font-size-input"
        />,
        store
    )

    expect(container).toMatchSnapshot()

    const containerDiv = getByDataTest(container, 'font-size-input-text-style')
    expect(containerDiv).toBeInTheDocument()
})
