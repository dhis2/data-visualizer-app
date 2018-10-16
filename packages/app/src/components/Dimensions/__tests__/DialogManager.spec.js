import React from 'react';
import { shallow } from 'enzyme';
import { Dialog } from '@material-ui/core';
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

    it('renders a null when id is equal to null ', () => {
        expect(dialogManager().length).toEqual(1);
    });

    it('renders a <Dialog> id is not equal to a falsy value', () => {
        props.id = 'dx';

        const wrappingDialog = dialogManager()
            .find(Dialog)
            .first();

        expect(wrappingDialog.length).toEqual(1);
    });
});
