import React from 'react';
import { shallow } from 'enzyme';
import { UnselectedItems } from '../UnselectedItems';

describe('The SelectedContainer component ', () => {
    let props;
    let shallowItems;
    const unselectedItems = () => {
        if (!shallowItems) {
            shallowItems = shallow(<UnselectedItems {...props} />);
        }
        return shallowItems;
    };

    beforeEach(() => {
        props = {
            items: {},
            onSelect: jest.fn(),
            searchFieldInput: '',
        };
        shallowItems = undefined;
    });

    it('renders a div ', () => {
        expect(
            unselectedItems()
                .find('div')
                .first().length
        ).toEqual(1);
    });

    it('renders a div containing everything else', () => {
        const wrappingDiv = unselectedItems()
            .find('div')
            .first();
        expect(wrappingDiv.children()).toEqual(unselectedItems().children());
    });
});
