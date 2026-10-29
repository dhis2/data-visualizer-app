import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import {
    COLOR_AUTO,
    COLOR_PALETTE,
} from '../../../../../modules/seriesColors.js'
import SeriesColorButton from '../SeriesColorButton.jsx'

const renderButton = (props) =>
    render(
        <SeriesColorButton
            name="ANC 1st visit"
            color="#a8bf24"
            onChange={jest.fn()}
            {...props}
        />
    )

describe('SeriesColorButton', () => {
    it('shows the greyed source label and no reset when inherited', () => {
        renderButton({ sourceLabel: 'Color set', onReset: jest.fn() })

        expect(screen.getByText('Color set')).toHaveAttribute(
            'data-test',
            'series-colour-inherited'
        )
        expect(
            screen.queryByLabelText('Reset colour for ANC 1st visit')
        ).not.toBeInTheDocument()
    })

    it('shows the hex and a reset button for a hex override', () => {
        const onReset = jest.fn()
        renderButton({ value: '#a8bf24', sourceLabel: 'Color set', onReset })

        expect(screen.getByText('#a8bf24')).toBeInTheDocument()
        expect(screen.queryByText('Color set')).not.toBeInTheDocument()

        fireEvent.click(screen.getByLabelText('Reset colour for ANC 1st visit'))
        expect(onReset).toHaveBeenCalled()
    })

    it('shows "Auto" in normal text for an Auto override', () => {
        renderButton({
            value: COLOR_AUTO,
            color: '#1565c0',
            metadataColor: '#1565c0',
            onReset: jest.fn(),
        })

        expect(screen.getByText('Auto')).not.toHaveAttribute(
            'data-test',
            'series-colour-inherited'
        )
        expect(
            screen.getByLabelText('Reset colour for ANC 1st visit')
        ).toBeInTheDocument()
    })

    it('shows "Color set" in normal text for a Color set override', () => {
        renderButton({
            value: COLOR_PALETTE,
            paletteColor: '#a8bf24',
            onReset: jest.fn(),
        })

        expect(screen.getByText('Color set')).not.toHaveAttribute(
            'data-test',
            'series-colour-inherited'
        )
    })

    it('offers each Auto option in the popover only when its colour exists', () => {
        const { unmount } = renderButton({
            metadataColor: '#1565c0',
            paletteColor: '#a8bf24',
        })
        fireEvent.click(screen.getByTestId('series-colour-button'))
        expect(screen.getByText('Auto from data item')).toBeInTheDocument()
        expect(screen.getByText('Auto from color set')).toBeInTheDocument()
        unmount()

        renderButton({})
        fireEvent.click(screen.getByTestId('series-colour-button'))
        expect(
            screen.queryByText('Auto from data item')
        ).not.toBeInTheDocument()
        expect(
            screen.queryByText('Auto from color set')
        ).not.toBeInTheDocument()
    })

    it('reports Auto and Palette picks through onChange', () => {
        const onChange = jest.fn()
        renderButton({
            onChange,
            metadataColor: '#1565c0',
            paletteColor: '#a8bf24',
        })

        fireEvent.click(screen.getByTestId('series-colour-button'))
        fireEvent.click(screen.getByText('Auto from data item'))
        fireEvent.click(screen.getByText('Auto from color set'))

        expect(onChange).toHaveBeenNthCalledWith(1, COLOR_AUTO)
        expect(onChange).toHaveBeenNthCalledWith(2, COLOR_PALETTE)
    })

    it('marks the inherited Auto option as selected when there is no override', () => {
        renderButton({
            source: 'PALETTE',
            sourceLabel: 'Color set',
            metadataColor: '#1565c0',
            paletteColor: '#a8bf24',
        })
        fireEvent.click(screen.getByTestId('series-colour-button'))

        expect(screen.getByTestId('colour-option-palette')).toHaveAttribute(
            'aria-pressed',
            'true'
        )
        expect(screen.getByTestId('colour-option-auto')).toHaveAttribute(
            'aria-pressed',
            'false'
        )
    })

    it('does not let the inherited option be clicked, and picking it clears an override', () => {
        const onChange = jest.fn()
        const onReset = jest.fn()
        const props = {
            source: 'PALETTE',
            sourceLabel: 'Color set',
            paletteColor: '#a8bf24',
            onChange,
            onReset,
        }
        const { unmount } = renderButton(props)
        fireEvent.click(screen.getByTestId('series-colour-button'))
        expect(screen.getByTestId('colour-option-palette')).toBeDisabled()
        unmount()

        renderButton({ ...props, value: '#ff0000' })
        fireEvent.click(screen.getByTestId('series-colour-button'))
        fireEvent.click(screen.getByTestId('colour-option-palette'))
        expect(onReset).toHaveBeenCalled()
        expect(onChange).not.toHaveBeenCalled()
    })

    it('reports a palette swatch pick through onChange', () => {
        const onChange = jest.fn()
        renderButton({ onChange })

        fireEvent.click(screen.getByTestId('series-colour-button'))
        fireEvent.click(screen.getAllByRole('button', { name: /^#/ })[0])

        expect(onChange).toHaveBeenCalledWith(
            expect.stringMatching(/^#[0-9a-f]{6}$/i)
        )
    })
})
