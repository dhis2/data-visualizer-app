import React from 'react';
import { shallow } from 'enzyme';
import List from 'material-ui-next/List';
import Alternatives from '../Alternatives';

describe('The Alternatives component', () => {
    let props;
    let shallowAlternatives;
    const alternatives = () => {
        if (!shallowAlternatives) {
            shallowAlternatives = shallow(<Alternatives {...props} />);
        }
        return shallowAlternatives;
    };
    beforeEach(() => {
        props = {};
        shallowAlternatives = undefined;
    });
    it('renders 1 <List /> as the outermost component', () => {
        expect(alternatives().find(List).length).toBe(1);
    });

    /* it('renders a <List /> containing everything else', () => {
        const wrappingDiv = alternatives()
            .find(List)
            .first();
        expect(wrappingDiv.children()).toEqual(alternatives().children());
    });*/
});
