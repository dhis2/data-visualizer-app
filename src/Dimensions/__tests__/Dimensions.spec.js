import React from 'react';
import { shallow } from 'enzyme';
import TextField from 'material-ui/TextField';
import { Dimensions } from '../Dimensions';

describe('The Dimensions component', () => {
    let props;
    let shallowDimensions;
    const dimensions = () => {
        if (!shallowDimensions) {
            shallowDimensions = shallow(<Dimensions {...props} />);
        }
        return shallowDimensions;
    };
    beforeEach(() => {
        props = {
            classes: {},
            onChange: jest.fn(),
        };
        shallowDimensions = undefined;
    });
    it('renders 1 div as the outermost component', () => {
        expect(dimensions().find('div').length).toBe(1);
    });

    it('renders a div containing everything else', () => {
        const wrappingDiv = dimensions()
            .find('div')
            .first();
        expect(wrappingDiv.children()).toEqual(dimensions().children());
    });
    it('should render a TextField component', () => {
        expect(dimensions().find(TextField).length).toBe(1);
    });
    it('', () => {});
});
