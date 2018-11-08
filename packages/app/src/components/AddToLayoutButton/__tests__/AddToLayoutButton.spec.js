import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';

import { AddToLayoutButton } from '../AddToLayoutButton';

describe('The AddToLayoutButton component ', () => {
    let props;
    let shallowAddToButton;

    const addToButton = () => {
        if (!shallowAddToButton) {
            shallowAddToButton = shallow(<AddToLayoutButton {...props} />);
        }
        return shallowAddToButton;
    };

    beforeEach(() => {
        props = {
            dialogId: 'id',
            currentLayout: {},
            onAddDimension: jest.fn(),
            closeDialog: jest.fn(),
        };
        shallowAddToButton = undefined;
    });

    it('renders an updateButton when state "buttonType" is not equal to -1 ', () => {
        const button = addToButton();
        button.setState({ buttonType: 2 });

        expect(button.length).toEqual(1);
    });
});
