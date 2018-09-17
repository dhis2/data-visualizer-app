import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../App';
import Snackbar from '@material-ui/core/Snackbar';
import { getStubContext } from '../../../../../config/testsContext';

describe('App', () => {
    let props;
    let shallowApp;
    const app = () => {
        if (!shallowApp) {
            shallowApp = shallow(<App {...props} />, {
                context: getStubContext(),
            });
        }
        return shallowApp;
    };

    beforeEach(() => {
        props = {
            d2: {
                models: {
                    chart: {
                        get: () => {
                            return Promise.resolve('got a chart');
                        },
                    },
                },
            },
            baseUrl: undefined,
            snackbarOpen: false,
            snackbarMessage: '',
        };
        shallowApp = undefined;
    });

    it('renders a div', () => {
        expect(app().find('div').length).toBeGreaterThan(0);
    });

    it('renders a Snackbar', () => {
        const snackbar = app().find(Snackbar);
        expect(snackbar.length).toBeGreaterThan(0);
    });

    describe('Snackbar', () => {
        it('renders with correct "open" property', () => {
            props.snackbarOpen = true;
            expect(
                app()
                    .find(Snackbar)
                    .prop('open')
            ).toEqual(true);
        });
    });
});
