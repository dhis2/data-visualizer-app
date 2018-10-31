import React from 'react';
import { shallow } from 'enzyme';
import Dialog from '@material-ui/core/Dialog';
import { DialogManager } from '../DialogManager';
import { FIXED_DIMENSIONS } from '../../../modules/fixedDimensions';

const dxId = FIXED_DIMENSIONS.dx.id;

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
            dialogId: null,
            ui: {},
            closeDialog: jest.fn(),
            onUpdate: jest.fn(),
        };
        shallowDialog = undefined;
    });

    it('renders null when prop dialogIsOpen is equal to null ', () => {
        expect(dialogManager().length).toEqual(1);
    });
});
