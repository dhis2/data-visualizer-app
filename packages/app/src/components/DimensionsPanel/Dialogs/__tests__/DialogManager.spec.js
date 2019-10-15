import React from 'react';
import { shallow } from 'enzyme';
import { DialogManager } from '../DialogManager';
import { FIXED_DIMENSIONS } from '../../../../modules/fixedDimensions';

jest.mock('@material-ui/core/Dialog', () => props => {
    console.log('children', props.children);

    return <div id="mock-mui-dialog">{props.children}</div>;
});

jest.mock('@material-ui/core/DialogActions', () => props => (
    <div id="mock-mui-dialog-actions">{props.children}</div>
));

jest.mock('@dhis2/analytics', () => {
    return {
        DataDimension: () => <div />,
        DynamicDimension: () => <div />,
        PeriodDimension: () => <div />,
        OrgUnitDimension: () => <div />,
    };
});

describe('The DialogManager component', () => {
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
            selectedItems: {
                ou: [],
                pe: [],
                dx: ['test'],
            },
            d2: {},
            metadata: {},
            closeDialog: jest.fn(),
            setRecommendedIds: jest.fn(),
        };
        shallowDialog = undefined;
    });

    it('renders a closed dialog', () => {
        expect(dialogManager()).toMatchSnapshot();
    });

    it('renders the DynamicDimension content in dialog', () => {
        const dialog = dialogManager().setProps({ dialogId: 'test' });
        expect(dialog).toMatchSnapshot();
    });

    it('should add the dialogId of fixed dimensions to state "mounted" on first time render', () => {
        const dialog = dialogManager().setProps({
            dialogId: FIXED_DIMENSIONS.ou.id,
        });

        expect(dialog.state().ouMounted).toBe(true);
    });

    it('renders the DataDimension content in dialog', () => {
        const dialog = dialogManager().setProps({
            dialogId: FIXED_DIMENSIONS.dx.id,
        });

        expect(dialog).toMatchSnapshot();
    });

    it('renders the OrgUnitDimension content in dialog', () => {
        const dialog = dialogManager().setProps({
            dialogId: FIXED_DIMENSIONS.ou.id,
        });

        expect(dialog).toMatchSnapshot();
    });

    it('renders the PeriodDimension content in dialog', () => {
        const dialog = dialogManager().setProps({
            dialogId: FIXED_DIMENSIONS.pe.id,
        });

        expect(dialog).toMatchSnapshot();
    });

    it('renders OUDimension content with display:none when previously mounted', () => {
        const dialog = dialogManager().setProps({
            dialogId: FIXED_DIMENSIONS.ou.id,
        });

        expect(dialog).toMatchSnapshot();

        dialog.setProps({ dialogId: null });
        expect(dialog).toMatchSnapshot();

        dialog.setProps({ dialogId: FIXED_DIMENSIONS.dx.id });
        expect(dialog).toMatchSnapshot();
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

    it('calls the closeDialog function', () => {
        const dialog = dialogManager().setProps({
            dialogId: FIXED_DIMENSIONS.dx.id,
        });

        dialog.simulate('close');

        expect(props.closeDialog).toHaveBeenCalled();
    });
});
