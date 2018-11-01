import React from 'react';
import { shallow } from 'enzyme';
import Dialog from '@material-ui/core/Dialog';
import { DialogManager, defaultState, fixedDimensions } from '../DialogManager';
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
            ui: {},
            closeDialog: jest.fn(),
            onUpdate: jest.fn(),
        };
        shallowDialog = undefined;
    });

    it('renders null when prop dialogId is equal to null ', () => {
        expect(dialogManager().children().length).toEqual(0);
    });

    it('renders a <Dialog> with when prop dialogId is not equal to a falsy value', () => {
        props.dialogId = dxId;

        const wrappingDialog = dialogManager()
            .find(Dialog)
            .first();

        expect(wrappingDialog.children().length).toBeGreaterThan(1);
    });

    it('has default state', () => {
        const actualState = dialogManager().state();

        expect(actualState).toEqual(defaultState);
    });

    it('updates state properly for lazy mounting', () => {
        const dimensionIds = Object.keys(fixedDimensions);
        const component = dialogManager();

        dimensionIds.forEach((dimensionId, index) => {
            component.setProps({
                ...props,
                id: dimensionId,
            });

            expect(component.state()).toEqual({
                ...component.state(),
                mounted: dimensionIds.slice(0, index + 1),
            });
        });
    });
});
