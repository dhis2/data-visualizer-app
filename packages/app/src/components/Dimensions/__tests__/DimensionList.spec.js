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
            dimensions: {
                id1: { id: 'id1', name: 'name1' },
                id2: { id: 'id2', name: 'name2' },
                id3: { id: 'id3', name: 'name3' },
            },
            filterText: '',
            selectedIds: [],
        };
        shallowDimList = undefined;
    });

    it('renders an unordered list', () => {
        expect(dimList().find('ul').length).toEqual(1);
    });

    it('renders an unordered list in a wrapper', () => {
        expect(
            dimList()
                .find('ul')
                .first()
        ).toEqual(
            dimList()
                .find('div')
                .first()
                .children()
        );
    });

    it('renders an unfiltered list if prop filterText have length < 1', () => {
        const unfiltered = dimList()
            .find('ul')
            .first();

        expect(props.filterText.length).toBeLessThan(1);
        expect(unfiltered.children().length).toEqual(
            Object.keys(props.dimensions).length
        );
    });

    it('renders a filtered list if prop filterText have length > 1 ', () => {
        props.filterText = 'name3';

        const unfiltered = dimList()
            .find('ul')
            .first();

        expect(props.filterText.length).toBeGreaterThan(1);
        expect(unfiltered.children().length).toEqual(1);
    });
});
