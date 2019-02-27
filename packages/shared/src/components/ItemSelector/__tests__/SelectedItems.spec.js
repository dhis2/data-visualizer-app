import React from 'react';
import { shallow, mount } from 'enzyme';
import { SelectedItems } from '../SelectedItems';

describe('The SelectedItems component', () => {
    let props;
    let selectedItemsWrapper;

    const selectedItems = () => {
        if (!selectedItemsWrapper) {
            selectedItemsWrapper = mount(<SelectedItems {...props} />);
        }
        return selectedItemsWrapper;
    };

    beforeEach(() => {
        props = {
            items: [],
            onDeselect: jest.fn(),
            onReorder: jest.fn(),
        };
        selectedItemsWrapper = undefined;
    });

    it('matches the snapshot when list is empty', () => {
        expect(selectedItems()).toMatchSnapshot();
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
        it('matches the snapshot with list has items', () => {
            expect(selectedItems()).toMatchSnapshot();
        });

        it('triggers onDeselect when item double-clicked', () => {
            selectedItems()
                .find('li')
                .first()
                .simulate('doubleClick');

            expect(props.onDeselect).toHaveBeenCalled();
            expect(props.onDeselect).toHaveBeenCalledWith(['rb']);
        });

        it('triggers onDeselect when Deselect All button clicked', () => {
            selectedItems()
                .find('SelectButton')
                .first()
                .simulate('click');

            expect(props.onDeselect).toHaveBeenCalled();
            expect(props.onDeselect).toHaveBeenCalledWith(['rb', 'rr']);
        });

        it('triggers onDeselect when "unassign" button clicked', () => {
            const list = selectedItems();

            list.find('Item')
                .first()
                .simulate('click', false, false, 0, 'rb');

            const onClickFn = list.find('ArrowButton').prop('onClick');

            onClickFn(); // enzyme simulate was not working

            expect(props.onDeselect).toHaveBeenCalled();
            expect(props.onDeselect).toHaveBeenCalledWith(['rb']);
        });
    });
});
