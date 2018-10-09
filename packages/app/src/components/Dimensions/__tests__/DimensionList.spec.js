import React from 'react';
import { shallow } from 'enzyme';
import { DimensionList } from '../DimensionList';

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
            dimensions: {},
            searchText: '',
            selected: [],
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
});
