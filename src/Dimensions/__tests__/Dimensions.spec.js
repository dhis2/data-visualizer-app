import React from 'react';
import { shallow } from 'enzyme';
import TextField from 'material-ui/TextField';
import { Dimensions } from '../Dimensions';
import { DimensionsManager } from '../DimensionsManager';

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
    it('render a TextField component', () => {
        expect(dimensions().find(TextField).length).toBe(1);
    });
    it('renders a DimensionsManager component', () => {
        expect(dimensions().find(DimensionsManager).length).toBe(1);
    });
    //describe('The DimensionsManager component');
});
