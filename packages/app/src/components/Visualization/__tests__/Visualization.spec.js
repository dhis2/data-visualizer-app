import React from 'react';
import { shallow } from 'enzyme';
import * as chartsApi from 'd2-charts-api';
import * as api from '../../../api/analytics';
import { Visualization } from '../Visualization';
import BlankCanvas from '../BlankCanvas';
import * as options from '../../../modules/options';

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

const getRequestMock = mfn => {
    const mockFn = mfn ? mfn : jest.fn();

    class MockAnalyticsRequest {
        constructor() {
            this.fromModel = () => ({
                withParameters: mockFn,
            });
        }
    }
    return MockAnalyticsRequest;
};

const createChartMock = {
    chart: {
        getSVGForExport: () => '<svg />',
    },
};

const stubContext = {
    d2: {
        analytics: {
            aggregate: {
                get: () => Promise.resolve('got resource'),
            },
            response: MockAnalyticsResponse,
        },
    },
};

describe('Visualization', () => {
    options.getOptionsForRequest = () => [
        ['option1', { defaultValue: 'abc' }],
        ['option2', { defaultValue: null }],
    ];
    let props;
    let shallowVisualization;
    const canvas = requestMock => {
        stubContext.d2.analytics.request = requestMock;
        if (!shallowVisualization) {
            shallowVisualization = shallow(<Visualization {...props} />, {
                context: stubContext,
            });
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

        api.apiFetchAnalytics = () =>
            Promise.resolve([new MockAnalyticsResponse()]);
    });

    describe('createChart success', () => {
        beforeEach(() => {
            chartsApi.createChart.mockReturnValue(createChartMock);
        });
        it('renders a BlankCanvas', done => {
            const wrapper = canvas(getRequestMock());

            setTimeout(() => {
                expect(wrapper.find(BlankCanvas).length).toBeGreaterThan(0);
                done();
            });
        });

        it('calls createChart', done => {
            canvas(getRequestMock());

            setTimeout(() => {
                expect(chartsApi.createChart).toHaveBeenCalled();
                done();
            });
        });

        it('calls addMetadata action', done => {
            canvas(getRequestMock());

            setTimeout(() => {
                expect(props.acAddMetadata).toHaveBeenCalled();
                expect(props.acAddMetadata).toHaveBeenCalledWith(metaDataMock);
                done();
            });
        });

        it.skip('includes only options that do not have default value in request', done => {
            props.current = {
                option1: 'def',
                option2: null,
            };

            const mockFn = jest.fn();

            canvas(getRequestMock(mockFn));

            setTimeout(() => {
                expect(mockFn.mock.calls[0][0]).toEqual({ option1: 'def' });

                done();
            });
        });

        it('calls clearLoadError action', done => {
            canvas(getRequestMock());

            setTimeout(() => {
                expect(props.acClearLoadError).toHaveBeenCalled();
                done();
            });
        });

        it('calls setChart action', done => {
            canvas(getRequestMock());

            setTimeout(() => {
                expect(props.acSetChart).toHaveBeenCalled();
                expect(props.acSetChart).toHaveBeenCalledWith(
                    createChartMock.chart.getSVGForExport()
                );
                done();
            });
        });
    });

    describe('createChart fails', () => {
        beforeEach(() => {
            chartsApi.createChart.mockImplementation(() => {
                throw new Error('Big time errors');
            });
        });

        it('calls the setLoadError message', done => {
            canvas(getRequestMock());

            setTimeout(() => {
                expect(props.acSetLoadError).toHaveBeenCalled();
                done();
            });
        });
    });
});
