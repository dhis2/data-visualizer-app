import React from 'react';
import { shallow } from 'enzyme';
import Dialog from '@material-ui/core/Dialog';
import { DialogManager } from '../DialogManager';
import { FIXED_DIMENSIONS } from '../../../../modules/fixedDimensions';

const dxId = FIXED_DIMENSIONS.dx.id;

describe('The DialogManager component ', () => {
    let props;
    let shallowDialog;

    const dialogManager = (customProps = {}) => {
        props = {
            ...props,
            ...customProps,
        };

        if (!shallowDialog) {
            shallowDialog = shallow(<DialogManager {...props} />);
        }
        return shallowDialog;
    };

    beforeEach(() => {
        props = {
            dialogId: null,
            dimensions: {},
            dxIds: [],
            ouIds: [],
            closeDialog: jest.fn(),
            setRecommendedIds: jest.fn(),
        };
        shallowDialog = undefined;
    });

    it('renders null when prop dialogId is equal to null ', () => {
        expect(dialogManager().children().length).toEqual(0);
    });

    it('renders a <Dialog> when prop dialogId is not equal to a falsy value', () => {
        props.dialogId = dxId;

        const wrappingDialog = dialogManager()
            .find(Dialog)
            .first();

        expect(wrappingDialog.children().length).toBeGreaterThan(1);
    });
});
