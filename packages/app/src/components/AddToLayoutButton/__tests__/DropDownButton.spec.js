import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';

import { DropDownButton } from '../DropDownButton';

describe('The DropDownButton component ', () => {
    let props;
    let shallowDropDownButton;

    const dropDownButton = () => {
        if (!shallowDropDownButton) {
            shallowDropDownButton = shallow(<DropDownButton {...props} />);
        }
        return shallowDropDownButton;
    };

    beforeEach(() => {
        props = {
            classes: {},
            open: false,
            onClick: jest.fn(),
        };
        shallowDropDownButton = undefined;
    });

    it.only('renders a <Button /> containing everything else ', () => {
        const button = dropDownButton()
            .find(Button)
            .first();

        expect(button.children()).toEqual(dropDownButton().children());
    });

    it.only('renders a <ArrowDropDown /> if prop "open" is equal to false', () => {
        const arrowIcon = dropDownButton().find(ArrowDropDown);

        expect(arrowIcon.length).toEqual(1);
    });

    it.only('renders a <ArrowDropUp /> if prop "open" is equal to true', () => {
        props.open = true;

        const arrowIcon = dropDownButton().find(ArrowDropUp);

        expect(arrowIcon.length).toEqual(1);
    });
});
