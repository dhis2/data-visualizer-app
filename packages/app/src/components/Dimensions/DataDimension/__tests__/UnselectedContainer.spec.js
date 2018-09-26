import React from 'react';
import { shallow } from 'enzyme';
import { UnselectedContainer } from '../UnselectedContainer';

describe('The UnselectedContainer component ', () => {
    let props;
    let shallowUnselectedContainer;
    const unSelectedContainer = () => {
        if (!shallowUnselectedContainer) {
            shallowUnselectedContainer = shallow(
                <UnselectedContainer {...props} />
            );
        }
        return shallowUnselectedContainer;
    };

    beforeEach(() => {
        props = {
            unSelectedItems: {},
            onGroupChange: jest.fn(),
            onSelectAllClick: jest.fn(),
            onAssignClick: jest.fn(),
        };
        shallowUnselectedContainer = undefined;
    });

    it('renders a div ', () => {
        expect(
            unSelectedContainer()
                .find('div')
                .first().length
        ).toEqual(1);
    });

    it('renders a div containing everything else', () => {
        const wrappingDiv = unSelectedContainer()
            .find('div')
            .first();
        expect(wrappingDiv.children()).toEqual(
            unSelectedContainer().children()
        );
    });

    /*it('receives the correct props', () => {
     
    });*/
});
