import React from 'react';
import { shallow } from 'enzyme';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';

import NewMenuItem from '../NewMenuItem';

describe('Favorites: FavoritesMenu > NewMenuItem component', () => {
    let newMenuItem;
    let onNew;
    let props;

    beforeEach(() => {
        onNew = jest.fn();

        props = {
            enabled: true,
            onNew,
        };

        newMenuItem = shallow(<NewMenuItem {...props} />);
    });

    it('should render the New button', () => {
        expect(newMenuItem.find(ListItemIcon)).toHaveLength(1);
        expect(newMenuItem.find(ListItemText).props().primary).toEqual('New');
    });

    it('should trigger the onNew callback when the button is clicked', () => {
        const menuItem = newMenuItem.find(MenuItem);
        expect(menuItem.props().disabled).toBe(false);

        menuItem.simulate('click');

        expect(onNew).toHaveBeenCalledTimes(1);
    });
});
