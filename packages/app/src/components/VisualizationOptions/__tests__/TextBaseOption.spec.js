import React from 'react';
import { shallow } from 'enzyme';
import TextField from '@material-ui/core/TextField';

import { TextBaseOption } from '../Options/TextBaseOption';

describe('DV > Options > TextBaseOption', () => {
    let props;
    let shallowTextBaseOption;
    let onChange;

    const textBaseOption = props => {
        shallowTextBaseOption = shallow(<TextBaseOption {...props} />);

        return shallowTextBaseOption;
    };

    beforeEach(() => {
        onChange = jest.fn();

        props = {
            value: 'test',
            type: 'text',
            option: {
                label: 'Input field',
            },
            onChange,
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

    it('sets the helper text to what passed in the option prop', () => {
        props.option.helperText = 'helper text';

        expect(
            textBaseOption(props)
                .find(TextField)
                .props().helperText
        ).toEqual('helper text');
    });

    it('should trigger the onChange callback on text change', () => {
        const text = textBaseOption(props).find(TextField);

        text.simulate('change', { target: { value: 'test' } });

        expect(onChange).toHaveBeenCalled();
    });
});
