import React from 'react';
import { shallow } from 'enzyme';
import { TitleBar } from '../TitleBar';

describe('TitleBar component', () => {
    let props;
    let shallowTitleBar;

    const titleBar = () => {
        if (!shallowTitleBar) {
            shallowTitleBar = shallow(<TitleBar {...props} />);
        }
        return shallowTitleBar;
    };

    beforeEach(() => {
        props = {
            title: 'test title',
            isDirty: false,
        };
        shallowTitleBar = undefined;
    });

    it('renders a <div>', () => {
        expect(
            titleBar()
                .find('div')
                .first().length
        ).toEqual(1);
    });

    it('renders a <div> containing everything else', () => {
        const wrappingDiv = titleBar()
            .find('div')
            .first();

        expect(wrappingDiv.children()).toEqual(titleBar().children());
    });

    it('renders a <span> with the title', () => {
        expect(
            titleBar()
                .find('span')
                .first().length
        ).toEqual(1);

        expect(
            titleBar()
                .find('span')
                .text()
        ).toEqual(props.title);
    });

    it('renders an "*" when isDirty prop is true', () => {
        props = {
            title: 'edited title',
            isDirty: true,
        };

        expect(
            titleBar()
                .find('span')
                .text()
        ).toEqual(`* ${props.title}`);
    });
});
