import React from 'react';
import { shallow } from 'enzyme';
import { getStubContext } from '../../../config/testsContext';
import TabsBar from '../../options-component/TabsBar';

describe('TabsBar', () => {
    let props;
    let shallowChartTabsComponent;
    const chartTabs = () => {
        if (!shallowChartTabsComponent) {
            shallowChartTabsComponent = shallow(<TabsBar {...props} />, {
                context: getStubContext(),
            });
        }
        return shallowChartTabsComponent;
    };
    beforeEach(() => {
        props = {
            activeTab: 0,
            onChange: jest.fn(),
        };
        shallowChartTabsComponent = undefined;
    });
    // ChartTabs recieves 2 props, onChange (function [required]) and activeTab (number) [required]
    it('should alwyays receive 2 props, but have 3 in total: onChange (function), activeTab (number) and classes (Object)', () => {
        props = {
            activeTab: 3,
            onChange: jest.fn(),
        };
        expect(Object.keys(chartTabs(props).props()).length).toBe(3);
    });
    // when onChange is called, the prop activeTab is passed as value
    it('should update the prop activeTab when onChange is called', () => {});
});
