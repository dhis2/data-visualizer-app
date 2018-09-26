import React from 'react';
import { shallow } from 'enzyme';
import { DialogActions } from '@material-ui/core';
import { HideButton, UpdateButton } from '../buttons';
import { DataDimensionManager } from '../DataDimensionManager';
describe('The DataDimensionManager component ', () => {
    let props;
    let shallowDataDim;
    const dataDimManager = () => {
        if (!shallowDataDim) {
            shallowDataDim = shallow(<DataDimensionManager {...props} />);
        }
        return shallowDataDim;
    };

    beforeEach(() => {
        props = {
            toggleDialog: jest.fn(),
        };
        shallowDataDim = undefined;
    });

    it('renders a div ', () => {
        expect(
            dataDimManager()
                .find('div')
                .first().length
        ).toEqual(1);
    });

    it('renders a div containing everything else', () => {
        const wrappingDiv = dataDimManager()
            .find('div')
            .first();
        expect(wrappingDiv.children()).toEqual(dataDimManager().children());
    });

    it('renders a <DialogActions /> with two buttons', () => {
        const dialogActions = dataDimManager()
            .find('div')
            .first()
            .find(DialogActions);

        expect(dialogActions.length).toBe(1);
        expect(dialogActions.childAt(0).type()).toEqual(HideButton);
        expect(dialogActions.childAt(1).type()).toEqual(UpdateButton);
    });
});
