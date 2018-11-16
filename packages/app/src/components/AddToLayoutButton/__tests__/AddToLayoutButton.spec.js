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
            layoutType: '',
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

    it('renders two buttons, (DropDownIcon and "Add to series") if state buttonType is equal to -1 ', () => {
        props.layoutType = 'COLUMN';
        const button = addToButton();
        button.setState({ buttonType: -1 });

        const fragmentWrapper = button.find('Fragment');

        expect(fragmentWrapper.children().length).toBeGreaterThan(1);
    });

    it('renders only an "Add to filter" button if current chart type is year on year', () => {
        props.layoutType = 'YEAR_OVER_YEAR_LINE';
        const button = addToButton();
        button.setState({ buttonType: -1 });

        const addToFilterButton = button.find(Button).first();

        expect(addToFilterButton.find('Fragment').length).toEqual(0);
        expect(addToFilterButton.length).toEqual(1);
    });
});
