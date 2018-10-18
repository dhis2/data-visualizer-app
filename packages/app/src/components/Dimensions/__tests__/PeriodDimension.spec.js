import React from 'react';
import { mount } from 'enzyme';
import PeriodDimension from '../PeriodDimension';
import { DialogContent, DialogActions } from '@material-ui/core';
import { PeriodSelector } from '@dhis2/d2-ui-period-selector-dialog';

import { getStubContext } from '../../../../../../config/testsContext';

describe('The Period Dimension component ', () => {
    let props;
    let shallowPeriodDim;

    const periodDim = () => {
        if (!shallowPeriodDim) {
            shallowPeriodDim = mount(<PeriodDimension {...props} />, {
                context: getStubContext(),
            });
        }
        return shallowPeriodDim;
    };

    beforeEach(() => {
        props = {
            toggleDialog: jest.fn(),
        };
        shallowPeriodDim = undefined;
    });

    it.only('renders an <div> containing everything else', () => {
        const wrappingDiv = periodDim()
            .find('div')
            .first();

        expect(wrappingDiv.children()).toEqual(periodDim().children());
    });

    it('renders a <DialogContent/>  with <DialogActions /> ', () => {});
    it('renders a <PeriodSelector /> component', () => {});
    it('fires the prop function toggleDialog when <HideButton /> is clicked', () => {});
    it('fires the prop function onUpdate when the <UpdateButton /> is clicked', () => {});
});
