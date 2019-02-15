import React from 'react';
import { shallow } from 'enzyme';
import { UnselectedItems } from '../UnselectedItems';

describe('UnselectedItems component', () => {
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
            items: [],
            filterText: '',
            onSelect: jest.fn(),
            requestMoreItems: jest.fn(),
        };
        shallowItems = undefined;
    });

    it('matches the snapshot when list is empty', () => {
        expect(unselectedItems()).toMatchSnapshot();
    });

    describe('list with items', () => {
        beforeEach(() => {
            props.items = [
                {
                    id: 'rb',
                    name: 'rainbow',
                },
                { id: 'rr', name: 'rarity' },
            ];
        });

        it('matches the snapshot when list has items', () => {
            expect(unselectedItems()).toMatchSnapshot();
        });

        it('triggers onSelect all when "select all" button clicked', () => {
            unselectedItems()
                .find('SelectButton')
                .simulate('click');

            expect(props.onSelect).toHaveBeenCalled();
            expect(props.onSelect).toHaveBeenCalledWith(['rb', 'rr']);
        });

        it('triggers onSelect when item double-clicked', () => {
            unselectedItems()
                .find('li')
                .first()
                .simulate('doubleClick');

            expect(props.onSelect).toHaveBeenCalled();
            expect(props.onSelect).toHaveBeenCalledWith(['rb']);
        });

        it('triggers onSelect when "assign" button clicked', () => {
            const list = unselectedItems();
            list.find('Item')
                .first()
                .simulate('click', false, false, 0, 'rb');

            list.find('ArrowButton')
                .first()
                .simulate('click');

            expect(props.onSelect).toHaveBeenCalled();
            expect(props.onSelect).toHaveBeenCalledWith(['rb']);
        });

        it('renders only items matching the filter', () => {
            props.filterText = 'b';
            const items = unselectedItems().find('Item');

            expect(items.length).toEqual(1);
            expect(items.dive().text()).toEqual(
                expect.stringContaining('rainbow')
            );
        });
    });
});
