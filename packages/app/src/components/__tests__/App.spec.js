import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../App';
import Snackbar from '../Snackbar/Snackbar';
import Visualization from '../Visualization/Visualization';
import * as actions from '../../actions/';
import history from '../../modules/history';

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
            loadError: null,
            current: {},
            ui: { rightSidebarOpen: false },
            location: { pathname: '/' },
            settings: {
                rootOrganisationUnit: {
                    id: 'ROOT_ORGUNIT',
                    path: '/ROOT_ORGUNIT',
                },
                keyAnalysisRelativePeriod: 'LAST_12_MONTHS',
            },
        };
        shallowApp = undefined;

        actions.tDoLoadVisualization = jest.fn();
        actions.clearVisualization = jest.fn();
        actions.fromUi.acSetUiInterpretation = jest.fn();
        actions.fromUi.acOpenUiRightSidebarOpen = jest.fn();
    });

    afterEach(() => {
        shallowApp.instance().componentWillUnmount();
    });

    it('renders a div', () => {
        expect(app().find('div').length).toBeGreaterThan(0);
    });

    it('does not render a Visualization component when current is not populated', () => {
        expect(app().find(Visualization).length).toEqual(0);
    });

    it('renders Visualization component when current is populated', () => {
        props.current = { visProp: {} };

        expect(app().find(Visualization).length).toBeGreaterThan(0);
    });

    it('renders a Snackbar', () => {
        const snackbar = app().find(Snackbar);
        expect(snackbar.length).toBeGreaterThan(0);
    });

    describe('location pathname', () => {
        it('calls clear visualization action when location pathname is root', done => {
            props.location.pathname = '/';
            app();

            setTimeout(() => {
                expect(actions.tDoLoadVisualization).not.toHaveBeenCalled();
                expect(actions.clearVisualization).toBeCalledTimes(1);
                done();
            });
        });

        it('calls load visualization action when location pathname has length', done => {
            props.location.pathname = '/twilightsparkle';
            app();

            setTimeout(() => {
                expect(actions.tDoLoadVisualization).toBeCalledTimes(1);
                expect(
                    actions.fromUi.acSetUiInterpretation
                ).not.toHaveBeenCalled();
                expect(actions.clearVisualization).not.toHaveBeenCalled();
                done();
            });
        });

        it('loads new visualization when pathname changes', done => {
            props.location.pathname = '/rarity';

            app();

            setTimeout(() => {
                history.push('/rainbowdash');
                expect(actions.tDoLoadVisualization).toBeCalledTimes(2);

                done();
            });
        });

        it('reloads visualization when same pathname pushed', done => {
            props.location.pathname = '/fluttershy';

            app();

            setTimeout(() => {
                history.replace('/fluttershy');
                expect(actions.tDoLoadVisualization).toBeCalledTimes(2);

                done();
            });
        });

        describe('interpretation id in pathname', () => {
            beforeEach(() => {
                props.location.pathname = `/applejack/interpretation/xyz123`;
            });

            it('does not reload visualization when interpretation toggled', done => {
                app();

                setTimeout(() => {
                    history.push('/applejack');
                    expect(actions.tDoLoadVisualization).toBeCalledTimes(1);

                    done();
                });
            });

            it('calls setUiInterpretation action', done => {
                const interpId = 'xyzpdq';
                props.location.pathname = `/spike/interpretation/${interpId}`;
                app();

                setTimeout(() => {
                    expect(actions.tDoLoadVisualization).toBeCalledTimes(1);
                    expect(
                        actions.fromUi.acSetUiInterpretation
                    ).toBeCalledTimes(1);
                    expect(
                        actions.fromUi.acSetUiInterpretation
                    ).toHaveBeenCalledWith({ id: interpId });
                    expect(
                        actions.fromUi.acOpenUiRightSidebarOpen
                    ).toBeCalledTimes(1);
                    expect(actions.clearVisualization).not.toHaveBeenCalled();
                    done();
                });
            });
        });
    });
});
