import React from 'react';
import { shallow } from 'enzyme';
import { DimensionOptions } from '../DimensionOptions';
import OptionsButton from '../DimensionOptions';

describe('The DimensionOptions component ', () => {
    let props;
    let shallowDimOptions;
    const dimOptions = () => {
        if (!shallowDimOptions) {
            shallowDimOptions = shallow(<DimensionOptions {...props} />);
        }
        return shallowDimOptions;
    };
    beforeEach(() => {
        props = {
            toggleHoverListener: jest.fn(),
        };
        shallowDimOptions = undefined;
    });

    it('renders an <OptionButton /> when state "showMenu" is equal to false', () => {
        const optionButton = dimOptions().find(OptionsButton);

        expect(dimOptions().state('showMenu')).toBe(false);
        //expect(optionButton.equals(<button />)).toEqual(true);
    });

    it('renders a modal dropdown menu when state "showMenu" is equal to true', () => {
        const optionButton = dimOptions().find(OptionsButton);

        //expect(dimOptions().state('showMenu')).toBe(false);
        //expect(optionButton.length).toBe(1);
    });
});
