import React from 'react';
import { shallow } from 'enzyme';
import TextField from 'material-ui-next/TextField';
import { AxesAndLegendsTab } from '../AxesAndLegendsTab';

describe('The Axis & Legend tab', () => {
    let props;
    let shallowAxesComponent;
    const axesOptions = () => {
        if (!shallowAxesComponent) {
            shallowAxesComponent = shallow(<AxesAndLegendsTab {...props} />);
        }
        return shallowAxesComponent;
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
            classes: {},
            onChange: jest.fn(),
        };
        shallowAxesComponent = undefined;
    });
    it('renders 1 div as the outermost component', () => {
        expect(axesOptions().find('div').length).toBe(1);
    });

    it('renders a div containing everything else', () => {
        const wrappingDiv = axesOptions()
            .find('div')
            .first();
        expect(wrappingDiv.children()).toEqual(axesOptions().children());
    });
    it('receives the prop tabContent, and onChange from ChartOptions copmonent', () => {
        const onChange = jest.fn();
        /*expect(
            axesOptions()
                .find(TextField)
                .props().onChange
        ).toBe(onChange); */
    });
    it('should render a TextField component', () => {
        expect(axesOptions().find(TextField).length).toBe(1);
    });
    describe('The <TextField /> component', () => {
        beforeEach(() => {});
        it('triggers onChange is , it should pass [fieldName] and [newValue] as parameters', () => {});
    });
});
