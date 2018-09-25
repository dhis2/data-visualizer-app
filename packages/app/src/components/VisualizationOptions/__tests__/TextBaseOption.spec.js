import React from 'react';
import { shallow } from 'enzyme';
import TextField from '@material-ui/core/TextField';

import { TextBaseOption } from '../Options/TextBaseOption';

describe('DV > Options > TextBaseOption', () => {
    let props;
    let shallowTextBaseOption;

    const textBaseOption = props => {
        shallowTextBaseOption = shallow(<TextBaseOption {...props} />);

        return shallowTextBaseOption;
    };

    beforeEach(() => {
        props = {
            value: 'test',
            option: {
                label: 'Input field',
            },
            onChange: jest.fn(),
        };

        shallowTextBaseOption = undefined;
    });

    it('renders a <TextField />', () => {
        expect(textBaseOption(props).find(TextField)).toHaveLength(1);
    });

    it('sets the label prop to what passed in the option prop', () => {
        expect(
            textBaseOption(props)
                .find(TextField)
                .props().label
        ).toEqual('Input field');
    });

    it('sets the value to what passed in the prop', () => {
        expect(
            textBaseOption(props)
                .find(TextField)
                .props().value
        ).toEqual('test');
    });
});
