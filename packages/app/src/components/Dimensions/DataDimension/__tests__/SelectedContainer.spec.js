import React from 'react';
import { shallow } from 'enzyme';
import { SelectedContainer } from '../SelectedContainer';

describe('The SelectedContainer component ', () => {
    let props;
    let shallowContainer;

    const selectedContainer = () => {
        if (!shallowContainer) {
            shallowContainer = shallow(<SelectedContainer {...props} />);
        }
        return shallowContainer;
    };

    beforeEach(() => {
        props = {
            selectedItems: {},
            removeSelected: jest.fn(),
            onDeselectAllClick: jest.fn(),
            onUnAssignClick: jest.fn(),
        };
        shallowContainer = undefined;
    });

    it('renders a div ', () => {
        expect(
            selectedContainer()
                .find('div')
                .first().length
        ).toEqual(1);
    });

    it('renders a div containing everything else', () => {
        const wrappingDiv = selectedContainer()
            .find('div')
            .first();
        expect(wrappingDiv.children()).toEqual(selectedContainer().children());
    });
});
