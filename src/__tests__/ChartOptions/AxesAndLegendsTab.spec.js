import React from 'react';
import { shallow } from 'enzyme';
import { getStubContext } from '../../../config/testsContext';
import TextField from 'material-ui-next/TextField';
import AxesAndLegendsTab from '../../ChartOptions/AxesAndLegendsTab';

describe('AxesOptions', () => {
    let props;
    let shallowAxesOptionsComponent;
    const axesOptions = () => {
        if (!shallowAxesOptionsComponent) {
            shallowAxesOptionsComponent = shallow(
                <AxesAndLegendsTab {...props} />,
                {
                    context: getStubContext(),
                }
            );
        }
        return shallowAxesOptionsComponent;
    };
    beforeEach(() => {
        props = {
            tabContent: {
                axisMin: undefined,
                axisMax: undefined,
                tickSteps: undefined,
                decimals: undefined,
                rangeTitle: undefined,
                domainTitle: undefined,
            },
            onChange: jest.fn(),
        };
        shallowAxesOptionsComponent = undefined;
    });
    // It renders 6 TextFields
    it('should render 6 TextFields', () => {
        const wrapper = shallow(<AxesAndLegendsTab />);
        console.log(wrapper);
        //expect(axesOptions().find(TextField).length).toBe(6);
    });
    /*
    // It receives the prop tabContent, and onChange from ChartOptions copmonent
    it('');
    // When onChange is called, it should pass [fieldName] and [newValue] as parameters
    it(''); */
});
