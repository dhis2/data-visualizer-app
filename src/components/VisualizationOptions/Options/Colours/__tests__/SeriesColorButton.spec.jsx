import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { COLOR_AUTO } from '../../../../../modules/seriesColors.js'
import SeriesColorButton from '../SeriesColorButton.jsx'

describe('SeriesColorButton', () => {
    it('shows "Auto" for auto rows and the hex for fixed rows', () => {
        const { rerender } = render(
            <SeriesColorButton
                name="ANC 1st visit"
                value={COLOR_AUTO}
                metadataColor="#1565c0"
                onChange={jest.fn()}
            />
        )
        expect(screen.getByText('Auto')).toBeInTheDocument()

        rerender(
            <SeriesColorButton
                name="ANC 1st visit"
                value="#a8bf24"
                metadataColor="#1565c0"
                onChange={jest.fn()}
            />
        )
        expect(screen.getByText('#a8bf24')).toBeInTheDocument()
    })

    it('offers Auto in the popover only when a metadata colour exists', () => {
        const { unmount } = render(
            <SeriesColorButton
                name="A"
                value="#a8bf24"
                metadataColor="#1565c0"
                onChange={jest.fn()}
            />
        )
        fireEvent.click(
            screen.getByRole('button', { name: /change colour for A/i })
        )
        expect(screen.getByText('Use data item colour')).toBeInTheDocument()
        unmount()

        render(
            <SeriesColorButton name="B" value="#a8bf24" onChange={jest.fn()} />
        )
        fireEvent.click(
            screen.getByRole('button', { name: /change colour for B/i })
        )
        expect(
            screen.queryByText('Use data item colour')
        ).not.toBeInTheDocument()
    })

    it('picking a palette swatch calls onChange with its hex', () => {
        const onChange = jest.fn()
        render(
            <SeriesColorButton name="A" value="#000000" onChange={onChange} />
        )
        fireEvent.click(
            screen.getByRole('button', { name: /change colour for A/i })
        )
        fireEvent.click(screen.getAllByRole('button', { name: '#a8bf24' })[0])
        expect(onChange).toHaveBeenCalledWith('#a8bf24')
    })
})
