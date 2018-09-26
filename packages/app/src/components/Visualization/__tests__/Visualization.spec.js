import React from 'react';
import { shallow } from 'enzyme';
import * as chartsApi from 'd2-charts-api';
import { Visualization } from '../Visualization';
import BlankCanvas from '../BlankCanvas';
import * as options from '../../../options';

class MockAnalyticsResponse {}

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
        };

        shallowVisualization = undefined;
    });

    it('renders a BlankCanvas', done => {
        props.d2.analytics.request = getRequestMock();

        const wrapper = canvas();

        setTimeout(() => {
            wrapper.update();
            expect(wrapper.find(BlankCanvas).length).toBeGreaterThan(0);
            done();
        });
    });

    it('calls createChart', done => {
        props.d2.analytics.request = getRequestMock();

        const wrapper = canvas();

        setTimeout(() => {
            wrapper.update();
            expect(chartsApi.createChart).toHaveBeenCalled();
            done();
        });
    });

    it('includes only options that do not have default value in request', done => {
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
});
