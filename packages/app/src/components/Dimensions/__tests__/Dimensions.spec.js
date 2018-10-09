import React from 'react';
import { shallow } from 'enzyme';
import { Dimensions } from '../Dimensions';
import { DialogManager } from '../DialogManager';

describe('The Dimensions component ', () => {
    let props;
    let shallowDimensions;
    const dimensionsComponent = () => {
        if (!shallowDimensions) {
            shallowDimensions = shallow(<Dimensions {...props} />);
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

    it('does not  <DialogManager /> when state "dialogDim" is null', () => {
        const dialogManager = dimensionsComponent().find(DialogManager);

        expect(dimensionsComponent().state().dialogDimId).toEqual(null);
        expect(dialogManager.props().dialogIsOpen).toEqual(false);
    });
});
