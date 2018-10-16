import React from 'react';
import { mount } from 'enzyme';
import { DimensionOptions } from '../DimensionOptions';
import { OptionsButton } from '../DimensionOptions';
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
            showButton: false,
            onClose: jest.fn(),
        };
        shallowDimOptions = undefined;
    });

    it('renders an <OptionsButton /> when props "showButton" is equal to true', () => {
        props.showButton = true;
        const optionsButton = dimOptions().find(OptionsButton);

        expect(optionsButton.length).toEqual(1);
    });

    it('renders a <DropDown /> ', () => {
        const dropDown = dimOptions().find(DropDown);

        expect(dropDown.length).toEqual(1);
    });
});
