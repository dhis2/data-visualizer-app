import React from 'react';
import { shallow } from 'enzyme';

import { CheckboxBaseOption } from '../Options/CheckboxBaseOption';
import Checkbox from '@material-ui/core/Checkbox';

describe('DV > Options > CheckboxBaseOption', () => {
    let props;
    let shallowCheckboxBaseOption;

    const checkboxBaseOption = props => {
        shallowCheckboxBaseOption = shallow(<CheckboxBaseOption {...props} />);

        return shallowCheckboxBaseOption;
    };

    beforeEach(() => {
        props = {
            value: false,
            option: { label: 'test' },
            onChange: jest.fn(),
        };

        shallowCheckboxBaseOption = undefined;
    });

    it('renders a label for checkbox', () => {
        expect(checkboxBaseOption(props).props().label).toEqual('test');
    });
});
