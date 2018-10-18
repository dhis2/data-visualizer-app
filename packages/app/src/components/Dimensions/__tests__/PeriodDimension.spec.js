import React from 'react';
import { shallow } from 'enzyme';
import { PeriodDimension } from '../PeriodDimension';
import { PeriodSelector } from '@dhis2/d2-ui-period-selector-dialog';
import { HideButton, UpdateButton } from '.././DataDimension/buttons';

describe('The Period Dimension component ', () => {
    let props;
    let shallowPeriodDim;

    const periodDim = () => {
        if (!shallowPeriodDim) {
            shallowPeriodDim = shallow(<PeriodDimension {...props} />);
        }
        return shallowPeriodDim;
    };

    beforeEach(() => {
        props = {
            toggleDialog: jest.fn(),
            selectedItems: {},
            d2: {},
        };
        shallowPeriodDim = undefined;
    });

    it.only('renders an <div> containing everything else', () => {
        const wrappingDiv = periodDim()
            .find('div')
            .first();

        expect(wrappingDiv.children()).toEqual(periodDim().children());
    });

    it.only('renders a <PeriodSelector /> component', () => {
        const periodSelector = periodDim().find(PeriodSelector);

        expect(periodSelector.length).toEqual(1);
    });

    it('fires the prop function toggleDialog when <HideButton />  is clicked', () => {
        const hideButton = periodDim().find(HideButton);
        hideButton.simulate('click');

        expect(props.toggleDialog).toHaveBeenCalledTimes(1);
    });
    it('fires the prop function toggleDialog when the <UpdateButton /> is clicked', () => {
        const updateButton = periodDim().find(UpdateButton);
        updateButton.simulate('click');

        expect(props.toggleDialog).toHaveBeenCalledTimes(1);
    });
});
