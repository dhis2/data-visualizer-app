import * as analytics from '@dhis2/analytics'
import { mount } from 'enzyme'
import React from 'react'
import * as api from '../../../api/analytics.js'
import * as options from '../../../modules/options.js'
import ChartPlugin from '../ChartPlugin.jsx'

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
        getSVGForExport: () => '<svg />',
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
    let chartPlugin
    const canvas = () => {
        if (!chartPlugin) {
            chartPlugin = mount(<ChartPlugin {...props} />)
        }
        return chartPlugin
    }

    beforeEach(() => {
        props = {
            style: { height: 100 },
            id: 1,
            onChartGenerated: jest.fn(),
            responses: [],
            extraOptions: mockExtraOptions,
            legendSets: [],
        }
        chartPlugin = undefined

        // eslint-disable-next-line no-import-assign, import/namespace
        api.apiFetchAnalytics = jest
            .fn()
            .mockResolvedValue([new MockAnalyticsResponse()])
    })

    describe('createVisualization success', () => {
        beforeEach(() => {
            // eslint-disable-next-line no-import-assign, import/namespace
            analytics.createVisualization = jest
                .fn()
                .mockReturnValue(createVisualizationMock)
        })

        it('renders a div', (done) => {
            expect(canvas().find('div').length).toBeGreaterThan(0)
            done()
        })

        it('uses the style passed as prop', (done) => {
            expect(canvas().find('div').prop('style')).toEqual(props.style)
            done()
        })

        it('calls createVisualization', (done) => {
            canvas()

            setTimeout(() => {
                expect(analytics.createVisualization).toHaveBeenCalled()
                done()
            })
        })

        it('calls onChartGenerated callback', (done) => {
            canvas()

            setTimeout(() => {
                expect(props.onChartGenerated).toHaveBeenCalled()
                expect(props.onChartGenerated).toHaveBeenCalledWith(
                    createVisualizationMock.visualization.getSVGForExport()
                )
                done()
            })
        })
    })
})
