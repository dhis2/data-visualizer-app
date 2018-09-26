import React from 'react';
import { shallow } from 'enzyme';
import { SelectedItems } from '../SelectedItems';

describe('The SelectedItems component ', () => {
    let props;
    let shallowSelectedItems;

    const selectedContainer = () => {
        if (!shallowSelectedItems) {
            shallowSelectedItems = shallow(<SelectedItems {...props} />);
        }
        return shallowSelectedItems;
    };

    beforeEach(() => {
        props = {
            selectedItems: {},
            removeSelected: jest.fn(),
            onDeselectAllClick: jest.fn(),
            onUnAssignClick: jest.fn(),
        };
        shallowSelectedItems = undefined;
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
