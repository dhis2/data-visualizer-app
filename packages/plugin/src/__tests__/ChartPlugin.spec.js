import React from 'react';
import { shallow } from 'enzyme';
import LoadingMask from '../widgets/LoadingMask';
import ChartPlugin from '../ChartPlugin';
import * as chartsApi from 'd2-charts-api';
import * as api from '../api/analytics';
import * as apiViz from '../api/visualization';
import * as options from '../modules/options';
import { YEAR_OVER_YEAR_LINE, COLUMN } from '../modules/chartTypes';

jest.mock('d2-charts-api');

const dxMock = {
    dimension: 'dx',
    items: [
        {
            id: 'Uvn6LCg7dVU',
        },
    ],
};

const peMock = {
    dimension: 'pe',
    items: [
        {
            id: 'LAST_12_MONTHS',
        },
    ],
};

const ouMock = {
    dimension: 'ou',
    items: [
        {
            id: 'ImspTQPwCqd',
        },
    ],
};

const defaultCurrentMock = {
    type: COLUMN,
    columns: [dxMock],
    rows: [peMock],
    filters: [ouMock],
};

const yearOverYearCurrentMock = {
    type: YEAR_OVER_YEAR_LINE,
    columns: [dxMock],
    rows: [peMock],
    yearlySeries: ['LAST_YEAR'],
};

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
};

const analyticsResponse = {
    metaData: metaDataMock,
};

class MockAnalyticsResponse {
    constructor() {
        return analyticsResponse;
    }
}

const mockYoYSeriesLabels = ['rainbow', 'rarity'];
class MockYoYAnalyticsResponse {
    constructor() {
        return {
            responses: [analyticsResponse],
            yearlySeriesLabels: mockYoYSeriesLabels,
        };
    }
}

const createChartMock = {
    chart: {
        getSVGForExport: () => '<svg />',
    },
};

describe('ChartPlugin', () => {
    options.getOptionsForRequest = () => [
        ['option1', { defaultValue: 'abc' }],
        ['option2', { defaultValue: null }],
    ];
    let props;
    let shallowChartPlugin;
    const canvas = () => {
        if (!shallowChartPlugin) {
            shallowChartPlugin = shallow(<ChartPlugin {...props} />);
        }
        return shallowChartPlugin;
    };

    beforeEach(() => {
        props = {
            config: {},
            filters: {},
            style: { height: 100 },
            id: 1,
            d2: {},
            forDashboard: false,
            onChartGenerated: jest.fn(),
            onResponsesReceived: jest.fn(),
            onError: jest.fn(),
        };
        shallowChartPlugin = undefined;

        apiViz.apiFetchVisualization = jest
            .fn()
            .mockResolvedValue(defaultCurrentMock);

        api.apiFetchAnalytics = jest
            .fn()
            .mockResolvedValue([new MockAnalyticsResponse()]);
    });

    it('renders the loading indicator', () => {
        props.loading = true;
        expect(
            canvas()
                .find(LoadingMask)
                .exists()
        ).toBeTruthy();
    });

    describe('createChart success', () => {
        beforeEach(() => {
            chartsApi.createChart = jest.fn().mockReturnValue(createChartMock);
        });

        it('renders a div', done => {
            expect(canvas().find('div').length).toBeGreaterThan(0);
            done();
        });

        it('uses the style passed as prop', done => {
            expect(
                canvas()
                    .find('div')
                    .prop('style')
            ).toEqual(props.style);
            done();
        });

        it('calls createChart', done => {
            canvas();

            setTimeout(() => {
                expect(chartsApi.createChart).toHaveBeenCalled();
                done();
            });
        });

        it('includes only options that do not have default value in request', done => {
            props.config = {
                ...defaultCurrentMock,
                option1: 'def',
                option2: null,
            };

            canvas();

            setTimeout(() => {
                expect(api.apiFetchAnalytics).toHaveBeenCalled();
                expect(api.apiFetchAnalytics.mock.calls[0][2]).toEqual({
                    option1: 'def',
                });

                done();
            });
        });

        it('fetches the AO by id when only id is passed in config', done => {
            props.forDashboard = true;
            props.config = {
                id: 'test1',
            };

            canvas();

            setTimeout(() => {
                expect(apiViz.apiFetchVisualization).toHaveBeenCalled();
                expect(apiViz.apiFetchVisualization).toHaveBeenCalledWith(
                    props.d2,
                    'chart',
                    'test1'
                );

                done();
            });
        });

        it('calls onResponsesReceived callback', done => {
            canvas();

            setTimeout(() => {
                expect(props.onResponsesReceived).toHaveBeenCalled();
                expect(props.onResponsesReceived).toHaveBeenCalledWith([
                    analyticsResponse,
                ]);
                done();
            });
        });

        it('calls onChartGenerated callback', done => {
            canvas();

            setTimeout(() => {
                expect(props.onChartGenerated).toHaveBeenCalled();
                expect(props.onChartGenerated).toHaveBeenCalledWith(
                    createChartMock.chart.getSVGForExport()
                );
                done();
            });
        });

        it('calls onError callback when an exception is thrown', done => {
            api.apiFetchAnalytics = jest.fn().mockRejectedValue('error');

            canvas();

            setTimeout(() => {
                expect(props.onError).toHaveBeenCalled();
                done();
            });
        });

        it('sets period when interpretation selected', done => {
            const period = 'eons ago';
            props.filters.relativePeriodDate = period;

            canvas();

            setTimeout(() => {
                expect(api.apiFetchAnalytics).toHaveBeenCalled();
                expect(api.apiFetchAnalytics.mock.calls[0][2]).toHaveProperty(
                    'relativePeriodDate',
                    period
                );

                done();
            });
        });

        describe('Year-on-year chart', () => {
            beforeEach(() => {
                props.config = {
                    ...yearOverYearCurrentMock,
                    option1: 'def',
                };

                api.apiFetchAnalyticsForYearOverYear = jest
                    .fn()
                    .mockResolvedValue(new MockYoYAnalyticsResponse());
            });

            it('makes year-on-year analytics request', done => {
                canvas();

                setTimeout(() => {
                    expect(
                        api.apiFetchAnalyticsForYearOverYear
                    ).toHaveBeenCalled();
                    expect(
                        api.apiFetchAnalyticsForYearOverYear.mock.calls[0][1]
                    ).toEqual({
                        ...yearOverYearCurrentMock,
                        option1: 'def',
                    });

                    done();
                });
            });

            it('provides extra options to createChart', done => {
                canvas();

                setTimeout(() => {
                    expect(chartsApi.createChart).toHaveBeenCalled();

                    const expectedExtraOptions = {
                        yearlySeries: mockYoYSeriesLabels,
                        xAxisLabels: ['period 1', 'period 2'],
                    };

                    expect(chartsApi.createChart.mock.calls[0][3]).toEqual({
                        animation: undefined,
                        dashboard: false,
                        ...expectedExtraOptions,
                    });

                    done();
                });
            });
        });
    });
});
