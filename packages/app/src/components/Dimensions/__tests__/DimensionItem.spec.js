import React from 'react';
import { shallow } from 'enzyme';
import { DimensionItem } from '../DimensionItem';
import DimensionLabel from '../DimensionLabel';
import DimensionOptions from '../DimensionOptions';
import RecommendedIcon from '../RecommendedIcon';

describe('The DimensionItem component ', () => {
    let props;
    let shallowDimItem;
    const dimItem = () => {
        if (!shallowDimItem) {
            shallowDimItem = shallow(<DimensionItem {...props} />);
        }
        return shallowDimItem;
    };
    beforeEach(() => {
        props = {
            id: 'idString',
            name: '',
            isSelected: false,
            type: 'COLUMN',
        };
        shallowDimItem = undefined;
    });

    it('noop', () => {
        expect(1).toEqual(1);
    });

    it('renders a <li>', () => {
        expect(dimItem().find('li').length).toEqual(1);
    });

    it('renders a <li> containing everything else', () => {
        const wrappingLi = dimItem()
            .find('li')
            .first();

        expect(wrappingLi.children()).toEqual(dimItem().children());
    });

    it('renders a <DimensionLabel /> ', () => {
        const dimLabel = dimItem().find(DimensionLabel);
        expect(dimLabel.length).toEqual(1);
    });

    it('renders a <RecommendedIcon />', () => {
        const recommendedIcon = dimItem().find(RecommendedIcon);

        expect(recommendedIcon.length).toEqual(1);
    });

    it('renders a <DimensionOptions />', () => {
        const dimOptions = dimItem().find(DimensionOptions);

        expect(dimOptions.length).toEqual(1);
    });
});
