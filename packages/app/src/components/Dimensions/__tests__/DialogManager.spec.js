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
        props.id = 'dx';
        expect(dialogManager().find(Dialog).length).toEqual(1);
    });

    it('renders a <Dialog> containing everything else', () => {
        const wrappingDialog = dialogManager()
            .find(Dialog)
            .first();

        expect(wrappingDialog.children()).toEqual(dialogManager().children());
    });
});
