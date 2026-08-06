import {
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    DIMENSION_ID_ORGUNIT,
} from '@dhis2/analytics'
import React from 'react'
import { renderWithProviders } from '../../../../config/testsContext.js'
import { setupTestStore } from '../../../configureStore.js'
import DimensionsPanel from '../DimensionsPanel.jsx'

jest.mock('@dhis2/app-runtime', () => ({
    useDataEngine: jest.fn(() => ({
        query: Function.prototype,
    })),
}))

jest.mock('@dhis2/analytics', () => ({
    ...jest.requireActual('@dhis2/analytics'),
    useCachedDataQuery: jest.fn(() => ({
        currentUser: {
            settings: {
                DERIVED_USER_SETTINGS_DISPLAY_NAME_PROPERTY: 'displayName',
            },
        },
    })),
    CachedDataQueryProvider: () => <div className="CachedDataQueryProvider" />,
}))

jest.mock('react-beautiful-dnd', () => ({
    Droppable: ({ children }) => (
        <div data-mock="Droppable">
            {typeof children === 'function' ? children({}) : children}
        </div>
    ),
    Draggable: ({ children }) => (
        <div data-mock="Draggable">
            {typeof children === 'function' ? children({}, {}) : children}
        </div>
    ),
}))

test('renders component containing a list item for each dimension', () => {
    const reduxState = {
        ui: {
            type: 'BAR',
            layout: {
                columns: [DIMENSION_ID_DATA],
                rows: [DIMENSION_ID_PERIOD],
                filters: [DIMENSION_ID_ORGUNIT],
            },
            itemsByDimension: {
                [DIMENSION_ID_ORGUNIT]: [],
                [DIMENSION_ID_PERIOD]: [],
            },
        },
    }
    const store = setupTestStore(reduxState)

    const { container } = renderWithProviders(<DimensionsPanel />, store)

    const items = Array.from(container.querySelectorAll('li'))

    expect(items).toHaveLength(4)
    expect(items[0]).toHaveTextContent('Data')
    expect(items[1]).toHaveTextContent('Period')
    expect(items[2]).toHaveTextContent('Organisation unit')
    expect(items[3]).toHaveTextContent('Assigned Categories')
})
