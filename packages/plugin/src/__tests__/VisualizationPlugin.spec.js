import * as analytics from '@dhis2/analytics'
import { mount } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import * as api from '../api/analytics.js'
import ChartPlugin from '../ChartPlugin.js'
import * as moduleAnalytics from '../modules/analytics.js'
import * as options from '../modules/options.js'
import { VisualizationPlugin } from '../VisualizationPlugin.js'

jest.mock('../ChartPlugin', () => jest.fn(() => null))
jest.mock('../PivotPlugin', () => jest.fn(() => null))
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

const isYearOverYearMockResponse = visType => {
    return visType === analytics.VIS_TYPE_YEAR_OVER_YEAR_LINE
}

describe('VisualizationPlugin', () => {
    // eslint-disable-next-line no-import-assign, import/namespace
    options.getOptionsForRequest = () => [
        ['option1', { defaultValue: 'abc' }],
        ['option2', { defaultValue: null }],
    ]
    const defaultProps = {
        visualization: {},
        filters: {},
        d2: {},
        forDashboard: false,
        onResponsesReceived: jest.fn(),
        onError: jest.fn(),
    }
    const canvas = async props => {
        const combinedProps = {
            ...defaultProps,
            ...props,
        }
        let plugin

        await act(async () => {
            plugin = mount(<VisualizationPlugin {...combinedProps} />)
            await new Promise(resolve => {
                setTimeout(resolve)
            })
        })
        return plugin
    }

    beforeEach(() => {
        ChartPlugin.mockClear()
        defaultProps.onResponsesReceived.mockClear()
        defaultProps.onError.mockClear()

        // eslint-disable-next-line no-import-assign, import/namespace
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
            await canvas()

            expect(defaultProps.onResponsesReceived).toHaveBeenCalled()
            expect(defaultProps.onResponsesReceived).toHaveBeenCalledWith([
                analyticsResponse,
            ])
        })

        it('calls onError callback when an exception is thrown', async () => {
            // eslint-disable-next-line no-import-assign, import/namespace
            api.apiFetchAnalytics = jest.fn().mockRejectedValue('error')

            await canvas()

            expect(defaultProps.onError).toHaveBeenCalled()
        })

        it('sets period when interpretation selected', async () => {
            const period = 'eons ago'

            await canvas({
                filters: {
                    relativePeriodDate: period,
                },
            })

            expect(api.apiFetchAnalytics).toHaveBeenCalled()
            expect(api.apiFetchAnalytics.mock.calls[0][2]).toHaveProperty(
                'relativePeriodDate',
                period
            )
        })

        describe('Year-on-year chart', () => {
            beforeEach(() => {
                ChartPlugin.mockClear()

                /* eslint-disable no-import-assign, import/namespace */
                moduleAnalytics.getRelativePeriodTypeUsed = jest
                    .fn()
                    .mockReturnValue(undefined)

                analytics.layoutGetDimensionItems = jest
                    .fn()
                    .mockReturnValue(peMock.items)

                /* eslint-disable no-import-assign, import/namespace */
                api.apiFetchAnalyticsForYearOverYear = jest
                    .fn()
                    .mockResolvedValue(new MockYoYAnalyticsResponse())

                analytics.isYearOverYear = jest.fn(isYearOverYearMockResponse)
                /* eslint-enable no-import-assign, import/namespace */
            })

            it('makes year-on-year analytics request', async () => {
                await canvas({
                    visualization: {
                        ...yearOverYearCurrentMock,
                        option1: 'def',
                    },
                })

                expect(api.apiFetchAnalyticsForYearOverYear).toHaveBeenCalled()
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
})
