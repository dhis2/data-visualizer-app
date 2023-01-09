import { shallow } from 'enzyme'
import React from 'react'
import { getStubContext } from '../../../config/testsContext.js'
import * as actions from '../../actions/index.js'
import { CURRENT_AO_KEY } from '../../api/userDataStore.js'
import * as userDataStore from '../../api/userDataStore.js'
import history from '../../modules/history.js'
import * as ui from '../../modules/ui.js'
import { DEFAULT_CURRENT } from '../../reducers/current.js'
import { UnconnectedApp as App } from '../App.js'
import { Snackbar } from '../Snackbar/Snackbar.js'

jest.mock('@dhis2/analytics', () => ({
    apiFetchOrganisationUnitLevels: jest.fn(),
    getPredefinedDimensions: () => {},
    visTypeDisplayNames: {},
}))

jest.mock('../Visualization/Visualization', () => ({
    __esModule: true,
    Visualization: () => <div />,
}))

describe('App', () => {
    let props
    let shallowApp
    const app = () => {
        if (!shallowApp) {
            shallowApp = shallow(<App {...props} />, {
                context: getStubContext(),
            })
        }
        return shallowApp
    }

    beforeEach(() => {
        props = {
            d2: {
                models: {
                    chart: {
                        get: () => {
                            return Promise.resolve('got a chart')
                        },
                    },
                },
            },
            baseUrl: undefined,
            loadError: null,
            interpretations: [],
            current: DEFAULT_CURRENT,
            ui: { rightSidebarOpen: false },
            location: { pathname: '/' },
            settings: {
                rootOrganisationUnits: [
                    {
                        id: 'ROOT_ORGUNIT',
                        path: '/ROOT_ORGUNIT',
                    },
                ],
                keyAnalysisRelativePeriod: 'LAST_12_MONTHS',
            },

            addParentGraphMap: jest.fn(),
            setUiFromVisualization: jest.fn(),
            setCurrentFromUi: jest.fn(),
            clearVisualization: jest.fn(),
            clearCurrent: jest.fn(),
            clearAll: jest.fn(),
            addSettings: jest.fn(),
            setUser: jest.fn(),
            loadUserAuthority: jest.fn(),
            setDimensions: jest.fn(),
            addMetadata: jest.fn(),
            setVisualization: jest.fn(),
        }
        shallowApp = undefined

        /* eslint-disable no-import-assign, import/namespace */
        props.setVisualization = jest.fn()
        actions.clearVisualization = jest.fn()
        userDataStore.apiFetchAOFromUserDataStore = jest.fn()
        ui.getParentGraphMapFromVisualization = jest.fn()
        /* esling-enable no-import-assign, import/namespace */
    })

    afterEach(() => {
        shallowApp.instance().componentWillUnmount()
    })

    it('renders a div', () => {
        expect(app().find('div').length).toBeGreaterThan(0)
    })

    it('always renders a Snackbar', () => {
        expect(app().find(Snackbar)).toHaveLength(1)
    })

    describe('location pathname', () => {
        it('calls clearAll when location pathname is root', (done) => {
            props.location.pathname = '/'
            app()

            setTimeout(() => {
                expect(props.setVisualization).not.toHaveBeenCalled()
                expect(props.clearAll).toBeCalledTimes(1)
                done()
            })
        })

        it('calls setVisualization when location pathname has length', (done) => {
            props.location.pathname = '/twilightsparkle'
            app()

            setTimeout(() => {
                expect(props.setVisualization).toBeCalledTimes(1)
                expect(props.clearAll).not.toHaveBeenCalled()
                done()
            })
        })

        it('loads new visualization when pathname changes', (done) => {
            props.location.pathname = '/rarity'

            app()

            setTimeout(() => {
                history.push('/rainbowdash')
                expect(props.setVisualization).toBeCalledTimes(2)

                done()
            })
        })

        it('reloads visualization when opening the same visualization', (done) => {
            props.location.pathname = '/fluttershy'

            app()

            setTimeout(() => {
                history.replace(
                    {
                        pathname: '/fluttershy',
                    },
                    { isOpening: true }
                )
                expect(props.setVisualization).toBeCalledTimes(2)

                done()
            })
        })

        it('reloads visualization when same pathname pushed when saving', (done) => {
            props.location.pathname = '/fluttershy'

            app()

            setTimeout(() => {
                history.replace(
                    {
                        pathname: '/fluttershy',
                    },
                    { isSaving: true }
                )
                expect(props.setVisualization).toBeCalledTimes(2)

                done()
            })
        })

        it('loads AO from user data store if id equals to "currentAnalyticalObject"', (done) => {
            props.location.pathname = '/' + CURRENT_AO_KEY

            app()

            setTimeout(() => {
                expect(
                    userDataStore.apiFetchAOFromUserDataStore
                ).toBeCalledTimes(1)

                expect(props.addParentGraphMap).toBeCalledTimes(1)
                expect(props.clearVisualization).toBeCalledTimes(1)
                expect(props.clearCurrent).toBeCalledTimes(1)
                expect(props.setUiFromVisualization).toBeCalledTimes(1)
                expect(props.setCurrentFromUi).toBeCalledTimes(1)

                done()
            })
        })

        describe('interpretation id in pathname', () => {
            beforeEach(() => {
                props.location.pathname = `/applejack/interpretation/xyz123`
            })

            it('does not reload visualization when interpretation toggled', (done) => {
                app()

                setTimeout(() => {
                    history.push('/applejack')
                    expect(props.setVisualization).toBeCalledTimes(1)

                    done()
                })
            })
        })
    })
})
