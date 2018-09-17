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

    it('renders <DimensionItem /> without filtering matching dimensions when searcthext.length < 1', () => {
        props.searchText = '';

        //expect(dimList().props().searchText.length).toEqual(0);
        //expect(dimList().instance().filterMatchingDimensions).tHoHaveBeenCalledTimes(0)
    });

    it('renders a filtered list of <DimensionItem /> when searchText.length >= 1', () => {
        props.searchText = 'Data';

        //expect(dimList().props().searchText.length).toEqual(4);
        //expect(dimList().instance().filterMatchingDimensions).tHoHaveBeenCalledTimes(1)
    });
});
