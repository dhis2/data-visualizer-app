import React from 'react';
import { shallow } from 'enzyme';
import { DimensionItem } from '../DimensionItem';
//import { DimensionLabel } from '../DimensionLabel';
//import DimensionOptions from '../DimensionOptions';
//import { RecommendedIcon } from '../icons';

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
            id: 0,
            key: false,
            displayName: 'dimTestId',
            isSelected: false,
            toggleDialog: jest.fn(),
            isRecommended: false,
        };
        shallowDimItem = undefined;
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

    /*it('renders a <DimensionOptions /> component when onMouseOver or onFocus is equal to true', () => {
        dimItem().state().mouseOver = true;
        const dimOptions = dimItem().find(DimensionOptions);

        expect(dimOptions.length).toEqual(1);
    });*/

    /*it('renders a <RecommendedIcon /> when prop isRecommended is equal to true', () => {
        const recommendedIcon = dimItem().find(DimensionItem);
        expect(recommendedIcon.length).toBe(1);
    });*/
});
