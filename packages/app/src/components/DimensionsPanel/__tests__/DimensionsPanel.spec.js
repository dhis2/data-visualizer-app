import React from 'react';
import { shallow } from 'enzyme';
import { DimensionsPanel } from '@dhis2/d2-ui-analytics';

import { Dimensions } from '../DimensionsPanel';

describe('The Dimensions component ', () => {
    let shallowDimensions;
    let props;
    const dimensionsComponent = () => {
        if (!shallowDimensions) {
            shallowDimensions = shallow(<Dimensions {...props} />);
        }
        return shallowDimensions;
    };

    beforeEach(() => {
        shallowDimensions = undefined;
        props = {
            dimensions: {},
        };
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

    it('renders a DimensionsPanel with the correct prop', () => {
        const dimensionsComp = dimensionsComponent();

        expect(dimensionsComp.find(DimensionsPanel).length).toEqual(1);
    });
});
