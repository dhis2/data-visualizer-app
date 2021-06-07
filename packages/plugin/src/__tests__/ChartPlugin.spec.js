import * as analytics from '@dhis2/analytics'
import { mount } from 'enzyme'
import React from 'react'
import * as api from '../api/analytics'
import ChartPlugin from '../ChartPlugin'
import * as options from '../modules/options'

jest.mock('@dhis2/analytics')

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

const yearOverYearCurrentMock = {
    type: analytics.VIS_TYPE_YEAR_OVER_YEAR_LINE,
    columns: [dxMock],
    rows: [peMock],
    yearlySeries: ['LAST_YEAR'],
}

const mockExtraOptions = {
    dashboard: false,
    noData: {
        text: 'No data',
    },
}

const singleValueCurrentMock = {
    type: analytics.VIS_TYPE_SINGLE_VALUE,
    columns: [dxMock],
    rows: [],
    filters: [ouMock, peMock],
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

const isSingleValueMockResponse = visType => {
    return visType === analytics.VIS_TYPE_SINGLE_VALUE
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
            // eslint-disable-next-line no-import-assign
            analytics.createVisualization = jest
                .fn()
                .mockReturnValue(createVisualizationMock)
        })

        it('renders a div', done => {
            expect(canvas().find('div').length).toBeGreaterThan(0)
            done()
        })

        it('uses the style passed as prop', done => {
            expect(canvas().find('div').prop('style')).toEqual(props.style)
            done()
        })

        it('calls createVisualization', done => {
            canvas()

            setTimeout(() => {
                expect(analytics.createVisualization).toHaveBeenCalled()
                done()
            })
        })

        it('calls onChartGenerated callback', done => {
            canvas()

            setTimeout(() => {
                expect(props.onChartGenerated).toHaveBeenCalled()
                expect(props.onChartGenerated).toHaveBeenCalledWith(
                    createVisualizationMock.visualization.getSVGForExport()
                )
                done()
            })
        })

        describe('Year-on-year chart', () => {
            beforeEach(() => {
                props.visualization = {
                    ...yearOverYearCurrentMock,
                    option1: 'def',
                }
            })
        })

        describe('Single value visualization', () => {
            beforeEach(() => {
                props.visualization = {
                    ...singleValueCurrentMock,
                }

                // eslint-disable-next-line no-import-assign
                analytics.isSingleValue = jest
                    .fn()
                    .mockReturnValue(
                        isSingleValueMockResponse(props.visualization.type)
                    )
            })

            it('provides dhis as output format to createChart', done => {
                canvas()

                setTimeout(() => {
                    expect(analytics.createVisualization).toHaveBeenCalled()

                    expect(
                        analytics.createVisualization.mock.calls[0][6]
                    ).toEqual('dhis')

                    done()
                })
            })
        })
    })
})
