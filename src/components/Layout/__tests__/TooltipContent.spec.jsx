import { render, screen } from '@testing-library/react'
import React from 'react'
import { TooltipContent } from '../TooltipContent.jsx'

test('TooltipContent renders "None selected" when no items', () => {
    const props = {
        dimensionId: 'abc',
        metadata: {},
        itemIds: [],
    }

    render(<TooltipContent {...props} />)
    const ulElement = screen.getByRole('list')
    expect(ulElement).toBeInTheDocument()
    expect(ulElement.children.length).toBe(1)
    expect(ulElement.children[0].textContent).toBe('None selected')
})

test('TooltipContent renders list items for the provided items', () => {
    const props = {
        dimensionId: 'abc',
        metadata: {},
        itemIds: ['aaa', 'bbb'],
    }

    render(<TooltipContent {...props} />)
    const items = screen.getAllByRole('listitem')
    expect(items.length).toEqual(props.itemIds.length)
    expect(items[0].textContent).toBe('aaa')
    expect(items[1].textContent).toBe('bbb')
})

test('TooltipContent renders list items for the provided items when metadata provided', () => {
    const props = {
        dimensionId: 'abc',
        metadata: {
            aaa: { name: 'The aaa dimension' },
            bbb: { name: 'The bbb dimension' },
        },
        itemIds: ['aaa', 'bbb'],
    }

    render(<TooltipContent {...props} />)
    const items = screen.getAllByRole('listitem')
    expect(items.length).toEqual(props.itemIds.length)
    expect(items[0].textContent).toBe('The aaa dimension')
    expect(items[1].textContent).toBe('The bbb dimension')
})
