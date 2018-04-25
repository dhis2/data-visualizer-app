import React from 'react';
import { shallow } from 'enzyme';
import { getStubContext } from '../../../config/testsContext';
import TabsBar from '../../ChartOptions/TabsBar';

describe('TabsBar', () => {
    let props;
    let tabsBarComponent;
    const tabsBar = () => {
        if (!tabsBarComponent) {
            tabsBarComponent = shallow(<TabsBar {...props} />, {
                context: getStubContext(),
            });
        }
        return tabsBarComponent;
    };
    beforeEach(() => {
        props = {
            activeTab: 0,
            onChange: jest.fn(),
        };
        tabsBarComponent = undefined;
    });
    // ChartTabs recieves 2 props, onChange (function [required]) and activeTab (number) [required]
    it.only('should alwyays receive 2 props, but have 3 in total: onChange (function), activeTab (number) and classes (Object)', () => {
        console.log(tabsBar().props());
        //expect(Object.keys(chartTabs(props).props()).length).toBe(3);
    });
    // when onChange is called, the prop activeTab is passed as value
    it('should update the prop activeTab when onChange is called', () => {});
});
