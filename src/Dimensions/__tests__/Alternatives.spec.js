import React from 'react';
import { shallow } from 'enzyme';
import List, { ListItem } from 'material-ui/List';
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
        props = {
            dimensions: [
                'Data',
                'Period',
                'Organisation Units',
                'Commodities',
                'Target vs Result',
                'Commoditest',
            ],
            searchFieldValue: '',
            onClick: jest.fn(),
        };
        shallowAlternatives = undefined;
    });
    it('renders 1 <List /> as the outermost component', () => {
        expect(alternatives().find(List).length).toBe(1);
    });

    it('the <List /> copmonent contains everything else', () => {
        const wrappingDiv = alternatives()
            .find(List)
            .first();
        expect(wrappingDiv.children()).toEqual(alternatives().children());
    });
    it('when "commodities" is typed, the corresponding dimension with matching characters are displayed', () => {
        props.searchFieldValue = 'commodities';
        expect(
            alternatives()
                .find(List)
                .children().length
        ).toBe(1);
    });
});
