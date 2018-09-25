import React from 'react';
import { shallow } from 'enzyme';
import Select from '@material-ui/core/Select';

import { SelectBaseOption } from '../Options/SelectBaseOption';

describe('DV > Options > SelectBaseOption', () => {
    let props;
    let shallowSelectBaseOption;

    const selectBaseOption = props => {
        shallowSelectBaseOption = shallow(<SelectBaseOption {...props} />);

        return shallowSelectBaseOption;
    };

    beforeEach(() => {
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
            onChange: jest.fn(),
        };

        shallowSelectBaseOption = undefined;
    });

    it('renders a <Select />', () => {
        expect(selectBaseOption(props).find(Select)).toHaveLength(1);
    });
});
