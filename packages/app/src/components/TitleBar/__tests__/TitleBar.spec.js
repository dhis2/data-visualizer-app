import React from 'react';
import { shallow } from 'enzyme';
import {
    TitleBar,
    STATE_EMPTY,
    STATE_SAVED,
    STATE_UNSAVED,
    STATE_DIRTY,
    TITLE_UNSAVED,
    TITLE_DIRTY,
} from '../TitleBar';

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
            titleState: STATE_EMPTY,
            titleText: null,
            interpretationDate: null,
        };

        shallowTitleBar = undefined;
    });

    it('renders "empty" state', () => {
        expect(titleBar().find('div')).toHaveLength(0);
    });

    it('renders "unsaved" state', () => {
        props.titleState = STATE_UNSAVED;
        props.titleText = TITLE_UNSAVED;
        expect(titleBar().find('div')).toHaveLength(2);
        expect(
            titleBar()
                .find('div')
                .first()
                .text()
        ).toEqual(TITLE_UNSAVED);
    });

    it('renders "saved" state', () => {
        props.titleState = STATE_SAVED;
        props.titleText = 'Yall';
        expect(titleBar().find('div')).toHaveLength(2);
        expect(
            titleBar()
                .find('div')
                .first()
                .text()
        ).toEqual('Yall');
    });

    it('renders "dirty" state', () => {
        props.titleState = STATE_DIRTY;
        props.titleText = 'Yall';
        expect(titleBar().find('div')).toHaveLength(3);
        expect(
            titleBar()
                .find('div')
                .first()
                .text()
        ).toEqual(`Yall- ${TITLE_DIRTY}`);
    });

    it('renders a <div> containing everything else', () => {
        const wrappingDiv = titleBar()
            .find('div')
            .first();

        expect(wrappingDiv.children()).toEqual(titleBar().children());
    });

    it('renders the interpretation date', () => {
        props.titleState = STATE_SAVED;
        props.titleText = 'Yall';
        props.interpretationDate = 'aeons ago';
        expect(titleBar().find('div')).toHaveLength(3);
        expect(
            titleBar()
                .find('div')
                .last()
                .text()
        ).toEqual(`Viewing interpretation from ${props.interpretationDate}`);
    });
});
