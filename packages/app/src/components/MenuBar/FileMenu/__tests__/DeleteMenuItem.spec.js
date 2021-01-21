import React from 'react';
import { shallow } from 'enzyme';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { getStubContext } from '../../../../config/inject-theme';

import DeleteDialog from '../DeleteDialog';
import DeleteMenuItem from '../DeleteMenuItem';

describe('File: FileMenu > DeleteMenuItem component', () => {
    let deleteMenuItem;
    let onDelete;
    let onError;
    let props;
    let deleteDialog;

    const context = getStubContext();

    beforeEach(() => {
        onDelete = jest.fn();
        onError = jest.fn();

        props = {
            fileType: 'chart',
            fileModel: { id: 'some-file' },
            onDelete,
            onDeleteError: onError,
        };

        deleteMenuItem = shallow(<DeleteMenuItem {...props} />, { context });
    });

    it('should render the Delete button', () => {
        expect(deleteMenuItem.find(ListItemIcon)).toHaveLength(1);
        expect(deleteMenuItem.find(ListItemText).props().primary).toEqual(
            'Delete'
        );
    });

    it('should open the Delete dialog on button click', () => {
        deleteMenuItem.find(MenuItem).simulate('click');

        deleteDialog = deleteMenuItem.find(DeleteDialog);
        expect(deleteDialog.props().open).toBe(true);
    });

    it('should close the Delete dialog on click', () => {
        deleteMenuItem.find(MenuItem).simulate('click');
        deleteMenuItem.find(MenuItem).simulate('click');

        deleteDialog = deleteMenuItem.find(DeleteDialog);
        expect(deleteDialog.props().open).toBe(false);
    });

    it('should trigger the onDelete callback upon successful delete', () => {
        deleteMenuItem.find(DeleteDialog).simulate('requestDelete');

        expect(onDelete).toHaveBeenCalledTimes(1);
    });

    it('should trigger the onDeleteError callback upon unsuccessful delete', () => {
        const mockError = { httpStatusCode: 409, status: 'ERROR' };
        deleteMenuItem
            .find(DeleteDialog)
            .simulate('requestDeleteError', mockError);

        expect(onError).toHaveBeenCalledTimes(1);
        expect(onError).toHaveBeenCalledWith(mockError);
    });
});
