import React from 'react';
import { shallow } from 'enzyme';
import { DialogActions } from '@material-ui/core';
import { HideButton, UpdateButton } from '../buttons';
import { DataDimension } from '../DataDimension';

describe('The DataDimension component ', () => {
    let props;
    let shallowDataDim;
    const dataDim = () => {
        if (!shallowDataDim) {
            shallowDataDim = shallow(<DataDimension {...props} />);
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
            dataDim()
                .find('div')
                .first().length
        ).toEqual(1);
    });

    it('renders a div containing everything else', () => {
        const wrappingDiv = dataDim()
            .find('div')
            .first();
        expect(wrappingDiv.children()).toEqual(dataDim().children());
    });

    it('renders a <DialogActions /> with two buttons', () => {
        const dialogActions = dataDim()
            .find('div')
            .first()
            .find(DialogActions);

        expect(dialogActions.length).toBe(1);
        expect(dialogActions.childAt(0).type()).toEqual(HideButton);
        expect(dialogActions.childAt(1).type()).toEqual(UpdateButton);
    });
});
