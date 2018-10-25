import React from 'react';
import { shallow } from 'enzyme';
import { Item, UnselectedIcon, SelectedIcon } from '../Item';
import { RemoveSelectedItemButton } from '../buttons';

describe('The Item component ', () => {
    let props;
    let shallowItem;

    const item = () => {
        if (!shallowItem) {
            shallowItem = shallow(<Item {...props} />);
        }
        return shallowItem;
    };

    beforeEach(() => {
        props = {
            id: 'testID',
            index: 0,
            displayName: 'displayTestName',
            isHighlighted: false,
            unselected: true,
            onItemClick: jest.fn(),
        };
        shallowItem = undefined;
    });

    it('renders a div containing everything else', () => {
        const wrappingDiv = item()
            .find('div')
            .first();

        expect(
            item()
                .find('div')
                .first().length
        ).toEqual(1);
        expect(wrappingDiv.children()).toEqual(item().children());
    });
    describe('when prop unselected is equal to true', () => {
        beforeEach(() => {
            props.unselected = true;
        });

        it('renders an <UnselectedIcon /> ', () => {
            const selectIcon = item().find(UnselectedIcon);

            expect(selectIcon.length).toEqual(1);
        });

        it('renders null instead of  a <RemoveSelectedItemButton />', () => {
            const removeButton = item().find(RemoveSelectedItemButton);

            expect(removeButton.length).toEqual(0);
        });
    });
    describe('when prop unselected is equal to false', () => {
        beforeEach(() => {
            props.unselected = false;
        });

        it('renders a <SelectedIcon /> ', () => {
            const selectIcon = item().find(SelectedIcon);

            expect(selectIcon.length).toEqual(1);
        });

        it('renders a RemoveButton when unselected prop is equal to false', () => {
            props.unselected = false;
            const removeButton = item().find(RemoveSelectedItemButton);

            expect(removeButton.length).toEqual(1);
        });
    });
});
