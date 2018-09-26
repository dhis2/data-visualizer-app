import React from 'react';
import { shallow } from 'enzyme';
import { Button, DialogActions, DialogContent } from '@material-ui/core';
import { DataDimensionManager } from '../DataDimensionManager';
describe('The DataDimensionManager component ', () => {
    let props;
    let shallowDialog;
    const dialogManager = () => {
        if (!shallowDialog) {
            shallowDialog = shallow(<DataDimensionManager {...props} />);
        }
        return shallowDialog;
    };

    beforeEach(() => {
        props = {
            dialogIsOpen: false,
            id: null,
            toggleDialog: jest.fn(),
            classes: { paper: {} },
        };
        shallowDialog = undefined;
    });

    it('renders a <DialogContent> ', () => {
        expect(dialogManager().find(DialogContent).length).toEqual(1);
    });

    it('renders a <DialogContent /> with the correct Dimension component when rendered', () => {
        const dialogContent = dialogManager().find(DialogContent);
        expect(dialogContent.length).toBe(1);
    });
});
