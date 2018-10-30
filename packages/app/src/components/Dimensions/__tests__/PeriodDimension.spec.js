import React from 'react';
import { shallow } from 'enzyme';
import { PeriodDimension } from '../PeriodDimension';
import { PeriodSelector } from '@dhis2/d2-ui-period-selector-dialog';
import { HideButton, UpdateButton } from '.././DataDimension/buttons';
import { getStubContext } from '../../../../../../config/testsContext';
import { FIXED_DIMENSIONS } from '../../../modules/fixedDimensions';

const peId = FIXED_DIMENSIONS.pe.id;

describe('The Period Dimension component ', () => {
    let props;
    let shallowPeriodDim;

    const periodDim = () => {
        if (!shallowPeriodDim) {
            shallowPeriodDim = shallow(<PeriodDimension {...props} />, {
                context: getStubContext(),
            });
        }
        return shallowPeriodDim;
    };

    beforeEach(() => {
        props = {
            toggleDialog: jest.fn(),
            onUpdate: jest.fn(),
            ui: {
                itemsByDimension: {
                    [peId]: [],
                },
            },
            metadata: {},
            addMetadata: jest.fn(),
            addUiItems: jest.fn(),
            removeUiItems: jest.fn(),
        };
        shallowPeriodDim = undefined;
    });

    it('renders a <div> containing everything else', () => {
        const wrappingDiv = periodDim()
            .find('div')
            .first();

        expect(wrappingDiv.children()).toEqual(periodDim().children());
    });

    it('renders a <PeriodSelector /> component', () => {
        const periodSelector = periodDim().find(PeriodSelector);

        expect(periodSelector.length).toEqual(1);
    });

    it('sets the selected items for the PeriodSelector', () => {
        props.ui.itemsByDimension[peId] = ['applejack', 'rainbowdash'];
        props.metadata = {
            applejack: { id: 'applejack', name: 'Apple Jack' },
            rainbowdash: { id: 'rainbowdash', name: 'Rainbow Dash' },
            rarity: { id: 'rarity', name: 'A Rarity' },
        };

        const periodSelector = periodDim().find(PeriodSelector);

        const selectedItems = periodSelector.prop('selectedItems');
        expect(selectedItems.length).toBe(2);
        expect(selectedItems[0].name).toBe('Apple Jack');
    });

    it('triggers toggleDialog when <HideButton /> is clicked', () => {
        const hideButton = periodDim().find(HideButton);
        hideButton.props().action();

        expect(props.toggleDialog).toHaveBeenCalled();
    });

    it('triggers toggleDialog when the <UpdateButton /> is clicked', () => {
        const updateButton = periodDim().find(UpdateButton);
        updateButton.props().action();

        expect(props.toggleDialog).toHaveBeenCalled();
    });
});
