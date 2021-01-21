import React from 'react';
import { shallow } from 'enzyme';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { getStubContext } from '../../../../config/inject-theme';

import WriteInterpretationDialog from '../WriteInterpretationDialog';
import WriteInterpretationMenuItem from '../WriteInterpretationMenuItem';

describe('File: FileMenu > WriteInterpretationMenuItem component', () => {
    let writeInterpretationMenuItem;
    let onWriteInterpretation;
    let props;
    let writeInterpretationDialog;

    const context = getStubContext();

    beforeEach(() => {
        onWriteInterpretation = jest.fn();

        props = {
            enabled: true,
            fileType: 'chart',
            fileModel: { id: 'some-file' },
            onWriteInterpretation,
        };

        writeInterpretationMenuItem = shallow(<WriteInterpretationMenuItem {...props} />, {
            context,
        });
    });

    it('should render the WriteInterpretation button', () => {
        expect(writeInterpretationMenuItem.find(ListItemIcon)).toHaveLength(1);
        expect(writeInterpretationMenuItem.find(ListItemText).props().primary).toEqual(
            'Write interpretation',
        );
    });

    it('should open the WriteInterpretation dialog on button click', () => {
        const menuItem = writeInterpretationMenuItem.find(MenuItem);
        expect(menuItem.props().disabled).toBe(false);

        menuItem.simulate('click');

        writeInterpretationDialog = writeInterpretationMenuItem.find(WriteInterpretationDialog);
        expect(writeInterpretationDialog.props().open).toBe(true);
    });

    it('should close the WriteInterpretation dialog on click', () => {
        writeInterpretationMenuItem.find(MenuItem).simulate('click');
        writeInterpretationMenuItem.find(MenuItem).simulate('click');

        writeInterpretationDialog = writeInterpretationMenuItem.find(WriteInterpretationDialog);
        expect(writeInterpretationDialog.props().open).toBe(false);
    });

    it('should trigger the onWriteInterpretation callback upon successful interpretation edit', () => {
        writeInterpretationMenuItem
            .find(WriteInterpretationDialog)
            .simulate('requestWriteInterpretation');

        expect(onWriteInterpretation).toHaveBeenCalledTimes(1);
    });
});
