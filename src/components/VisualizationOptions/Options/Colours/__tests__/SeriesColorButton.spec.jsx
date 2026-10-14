import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { COLOR_AUTO } from '../../../../../modules/seriesColors.js'
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
        renderButton({ sourceLabel: 'Palette', onReset: jest.fn() })

        expect(screen.getByText('Palette')).toHaveAttribute(
            'data-test',
            'series-colour-inherited'
        )
        expect(
            screen.queryByLabelText('Reset colour for ANC 1st visit')
        ).not.toBeInTheDocument()
    })

    it('shows the hex and a reset button for a hex override', () => {
        const onReset = jest.fn()
        renderButton({ value: '#a8bf24', sourceLabel: 'Palette', onReset })

        expect(screen.getByText('#a8bf24')).toBeInTheDocument()
        expect(screen.queryByText('Palette')).not.toBeInTheDocument()

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

    it('offers Auto in the popover only when a metadata colour exists', () => {
        const { unmount } = renderButton({ metadataColor: '#1565c0' })
        fireEvent.click(screen.getByTestId('series-colour-button'))
        expect(screen.getByText('Use data item colour')).toBeInTheDocument()
        unmount()

        renderButton({})
        fireEvent.click(screen.getByTestId('series-colour-button'))
        expect(
            screen.queryByText('Use data item colour')
        ).not.toBeInTheDocument()
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
