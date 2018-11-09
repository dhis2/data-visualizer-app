import React from 'react';
import { shallow } from 'enzyme';
import { TitleBar } from '../TitleBar';
import * as formatDate from '../../../modules/formatDate';

const formattedDate = 'the future';

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
            interpretation: {},
            uiLocale: 'en',
        };
        shallowTitleBar = undefined;

        formatDate.default = jest.fn().mockReturnValue(formattedDate);
    });

    it('renders nothing if no title', () => {
        props.title = null;
        expect(titleBar().find('div')).toHaveLength(0);
    });

    it('renders a <div>', () => {
        expect(titleBar().find('div')).toHaveLength(1);
    });

    it('renders a <div> containing everything else', () => {
        const wrappingDiv = titleBar()
            .find('div')
            .first();

        expect(wrappingDiv.children()).toEqual(titleBar().children());
    });

    it('renders a <span> with the title', () => {
        expect(titleBar().find('span')).toHaveLength(1);
        expect(
            titleBar()
                .find('span')
                .text()
        ).toEqual(props.title);
    });

    it('renders an "*" when isDirty prop is true', () => {
        props.title = 'edited title';
        props.isDirty = true;

        expect(
            titleBar()
                .find('span')
                .text()
        ).toEqual(`* ${props.title}`);
    });

    describe('with interpretation', () => {
        beforeEach(() => {
            props.interpretation = {
                created: 'eons ago',
            };
        });

        it('renders the interpretation info', () => {
            const spans = titleBar().find('span');

            expect(spans).toHaveLength(2);

            expect(spans.last().text()).toEqual(
                `Viewing interpretation from ${formattedDate}`
            );
        });
    });
});
