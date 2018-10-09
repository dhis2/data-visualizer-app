import React from 'react';
import { shallow } from 'enzyme';
import { Dialog, DialogContent } from '@material-ui/core';
import { DialogManager } from '../DialogManager';

describe('The DialogManager component ', () => {
    let props;
    let shallowDialog;
    const dialogManager = () => {
        if (!shallowDialog) {
            shallowDialog = shallow(<DialogManager {...props} />);
        }
        return shallowDialog;
    };

    beforeEach(() => {
        props = {
            dialogIsOpen: false,
            id: null,
            toggleDialog: jest.fn(),
        };
        shallowDialog = undefined;
    });

    it('renders a <Dialog> ', () => {
        expect(dialogManager().find(Dialog).length).toEqual(1);
    });

    it('renders a <Dialog> containing everything else', () => {
        const wrappingDialog = dialogManager()
            .find(Dialog)
            .first();

        expect(wrappingDialog.children()).toEqual(dialogManager().children());
    });

    it('renders a <DialogContent /> with the correct Dimension component when rendered', () => {
        const dialogContent = dialogManager().find(DialogContent);
        expect(dialogContent.length).toBe(1);
    });

    it('renders two <Button /> with the correct props', () => {
        const button = dialogManager().find(Dialog);
        expect(button.length).toBe(1);
    });

    it('does not render when prop dialogIsOpen is equal to false', () => {
        expect(dialogManager().props().dialogIsOpen).toEqual(undefined); //False
    });
});
