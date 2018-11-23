import React from 'react';
import { shallow } from 'enzyme';
import * as chartsApi from 'd2-charts-api';
import * as api from '../../../api/analytics';
import { Visualization } from '../Visualization';
import BlankCanvas from '../BlankCanvas';
import * as options from '../../../modules/options';
import { YEAR_OVER_YEAR_LINE } from '../../../modules/chartTypes';

jest.mock('d2-charts-api');

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
class MockAnalyticsResponse {
    constructor() {
        return {
            metaData: metaDataMock,
        };
    }
}

const mockYoYSeriesLabels = ['rainbow', 'rarity'];
class MockYoYAnalyticsResponse {
    constructor() {
        return {
            responses: [
                {
                    metaData: metaDataMock,
                },
            ],
            yearlySeriesLabels: mockYoYSeriesLabels,
        };
    }
}

const createChartMock = {
    chart: {
        getSVGForExport: () => '<svg />',
    },
};

describe('Visualization', () => {
    options.getOptionsForRequest = () => [
        ['option1', { defaultValue: 'abc' }],
        ['option2', { defaultValue: null }],
    ];
    let props;
    let shallowVisualization;
    const canvas = () => {
        if (!shallowVisualization) {
            shallowVisualization = shallow(<Visualization {...props} />);
        }
        return shallowVisualization;
    };

    beforeEach(() => {
        props = {
            current: {},
            interpretation: {},
            rightSidebarOpen: false,
            acAddMetadata: jest.fn(),
            acSetChart: jest.fn(),
            acSetLoading: jest.fn(),
            acClearLoadError: jest.fn(),
            acSetLoadError: jest.fn(),
        };

        shallowVisualization = undefined;

        api.apiFetchAnalytics = jest
            .fn()
            .mockResolvedValue([new MockAnalyticsResponse()]);
    });

    describe('createChart success', () => {
        beforeEach(() => {
            chartsApi.createChart = jest.fn().mockReturnValue(createChartMock);
        });

        it('renders a BlankCanvas', done => {
            const wrapper = canvas();

            setTimeout(() => {
                expect(wrapper.find(BlankCanvas).length).toBeGreaterThan(0);
                done();
            });
        });

        it('calls createChart', done => {
            canvas();

            setTimeout(() => {
                expect(chartsApi.createChart).toHaveBeenCalled();
                done();
            });
        });

        it('calls addMetadata action', done => {
            canvas();

            setTimeout(() => {
                expect(props.acAddMetadata).toHaveBeenCalled();
                expect(props.acAddMetadata).toHaveBeenCalledWith(
                    metaDataMock.items
                );
                done();
            });
        });

        it('includes only options that do not have default value in request', done => {
            props.current = {
                option1: 'def',
                option2: null,
            };

            canvas();

            setTimeout(() => {
                expect(api.apiFetchAnalytics).toHaveBeenCalled();
                expect(api.apiFetchAnalytics.mock.calls[0][1]).toEqual({
                    option1: 'def',
                });

                done();
            });
        });

        it('calls clearLoadError action', done => {
            canvas();

            setTimeout(() => {
                expect(props.acClearLoadError).toHaveBeenCalled();
                done();
            });
        });

        it('calls setChart action', done => {
            canvas();

            setTimeout(() => {
                expect(props.acSetChart).toHaveBeenCalled();
                expect(props.acSetChart).toHaveBeenCalledWith(
                    createChartMock.chart.getSVGForExport()
                );
                done();
            });
        });

        it('sets period when interpretation selected', done => {
            const period = 'eons ago';
            props.interpretation.created = period;

            canvas();

            setTimeout(() => {
                expect(api.apiFetchAnalytics).toHaveBeenCalled();
                expect(api.apiFetchAnalytics.mock.calls[0][1]).toHaveProperty(
                    'relativePeriodDate',
                    period
                );

                done();
            });
        });

        describe('Year-on-year chart', () => {
            beforeEach(() => {
                props.current = {
                    type: YEAR_OVER_YEAR_LINE,
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

                    expect(chartsApi.createChart.mock.calls[0][3]).toEqual(
                        expectedExtraOptions
                    );

                    done();
                });
            });
        });
    });

    describe('createChart failure', () => {
        beforeEach(() => {
            chartsApi.createChart = jest.fn().mockImplementation(() => {
                throw new Error('Big time errors');
            });
        });

        it('calls the setLoadError message', done => {
            canvas();

            setTimeout(() => {
                expect(props.acSetLoadError).toHaveBeenCalled();
                done();
            });
        });
    });

    describe('chart reflow', () => {
        const recreateChartFn = jest.fn();

        const vis = canvas();

        vis.instance().recreateChart = recreateChartFn;

        it('triggers a reflow when rightSidebarOpen prop changes', () => {
            vis.setProps({ ...props, rightSidebarOpen: true });

            expect(recreateChartFn).toHaveBeenCalled();

            vis.setProps({ ...props, rightSidebarOpen: false });

            expect(recreateChartFn).toHaveBeenCalled();
        });
    });
});
