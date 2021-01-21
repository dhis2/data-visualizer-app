import React from 'react';
import { shallow } from 'enzyme';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';

import GetLinkDialog from '../GetLinkDialog';
import GetLinkMenuItem from '../GetLinkMenuItem';

describe('File: FileMenu > GetLinkMenuItem component', () => {
    let getLinkMenuItem;
    let props;
    let getLinkDialog;

    beforeEach(() => {
        props = {
            enabled: true,
            fileType: 'chart',
            fileModel: { id: 'some-file' },
        };

        getLinkMenuItem = shallow(<GetLinkMenuItem {...props} />);
    });

    it('should render the GetLink button', () => {
        expect(getLinkMenuItem.find(ListItemIcon)).toHaveLength(1);
        expect(getLinkMenuItem.find(ListItemText).props().primary).toEqual('Get link');
    });

    it('should open the GetLink dialog on button click', () => {
        const menuItem = getLinkMenuItem.find(MenuItem);
        expect(menuItem.props().disabled).toBe(false);

        menuItem.simulate('click');

        getLinkDialog = getLinkMenuItem.find(GetLinkDialog);
        expect(getLinkDialog.props().open).toBe(true);
    });

    it('should close the GetLink dialog on click', () => {
        getLinkMenuItem.find(MenuItem).simulate('click');
        getLinkMenuItem.find(MenuItem).simulate('click');

        getLinkDialog = getLinkMenuItem.find(GetLinkDialog);
        expect(getLinkDialog.props().open).toBe(false);
    });
});
