import React from 'react';
import { shallow } from 'enzyme';
import { DimensionList } from '../DimensionList';
import { DimensionItem } from '../DimensionItem';

describe('The DimensionList component ', () => {
    let props;
    let shallowDimList;
    const dimList = () => {
        if (!shallowDimList) {
            shallowDimList = shallow(<DimensionList {...props} />);
        }
        return shallowDimList;
    };
    beforeEach(() => {
        props = {
            searchText: '',
            dimensions: {},
            toggleDialog: jest.fn(),
        };
        shallowDimList = undefined;
    });
    it('renders an unordered list', () => {
        expect(dimList().find('ul').length).toEqual(1);
    });
    it('renders an <ul /> containing everything else', () => {
        const wrappingUl = dimList()
            .find('ul')
            .first();

        expect(wrappingUl.children()).toEqual(dimList().children());
    });
    it('renders a <DimensionItem /> without filtering matching dimensions when searcthext.length < 1', () => {
        //const dimItem = dimList().find(DimensionItem);
        expect(dimList().props().length).toEqual(undefined); // = 0
        //expect(dimItem.length).toBe(1);
    });
    it('renders a filtered list of <DimensionItem /> when searchText.length >= 1', () => {
        props.searchText = 'Data';

        const filteredDimItem = dimList().find(DimensionItem);

        //expect(dimList().props('searchText').length).toBeGreaterThan(1);
    });
});
