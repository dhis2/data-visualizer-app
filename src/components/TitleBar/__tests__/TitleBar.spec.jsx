import { render, screen } from '@testing-library/react'
import React from 'react'
import {
    STATE_EMPTY,
    STATE_UNSAVED,
    STATE_SAVED,
    STATE_DIRTY,
} from '../../../modules/visualization.js'
import { UnconnectedTitleBar as TitleBar } from '../TitleBar.jsx'

test('TitleBar does not render anything', () => {
    const props = {
        titleState: STATE_EMPTY,
        titleText: null,
    }
    const { container } = render(<TitleBar {...props} />)

    expect(container).toBeEmptyDOMElement()
})

test('TitleBar renders "unsaved" state', () => {
    const props = {
        titleState: STATE_UNSAVED,
        titleText: 'Unsaved visualization',
    }
    render(<TitleBar {...props} />)
    const titleDiv = screen.getByText('Unsaved visualization')
    expect(titleDiv).toBeInTheDocument()
})

test('TitleBar renders "saved" state', () => {
    const props = {
        titleState: STATE_SAVED,
        titleText: 'Yall',
    }

    render(<TitleBar {...props} />)
    const titleDiv = screen.getByText('Yall')
    expect(titleDiv).toBeInTheDocument()
})

test('TitleBar renders "dirty" state', () => {
    const props = {
        titleState: STATE_DIRTY,
        titleText: 'Yall',
    }
    const { container } = render(<TitleBar {...props} />)
    expect(container).toMatchSnapshot()
})
