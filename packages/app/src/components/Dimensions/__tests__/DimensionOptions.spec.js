import React from 'react';
import { mount } from 'enzyme';
import { DimensionOptions } from '../DimensionOptions';
import OptionsButton from '../DimensionOptions';
import DropDown from '../DropDown';

describe('The DimensionOptions component ', () => {
    let props;
    let shallowDimOptions;
    const dimOptions = () => {
        if (!shallowDimOptions) {
            shallowDimOptions = mount(<DimensionOptions {...props} />);
        }
        return shallowDimOptions;
    };

    beforeEach(() => {
        props = {
            id: 'IdString',
            toggleHoverListener: jest.fn(),
        };
        shallowDimOptions = undefined;
    });

    it('renders an <OptionsButton /> when state "showMenu" is equal to false', () => {
        dimOptions().setState({ showMenu: false });
        const optionsButton = dimOptions().find(OptionsButton);
        const dropDown = dimOptions().find(DropDown);

        expect(optionsButton.length).toEqual(1);
        expect(dropDown.length).toEqual(0);
    });
});
