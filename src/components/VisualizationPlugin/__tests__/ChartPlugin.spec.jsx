import * as analytics from '@dhis2/analytics'
import * as api from '../../../api/analytics.js'
import * as options from '../../../modules/options.js'
import ChartPlugin from '../ChartPlugin.jsx'
import React from 'react'
import { render, waitFor } from '@testing-library/react'

jest.mock('@dhis2/analytics')

const mockExtraOptions = {
    dashboard: false,
    noData: {
        text: 'No data',
    },
}

const metaDataMock = {
    items: {
        a: { name: 'a dim' },
        b: { name: 'b dim' },
        p1: { name: 'period 1 1979' },
        p2: { name: 'period 2 1979' },
    },
    dimensions: {
        pe: ['p1', 'p2'],
    },
}

const analyticsResponse = {
    metaData: metaDataMock,
}

class MockAnalyticsResponse {
    constructor() {
        return analyticsResponse
    }
}

const createVisualizationMock = {
    visualization: {
        exportChartLocal: jest.fn(),
    },
    config: {
        getConfig: () => {},
    },
}

describe('ChartPlugin', () => {
    // eslint-disable-next-line no-import-assign, import/namespace
    options.getOptionsForRequest = () => [
        ['option1', { defaultValue: 'abc' }],
        ['option2', { defaultValue: null }],
    ]
    let props

    beforeEach(() => {
        props = {
            style: { height: 100 },
            id: 1,
            onChartGenerated: jest.fn(),
            responses: [],
            extraOptions: mockExtraOptions,
            legendSets: [],
        }

        // eslint-disable-next-line no-import-assign, import/namespace
        api.apiFetchAnalytics = jest
            .fn()
            .mockResolvedValue([new MockAnalyticsResponse()])

        // eslint-disable-next-line no-import-assign, import/namespace
        analytics.createVisualization = jest
            .fn()
            .mockReturnValue(createVisualizationMock)
    })

    it('renders a div', async () => {
        const { container } = render(<ChartPlugin {...props} />)
        // Wait for async effects to complete
        await waitFor(() => {
            expect(container.querySelector('div')).toBeInTheDocument()
        })
    })

    it('calls createVisualization', async () => {
        render(<ChartPlugin {...props} />)
        await waitFor(() => {
            expect(analytics.createVisualization).toHaveBeenCalled()
        })
    })

    it('calls onChartGenerated callback', async () => {
        render(<ChartPlugin {...props} />)
        await waitFor(() => {
            expect(props.onChartGenerated).toHaveBeenCalled()
            expect(props.onChartGenerated).toHaveBeenCalledWith(
                createVisualizationMock.visualization
            )
        })
    })
})
