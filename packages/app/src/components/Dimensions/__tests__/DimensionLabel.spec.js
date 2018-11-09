import React from 'react';
import { shallow } from 'enzyme';
import { DimensionLabel } from '../DimensionLabel';

describe('The DimensionList component ', () => {
    let props;
    let shallowDimLabel;
    const dimLabel = () => {
        if (!shallowDimLabel) {
            shallowDimLabel = shallow(<DimensionLabel {...props} />);
        }
        return shallowDimLabel;
    };
    beforeEach(() => {
        props = {
            openDialog: jest.fn(),
            id: 'idstring',
            isSelected: false,
            isDeactivated: false,
            name: 'labelname',
            removeDimension: jest.fn(),
            children: [],
        };
        shallowDimLabel = undefined;
    });

    it('noop', () => {
        expect(1).toEqual(1);
    });

    it('renders a <div>', () => {
        expect(
            dimLabel()
                .find('div')
                .first().length
        ).toEqual(1);
    });

    it('renders a <div> containing everything else', () => {
        const wrappingDiv = dimLabel()
            .find('div')
            .first();

        expect(wrappingDiv.children()).toEqual(dimLabel().children());
    });
});
