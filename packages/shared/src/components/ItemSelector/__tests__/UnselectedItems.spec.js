import React from 'react';
import { shallow } from 'enzyme';
import { UnselectedItems } from '../UnselectedItems';

describe('UnselectedItems component ', () => {
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

    it('matches the snapshot when list has items', () => {
        props.items = [
            {
                id: 'rb',
                name: 'rainbow',
            },
            { id: 'rr', name: 'rarity' },
        ];
        expect(unselectedItems()).toMatchSnapshot();
    });
});
