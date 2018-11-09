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
            dxIds: ['test'],
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

    it('sets the recommended Ids (with debounced delay) when a change in dx (Data) or ou (Organisation Unit) occurs', () => {
        const dialog = dialogManager();
        dialog.setProps({ ouIds: ['TEST_OU_ID'] });
        dialog.setProps({ ouIds: ['OTHER_ID'] });

        setTimeout(
            () => expect(props.setRecommendedIds).toHaveBeenCalledTimes(1),
            1001
        );
    });

    it('does not update recommendedIds if other selected ids are udpdated', () => {
        const dialog = dialogManager();
        dialog.setProps({ dimensionIdA: ['itemsByDimensionIdA'] });
        dialog.setProps({
            dimensionIdB: ['itemsByDimensionIdB', 'itemsByDimensionIdC'],
        });

        setTimeout(
            () => expect(props.setRecommendedIds).toHaveBeenCalledTimes(0),
            1001
        );
    });
});
