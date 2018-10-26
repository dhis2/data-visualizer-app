import React from 'react';
import { shallow } from 'enzyme';
import { Item } from '../Item';
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
            className: 'unselected',
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

    it('renders an <UnselectedIcon /> with the correct props', () => {
        const selectIcon = item().find('Icon');

        expect(selectIcon.props().iconType).toEqual(props.className);
    });

    it('renders a <SelectedIcon /> with the correct props', () => {
        const selectIcon = item().find('Icon');

        expect(selectIcon.props().iconType).toEqual(props.className);
    });

    it('renders a <RemoveSelectedItemButton /> ', () => {
        const removeButton = item().find(RemoveSelectedItemButton);

        expect(removeButton.length).toEqual(1);
    });
});
