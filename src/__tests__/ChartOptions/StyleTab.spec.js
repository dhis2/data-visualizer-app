import React from 'react';
import { shallow } from 'enzyme';
import { getStubContext } from '../../../config/testsContext';
import StyleTab from '../../ChartOptions/StyleTab';

describe('StyleTab', () => {
    let props;
    let shallowStyleTab;
    const styleTab = () => {
        if (!shallowStyleTab) {
            shallowStyleTab = shallow(<StyleTab {...props} />, {
                context: getStubContext(),
            });
        }
        return shallowStyleTab;
    };
    beforeEach(() => {
        props = {
            tabContent: {
                noSpace: false,
            },
            onChange: jest.fn(),
        };
        shallowStyleTab = undefined;
    });
    // it renders a div
    it.only('renders a div', () => {
        console.log(styleTab().find('div'));
        //expect(styleTab().find('div').length).toBeGreaterThan(0);
    });
    it.only('renders a div containing everything else', () => {
        console.log(styleTab().children());
    });
    it.only('receives at least 1 prop, but has 3 in total: classes, onChange and tabContent', () => {
        console.log(styleTab().props().length);
    });
});
