import React from 'react';
import { shallow } from 'enzyme';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';

import SaveAsDialog from '../SaveAsDialog';
import SaveAsMenuItem from '../SaveAsMenuItem';

describe('File: FileMenu > SaveAsMenuItem component', () => {
    let saveAsMenuItem;
    let onSaveAs;
    let props;
    let saveAsDialog;

    beforeEach(() => {
        onSaveAs = jest.fn();

        props = {
            enabled: true,
            fileType: 'chart',
            fileModel: { id: 'some-file' },
            onSaveAs,
        };

        saveAsMenuItem = shallow(<SaveAsMenuItem {...props} />);
    });

    it('should render the SaveAs button', () => {
        expect(saveAsMenuItem.find(ListItemIcon)).toHaveLength(1);
        expect(saveAsMenuItem.find(ListItemText).props().primary).toEqual('Save as...');
    });

    it('should open the SaveAs dialog on button click', () => {
        const menuItem = saveAsMenuItem.find(MenuItem);
        expect(menuItem.props().disabled).toBe(false);

        menuItem.simulate('click');

        saveAsDialog = saveAsMenuItem.find(SaveAsDialog);
        expect(saveAsDialog.props().open).toBe(true);
    });

    it('should close the SaveAs dialog on click', () => {
        saveAsMenuItem.find(MenuItem).simulate('click');
        saveAsMenuItem.find(MenuItem).simulate('click');

        saveAsDialog = saveAsMenuItem.find(SaveAsDialog);
        expect(saveAsDialog.props().open).toBe(false);
    });

    it('should trigger the onSaveAs callback on form submit', () => {
        saveAsMenuItem.find(SaveAsDialog).simulate('requestSaveAs');

        expect(onSaveAs).toHaveBeenCalledTimes(1);
    });
});
