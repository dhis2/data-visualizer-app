import React from 'react';
import { shallow } from 'enzyme';
import { BlankCanvas, defaultCanvasMessage } from '../BlankCanvas';

describe('BlankCanvas', () => {
    let props;
    let shallowBlankCanvas;
    const canvas = () => {
        if (!shallowBlankCanvas) {
            shallowBlankCanvas = shallow(<BlankCanvas {...props} />);
        }
        return shallowBlankCanvas;
    };

    beforeEach(() => {
        props = {
            error: null,
        };
        shallowBlankCanvas = undefined;
    });

    it('renders a div', () => {
        expect(canvas().find('div').length).toBeGreaterThan(0);
    });

    it('renders the default message', () => {
        expect(
            canvas()
                .find('span')
                .text()
        ).toEqual(defaultCanvasMessage);
    });

    it('renders the provided error message', () => {
        const theError = 'Error 718: I am not a teapot';
        props.error = theError;
        expect(
            canvas()
                .find('span')
                .text()
        ).toEqual(theError);
    });
});
