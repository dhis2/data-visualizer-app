import React from 'react';
import { shallow } from 'enzyme';
import * as chartsApi from 'd2-charts-api';
import * as api from '../../../api/analytics';
import { Visualization } from '../Visualization';
import BlankCanvas from '../BlankCanvas';
import * as options from '../../../modules/options';

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

jest.mock('d2-charts-api');
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
            d2: {
                analytics: {
                    aggregate: {
                        get: () => Promise.resolve('got resource'),
                    },
                    response: MockAnalyticsResponse,
                },
            },
            acAddMetadata: jest.fn(),
            acSetChart: jest.fn(),
        };

        shallowVisualization = undefined;

        chartsApi.createChart.mockReturnValue(createChartMock);

        api.apiFetchAnalytics = () =>
            Promise.resolve([new MockAnalyticsResponse()]);
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

    // FIXME
    it.skip('includes only options that do not have default value in request', done => {
        props.current = {
            option1: 'def',
            option2: null,
        };

        const mockFn = jest.fn();
        props.d2.analytics.request = getRequestMock(mockFn);

        canvas();

        setTimeout(() => {
            expect(mockFn.mock.calls[0][0]).toEqual({ option1: 'def' });

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
});
