import React from 'react';
import { shallow } from 'enzyme';

import { CheckboxBaseOption } from '../Options/CheckboxBaseOption';
import Checkbox from '@material-ui/core/Checkbox';

describe('DV > Options > CheckboxBaseOption', () => {
    let props;
    let shallowCheckboxBaseOption;
    let onChange;

    const checkboxBaseOption = props => {
        shallowCheckboxBaseOption = shallow(<CheckboxBaseOption {...props} />);

        return shallowCheckboxBaseOption;
    };

    beforeEach(() => {
        onChange = jest.fn();

        props = {
            value: false,
            option: { label: 'test' },
            onChange,
        };

        shallowCheckboxBaseOption = undefined;
    });

    it('renders a label for checkbox', () => {
        expect(checkboxBaseOption(props).props().label).toEqual(
            props.option.label
        );
    });

    it('renders the checkbox with the correct checked state', () => {
        const checkbox = shallow(checkboxBaseOption(props).props().control);

        expect(checkbox.props().checked).toBe(props.value);
    });

    it('should trigger the onChange callback on checkbox change', () => {
        const checkbox = shallow(checkboxBaseOption(props).props().control);

        checkbox.simulate('change', { target: { checked: true } });

        expect(onChange).toHaveBeenCalled();
    });
});
