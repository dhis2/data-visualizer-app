import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import { ADD_TO_LAYOUT_OPTIONS } from '../../../modules/layout';

import { DropDownButton } from '../Menu';

describe('The DropDownButton component ', () => {
    let props;
    let shallowDropDown;

    const dropDown = () => {
        if (!shallowDropDown) {
            shallowDropDown = shallow(<DropDownButton {...props} />);
        }
        return shallowDropDown;
    };

    beforeEach(() => {
        props = {
            anchorEl: null,
            classes: {},
            menuItems: [],
            onClick: jest.fn(),
            onClose: jest.fn(),
        };
        shallowDropDown = undefined;
    });

    it('renders a <Fragment /> containing everything else ', () => {
        const button = dropDown()
            .find('Fragment')
            .first();

        expect(button.children()).toEqual(dropDown().children());
    });

    it('renders a <Button /> with <ArrowDropDown /> icon as child', () => {
        const arrowIcon = dropDown()
            .find(Button)
            .dive()
            .find(ArrowDropDown);

        expect(arrowIcon.length).toEqual(1);
    });

    it('renders a <Menu /> with no children if prop anchorEl is equal to a falsy value', () => {
        const menu = dropDown()
            .find(Menu)
            .dive();

        expect(menu.children().length).toEqual(0);
    });

    it('renders a <Menu /> with children if prop anchorEl is equal to a truthy value', () => {
        props.anchorEl = {};
        props.menuItems = ADD_TO_LAYOUT_OPTIONS.map((option, key) => (
            <MenuItem key={key} value={option.axisName} />
        ));

        const menu = dropDown()
            .find(Menu)
            .dive();

        expect(menu.children().length).toEqual(3);
    });
});
