import React from 'react';
import { shallow } from 'enzyme';
import MenuItem from '@material-ui/core/MenuItem';
import { DimensionOptions } from '../DimensionOptions';
import OptionsButton from '../../DimensionOptions/OptionsButton';
import DropDown from '../DropDown';

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
            id: 'IdString',
            type: 'COLLUMN',
            isSelected: false,
            currentLayout: {},
            items: {},
            showButton: false,
            onAddDimension: jest.fn(),
            openDialog: jest.fn(),
            onCloseMenu: jest.fn(),
        };
        shallowDimOptions = undefined;
    });

    it('does not render an <OptionsButton /> when props showButton is equal to flase', () => {
        const optionsButton = dimOptions().find(OptionsButton);

        expect(optionsButton.length).toEqual(0);
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

    it('passes only 1 element ("Add to Filter", or "Remove") as menuItems to <DropDown /> if prop isSelected is true and prop type is equal to YearOnYear', () => {
        props.isSelected = true;
        props.type = 'YEAR_OVER_YEAR_LINE';

        const dropDown = dimOptions().find(DropDown);

        expect(dropDown.dive().find(MenuItem).length).toEqual(1);
    });

    it('passes 3 elements ("Move to X" + "Remove" or "Add to X") as menuItems if prop "type" is NOT equal to YearOnYear', () => {
        const dropDown = dimOptions().find(DropDown);

        expect(dropDown.dive().find(MenuItem).length).toEqual(3);
    });
});
