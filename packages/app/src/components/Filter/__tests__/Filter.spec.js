import React from 'react';
import { shallow } from 'enzyme';
import Filter from '../Filter';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';

describe('The Filter component ', () => {
    let shallowFilter;
    let props;
    const filterComp = () => {
        if (!shallowFilter) {
            shallowFilter = shallow(<Filter {...props} />);
        }
        return shallowFilter;
    };

    beforeEach(() => {
        props = {
            placeholder: 'testplaceholder',
            text: '',
            onChange: jest.fn(),
            onClear: jest.fn(),
        };
        shallowFilter = undefined;
    });

    it('renders a TextField component containing everything esle', () => {
        expect(filterComp().find(TextField).length).toEqual(1);
    });

    it('should only  render a search Icon as startAdornment when props.text have length < 1', () => {
        const filter = filterComp().find(TextField);

        const startAdornment = filter.props().InputProps.startAdornment;
        const endAdornment = filter.props().InputProps.endAdornment;

        expect(startAdornment.props.children.type).toEqual(Search);

        expect(endAdornment).toEqual(null);
    });

    it('should render a Search Icon and IconButton when props.text have length > 0', () => {
        props.text = 'testString';

        const filter = filterComp().find(TextField);
        const startAdornment = filter.props().InputProps.startAdornment;
        const endAdornment = filter.props().InputProps.endAdornment;

        expect(startAdornment.props.children.type).toEqual(Search);
        expect(endAdornment.props.children.type).toEqual(IconButton);
    });

    it('should clear its value when Escape key is pressed', () => {
        props.text = 'testString';

        const filter = filterComp().find(TextField);

        const mockEvent = {
            key: 'Escape',
            preventDefault: jest.fn(),
        };

        filter.props().onKeyDown(mockEvent);

        expect(props.onClear).toHaveBeenCalledTimes(1);
    });

    it('should call prop onClear if onChange receives text string with length < 1 (Ctrl-A  + BackSpace)', () => {
        props.text = 'anotherTestString';

        const filter = filterComp().find(TextField);

        const mockEvent = {
            target: { value: '' },
            preventDefault: jest.fn(),
        };

        filter.props().onChange(mockEvent);

        expect(props.onClear).toHaveBeenCalledTimes(1);
    });
});
