import React from 'react';
import { shallow } from 'enzyme';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import FavoritesDialog from '@dhis2/d2-ui-favorites-dialog';

import { getStubContext } from '../../../../config/inject-theme';
import OpenMenuItem from '../OpenMenuItem';

describe('File: FileMenu > OpenMenuItem component', () => {
    let openMenuItem;
    let onOpen;
    let props;
    let favoritesDialog;

    const context = getStubContext();

    beforeEach(() => {
        onOpen = jest.fn();

        props = {
            fileType: 'chart',
            onOpen,
        };

        openMenuItem = shallow(<OpenMenuItem {...props} />, { context });
    });

    it('should render the Open button', () => {
        expect(openMenuItem.find(ListItemIcon)).toHaveLength(1);
        expect(openMenuItem.find(ListItemText).props().primary).toEqual('Open');
    });

    it('should open the File dialog on button click', () => {
        openMenuItem.find(MenuItem).simulate('click');

        favoritesDialog = openMenuItem.find(FavoritesDialog);
        expect(favoritesDialog.props().open).toBe(true);
    });

    it('should close the File dialog on click', () => {
        openMenuItem.find(MenuItem).simulate('click');
        openMenuItem.find(MenuItem).simulate('click');

        favoritesDialog = openMenuItem.find(FavoritesDialog);
        expect(favoritesDialog.props().open).toBe(false);
    });

    it('should trigger the onOpen callback when a file is selected in the dialog', () => {
        favoritesDialog = openMenuItem.find(FavoritesDialog);
        favoritesDialog.props().onFavoriteSelect({ id: 'model-id' });

        expect(onOpen).toHaveBeenCalledTimes(1);
    });
});
