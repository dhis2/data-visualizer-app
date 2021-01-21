import React from 'react';
import { shallow } from 'enzyme';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';

import SaveAsDialog from '../SaveAsDialog';
import SaveMenuItem from '../SaveMenuItem';

describe('Favorites: FavoritesMenu > SaveMenuItem component', () => {
    let saveMenuItem;
    let onSave;
    let onSaveAs;
    let props;
    let saveAsDialog;

    const renderComponent = props => {
        return shallow(<SaveMenuItem {...props} />);
    };

    beforeEach(() => {
        onSave = jest.fn();
        onSaveAs = jest.fn();

        props = {
            enabled: true,
            onSave,
            onSaveAs,
            fileType: 'map',
        };

        saveMenuItem = renderComponent(props);
    });

    it('should render the Save button', () => {
        expect(saveMenuItem.find(ListItemIcon)).toHaveLength(1);
        expect(saveMenuItem.find(ListItemText).props().primary).toEqual('Save');
    });

    it('should open the SaveAs dialog on button click when no file object is present', () => {
        const menuItem = saveMenuItem.find(MenuItem);
        expect(menuItem.props().disabled).toBe(false);

        menuItem.simulate('click');

        saveAsDialog = saveMenuItem.find(SaveAsDialog);
        expect(saveAsDialog.props().open).toBe(true);
    });

    it('should close the SaveAs dialog on click', () => {
        saveMenuItem.find(MenuItem).simulate('click');
        saveMenuItem.find(MenuItem).simulate('click');

        saveAsDialog = saveMenuItem.find(SaveAsDialog);
        expect(saveAsDialog.props().open).toBe(false);
    });

    it('should trigger the onSaveAs callback on form submit', () => {
        saveMenuItem.find(SaveAsDialog).simulate('requestSaveAs');

        expect(onSaveAs).toHaveBeenCalledTimes(1);
    });

    it('should trigger the onSave callback when the button is clicked and a file object is present', () => {
        saveMenuItem = renderComponent({ ...props, fileModel: { id: 'some-file' } });

        const menuItem = saveMenuItem.find(MenuItem);
        expect(menuItem.props().disabled).toBe(false);

        menuItem.simulate('click');

        expect(onSave).toHaveBeenCalledTimes(1);
    });
});
