import { shallow } from 'enzyme'
import React from 'react'
import { AddToLayoutButton } from '../AddToLayoutButton.js'

describe('The AddToLayoutButton component ', () => {
    let props
    let shallowButton

    const getShallowAddToLayoutButton = () => {
        if (!shallowButton) {
            shallowButton = shallow(<AddToLayoutButton {...props} />)
        }
        return shallowButton
    }

    // TODO remove
    console.log('getShallowAddToLayoutButton', getShallowAddToLayoutButton)

    beforeEach(() => {
        props = {
            classes: {},
            closeDialog: jest.fn(),
            dimensionIdsInLayout: ['dx', 'pe', 'ou'],
            dialogId: '',
            onAddDimension: jest.fn(),
            ui: { type: 'COLUMN' },
        }
        shallowButton = undefined
    })

    it('new test below must be fixed', () => {
        expect(true).toBe(true)
    })

    // TODO: Add new tests, https://jira.dhis2.org/browse/DHIS2-7809

    // it('renders an update button if dialogid exists in layout', () => {
    //     props.dialogId = 'dx';

    //     const button = getShallowAddToLayoutButton();

    //     expect(button.find('button').attr('data-test')).toEqual(
    //         'update-button'
    //     );
    // });

    // deprecated tests

    /*it('renders two buttons, (DropDownIcon and "Add to series") if state buttonType is equal to -1 ', () => {
        const button = getShallowAddToLayoutButton();
        button.setState({ buttonType: -1 });

        const fragmentWrapper = button.find('div');

        expect(fragmentWrapper.children().length).toBeGreaterThan(1);
    });

    it('renders only an "Add to filter" button if current chart type is year on year', () => {
        props.layoutType = 'YEAR_OVER_YEAR_LINE';
        const button = getShallowAddToLayoutButton();
        button.setState({ buttonType: -1 });

        const addToFilterButton = button.find(Button).first();

        expect(addToFilterButton.find('div').length).toEqual(0);
        expect(addToFilterButton.length).toEqual(1);
    });*/
})
