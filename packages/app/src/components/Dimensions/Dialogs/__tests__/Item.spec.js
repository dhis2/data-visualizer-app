import React from 'react';
import { shallow } from 'enzyme';
import Item from '../Item';
import RemoveDimensionButton from '../buttons/RemoveDimensionButton';
import HighlightedIcon from '../../../../assets/HighlightedIcon';
import UnselectedIcon from '../../../../assets/UnselectedIcon';
import SelectedIcon from '../../../../assets/SelectedIcon';

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

    it('renders <UnselectedIcon /> when className is equal to "unselected" ', () => {
        const unselectIcon = item()
            .find('Icon')
            .dive()
            .find(UnselectedIcon);

        expect(unselectIcon.length).toEqual(1);
    });

    it('renders a <HighlightedIcon /> when prop isHighlighted is equal to true', () => {
        props.isHighlighted = true;

        const highlightIcon = item()
            .find('Icon')
            .dive()
            .find(HighlightedIcon);

        expect(highlightIcon.length).toEqual(1);
    });

    it('renders <SelectedIcon /> when className is equal to "selected" ', () => {
        props.className = 'selected';

        const selectIcon = item()
            .find('Icon')
            .dive()
            .find(SelectedIcon);

        expect(selectIcon.length).toEqual(1);
    });

    it('should not render a <RemoveDimensionButton /> when className is equal to "unselected" ', () => {
        const removeButton = item()
            .find(RemoveDimensionButton)
            .dive();

        expect(removeButton.children().length).toEqual(0);
    });

    it('renders <RemoveDimensionButton /> when className is equal to "selected" ', () => {
        props.className = 'selected';

        const removeButton = item()
            .find(RemoveDimensionButton)
            .dive();

        expect(removeButton.children().length).toEqual(1);
    });

    it('fires prop onItemClick when pressed', () => {
        item()
            .props()
            .onClick({ preventDefault: () => undefined });

        expect(props.onItemClick).toBeCalledTimes(1);
    });
});
