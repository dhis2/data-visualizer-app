import React from 'react';
import { shallow } from 'enzyme';
import Dialog from '@material-ui/core/Dialog';
import { DialogManager } from '../DialogManager';
import { FIXED_DIMENSIONS } from '../../../../modules/fixedDimensions';
import { DynamicDimension } from '../DynamicDimension/DynamicDimension';

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
            dimensions: {
                test: {},
            },
            dxIds: ['test'],
            ouIds: [],
            closeDialog: jest.fn(),
            setRecommendedIds: jest.fn(),
        };
        shallowDialog = undefined;
    });

    it('should always render a Dialog', () => {
        expect(dialogManager().children().length).toEqual(1);
    });

    it('should add the dialogId of fixed dimensions to state "mounted" on first time render', () => {
        const orgUnitId = 'ou';
        const dialog = dialogManager().setProps({ dialogId: orgUnitId });

        expect(dialog.state().mounted).toContain(orgUnitId);
    });

    it('should render fixed dimensions inside a div wrapper', () => {
        const dataDimId = 'dx';
        const dialog = dialogManager().setProps({ dialogId: dataDimId });

        const wrappingDiv = dialog.find('div');

        expect(wrappingDiv.length).toEqual(1);
    });

    it('the wrapping div should hide children with display:"none" if prop dialogId is equal to a falsy value,', () => {
        const dataDimId = 'dx';
        const dialog = dialogManager().setProps({ dialogId: dataDimId });

        dialog.setProps({ dialogId: null });
        const wrappingDiv = dialog.find('div');

        const hidden = { display: 'none' };
        expect(wrappingDiv.props().style).toEqual(hidden);
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
