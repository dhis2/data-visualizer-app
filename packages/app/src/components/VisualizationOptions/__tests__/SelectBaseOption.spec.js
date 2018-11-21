import React from 'react';
import { shallow } from 'enzyme';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { SelectBaseOption } from '../Options/SelectBaseOption';

describe('DV > Options > SelectBaseOption', () => {
    let props;
    let shallowSelectBaseOption;
    let onChange;

    const selectBaseOption = props => {
        shallowSelectBaseOption = shallow(<SelectBaseOption {...props} />);

        return shallowSelectBaseOption;
    };

    beforeEach(() => {
        onChange = jest.fn();

        props = {
            value: '',
            option: {
                items: [
                    { id: '', label: 'Empty option' },
                    { id: 'opt1', label: 'Option 1' },
                    { id: 'opt2', label: 'Option 2' },
                    { id: 'opt3', label: 'Option 3' },
                ],
            },
            onChange,
            classes: {},
        };

        shallowSelectBaseOption = undefined;
    });

    it('renders a <Select />', () => {
        expect(selectBaseOption(props).find(Select)).toHaveLength(1);
    });

    it('renders the list of menu items', () => {
        const menuItems = selectBaseOption(props).find(MenuItem);

        menuItems.forEach((item, index) => {
            const option = props.option.items[index];

            expect(item.props().value).toEqual(option.id);
            expect(item.contains(option.label)).toBe(true);
        });
    });

    it('should trigger the onChange callback on select change', () => {
        const select = selectBaseOption(props).find(Select);

        select.simulate('change', { target: { value: 'opt2' } });

        expect(onChange).toHaveBeenCalled();
    });
});
