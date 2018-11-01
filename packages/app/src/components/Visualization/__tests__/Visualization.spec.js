import React from 'react';
import { shallow } from 'enzyme';
import * as chartsApi from 'd2-charts-api';
import * as api from '../../../api/analytics';
import { Visualization } from '../Visualization';
import BlankCanvas from '../BlankCanvas';
import * as options from '../../../modules/options';
import { YEAR_OVER_YEAR_LINE } from '../../../modules/chartTypes';

jest.mock('d2-charts-api');

const metaDataMock = ['a', 'b'];
class MockAnalyticsResponse {
    constructor() {
        return {
            metaData: {
                items: metaDataMock,
            },
        };
    }
}

const mockYoYSeriesLabels = ['rainbow', 'rarity'];
class MockYoYAnalyticsResponse {
    constructor() {
        return {
            responses: [
                {
                    metaData: {
                        items: metaDataMock,
                    },
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
                expect(props.acAddMetadata).toHaveBeenCalledWith(metaDataMock);
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

        describe('Year-on-year chart', () => {
            beforeEach(() => {
                props.current = {
                    type: YEAR_OVER_YEAR_LINE,
                    option1: 'def',
                };

                api.apiFetchAnalyticsForYearOnYear = jest
                    .fn()
                    .mockResolvedValue(new MockYoYAnalyticsResponse());
            });

            it('makes year-on-year analytics request', done => {
                canvas();

                setTimeout(() => {
                    expect(
                        api.apiFetchAnalyticsForYearOnYear
                    ).toHaveBeenCalled();
                    expect(
                        api.apiFetchAnalyticsForYearOnYear.mock.calls[0][1]
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
});
