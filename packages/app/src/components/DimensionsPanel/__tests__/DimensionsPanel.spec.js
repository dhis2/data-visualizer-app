import React from 'react';
import { shallow } from 'enzyme';
import { Dimensions } from '../DimensionsPanel';
import DimensionList from '../List/DimensionList';

describe('The Dimensions component ', () => {
    let shallowDimensions;
    const dimensionsComponent = () => {
        if (!shallowDimensions) {
            shallowDimensions = shallow(<Dimensions />);
        }
        return shallowDimensions;
    };

    beforeEach(() => {
        shallowDimensions = undefined;
    });

    it('renders a div', () => {
        expect(dimensionsComponent().find('div').length).toEqual(1);
    });

    it('renders a div containing everything else', () => {
        const wrappingDiv = dimensionsComponent()
            .find('div')
            .first();

        expect(wrappingDiv.children()).toEqual(
            dimensionsComponent().children()
        );
    });

    it('renders a DimensionList with the correct prop', () => {
        const dimensionsComp = dimensionsComponent();
        dimensionsComp.setState({ filterText: 'filteredText' });

        const filteredList = dimensionsComp.find(DimensionList).first();

        expect(filteredList.props().filterText).toEqual(
            dimensionsComp.state().filterText
        );
    });
});
