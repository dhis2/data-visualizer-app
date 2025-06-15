import * as analytics from '@dhis2/analytics'
import { render, waitFor } from '@testing-library/react'
import React from 'react'
import * as api from '../../../api/analytics.js'
import * as moduleAnalytics from '../../../modules/analytics.js'
import * as options from '../../../modules/options.js'
import { VisualizationErrorInfo } from '../../VisualizationErrorInfo/VisualizationErrorInfo.jsx'
import ChartPlugin from '../ChartPlugin.jsx'
import { VisualizationPlugin } from '../VisualizationPlugin.jsx'

jest.mock('../ChartPlugin.jsx', () => jest.fn(() => null))
jest.mock('../PivotPlugin.jsx', () => jest.fn(() => null))
jest.mock('../../VisualizationErrorInfo/VisualizationErrorInfo.jsx', () => ({
    __esModule: true,
    VisualizationErrorInfo: jest.fn(() => null),
}))
jest.mock('@dhis2/analytics', () => ({
    ...jest.requireActual('@dhis2/analytics'),
    apiFetchOrganisationUnitLevels: () =>
        Promise.resolve([
            {
                level: 2,
                id: '2nd-floor',
            },
        ]),
}))

const dxMock = {
    dimension: 'dx',
    items: [
        {
            id: 'Uvn6LCg7dVU',
        },
    ],
}

const peMock = {
    dimension: 'pe',
    items: [
        {
            id: 'LAST_12_MONTHS',
        },
    ],
}

const ouMock = {
    dimension: 'ou',
    items: [
        {
            id: 'ImspTQPwCqd',
        },
    ],
}

const defaultCurrentMock = {
    type: analytics.VIS_TYPE_COLUMN,
    columns: [dxMock],
    rows: [peMock],
    filters: [ouMock],
}

const yearOverYearCurrentMock = {
    type: analytics.VIS_TYPE_YEAR_OVER_YEAR_LINE,
    columns: [dxMock],
    rows: [peMock],
    filters: [ouMock],
    yearlySeries: ['LAST_YEAR'],
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
    rows: ['data'],
}

class MockAnalyticsResponse {
    constructor() {
        return analyticsResponse
    }
}

const mockYoYSeriesLabels = ['rainbow', 'rarity']
class MockYoYAnalyticsResponse {
    constructor() {
        return {
            responses: [analyticsResponse],
            yearlySeriesLabels: mockYoYSeriesLabels,
        }
    }
}

const isYearOverYearMockResponse = (visType) => {
    return visType === analytics.VIS_TYPE_YEAR_OVER_YEAR_LINE
}

describe('VisualizationPlugin', () => {
    options.getOptionsForRequest = () => [
        ['option1', { defaultValue: 'abc' }],
        ['option2', { defaultValue: null }],
    ]
    const defaultProps = {
        visualization: {},
        displayProperty: '',
        filters: {},
        forDashboard: false,
        onResponsesReceived: jest.fn(),
    }

    const canvas = async (props) => {
        const combinedProps = {
            ...defaultProps,
            ...props,
        }

        let renderResult

        renderResult = render(<VisualizationPlugin {...combinedProps} />)
        await waitFor(() => {
            expect(api.apiFetchAnalytics).toHaveBeenCalled()
        })

        return renderResult
    }

    beforeEach(() => {
        ChartPlugin.mockClear()
        VisualizationErrorInfo.mockClear()
        defaultProps.onResponsesReceived.mockClear()

        api.apiFetchAnalytics = jest
            .fn()
            .mockResolvedValue([new MockAnalyticsResponse()])
    })

    describe('API Data Fetch', () => {
        it('includes only options that do not have default value in request', async () => {
            await canvas({
                visualization: {
                    ...defaultCurrentMock,
                    option1: 'def',
                    option2: null,
                },
            })

            expect(api.apiFetchAnalytics).toHaveBeenCalled()
            expect(api.apiFetchAnalytics.mock.calls[0][2]).toEqual({
                option1: 'def',
            })
        })

        it('calls onResponsesReceived callback', async () => {
            await canvas({
                visualization: {
                    ...defaultCurrentMock,
                },
            })

            expect(defaultProps.onResponsesReceived).toHaveBeenCalled()
            expect(defaultProps.onResponsesReceived).toHaveBeenCalledWith([
                analyticsResponse,
            ])
        })

        it('renders the error component when an exception is thrown', async () => {
            api.apiFetchAnalytics = jest.fn().mockRejectedValue('error')

            await canvas({
                visualization: {
                    ...defaultCurrentMock,
                },
            })

            expect(VisualizationErrorInfo).toHaveBeenCalled()
        })

        it('sets period when interpretation selected', async () => {
            const period = 'eons ago'

            await canvas({
                visualization: {
                    ...defaultCurrentMock,
                    relativePeriodDate: period,
                },
            })

            expect(api.apiFetchAnalytics).toHaveBeenCalled()
            expect(api.apiFetchAnalytics.mock.calls[0][1]).toHaveProperty(
                'relativePeriodDate',
                period
            )
        })

        it('Year-on-year chart makes year-on-year analytics request', async () => {
            moduleAnalytics.getRelativePeriodTypeUsed = jest
                .fn()
                .mockReturnValue(undefined)

            analytics.layoutGetDimensionItems = jest
                .fn()
                .mockReturnValue(peMock.items)

            api.apiFetchAnalyticsForYearOverYear = jest
                .fn()
                .mockResolvedValue(new MockYoYAnalyticsResponse())

            analytics.isYearOverYear = jest.fn(isYearOverYearMockResponse)

            const props = {
                visualization: {
                    ...yearOverYearCurrentMock,
                    option1: 'def',
                },
            }

            const combinedProps = {
                ...defaultProps,
                ...props,
            }

            render(<VisualizationPlugin {...combinedProps} />)
            await waitFor(() => {
                expect(api.apiFetchAnalyticsForYearOverYear).toHaveBeenCalled()
            })

            expect(
                api.apiFetchAnalyticsForYearOverYear.mock.calls[0][1]
            ).toEqual({
                ...yearOverYearCurrentMock,
                option1: 'def',
            })

            expect(ChartPlugin).toHaveBeenCalled()

            const expectedExtraOptions = {
                yearlySeries: mockYoYSeriesLabels,
                xAxisLabels: ['period 1', 'period 2'],
                periodKeyAxisIndexMap: { p1: 0, p2: 1 },
            }

            expect(ChartPlugin.mock.calls[0][0].extraOptions).toEqual({
                dashboard: false,
                ...expectedExtraOptions,
            })
        })
    })
})
