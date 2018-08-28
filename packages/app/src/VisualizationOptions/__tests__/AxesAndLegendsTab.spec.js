import React from 'react';
import { shallow } from 'enzyme';
import TextField from 'material-ui/TextField';
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
    it('should render a TextField component', () => {
        expect(axesOptions().find(TextField).length).toBe(1);
    });
});
