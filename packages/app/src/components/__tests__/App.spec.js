import React from 'react'
import { shallow } from 'enzyme'
import { App } from '../App'
import Snackbar from '../Snackbar/Snackbar'
import * as actions from '../../actions/'
import history from '../../modules/history'

import { getStubContext } from '../../../../../config/testsContext'
import { CURRENT_AO_KEY } from '../../api/userDataStore'
import * as userDataStore from '../../api/userDataStore'
import * as ui from '../../modules/ui'
import { DEFAULT_CURRENT } from '../../reducers/current'

jest.mock('../Visualization/Visualization', () => () => <div />)

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
                rootOrganisationUnit: {
                    id: 'ROOT_ORGUNIT',
                    path: '/ROOT_ORGUNIT',
                },
                keyAnalysisRelativePeriod: 'LAST_12_MONTHS',
            },

            addParentGraphMap: jest.fn(),
            setUiFromVisualization: jest.fn(),
            setCurrentFromUi: jest.fn(),
            clearVisualization: jest.fn(),
            clearCurrent: jest.fn(),
        }
        shallowApp = undefined

        actions.tDoLoadVisualization = jest.fn()
        actions.clearVisualization = jest.fn()
        userDataStore.apiFetchAOFromUserDataStore = jest.fn()
        ui.getParentGraphMapFromVisualization = jest.fn()
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
        it('calls clear visualization action when location pathname is root', done => {
            props.location.pathname = '/'
            app()

            setTimeout(() => {
                expect(actions.tDoLoadVisualization).not.toHaveBeenCalled()
                expect(actions.clearVisualization).toBeCalledTimes(1)
                done()
            })
        })

        it('calls load visualization action when location pathname has length', done => {
            props.location.pathname = '/twilightsparkle'
            app()

            setTimeout(() => {
                expect(actions.tDoLoadVisualization).toBeCalledTimes(1)
                expect(actions.clearVisualization).not.toHaveBeenCalled()
                done()
            })
        })

        it('loads new visualization when pathname changes', done => {
            props.location.pathname = '/rarity'

            app()

            setTimeout(() => {
                history.push('/rainbowdash')
                expect(actions.tDoLoadVisualization).toBeCalledTimes(2)

                done()
            })
        })

        it('reloads visualization when same pathname pushed when saving', done => {
            props.location.pathname = '/fluttershy'

            app()

            setTimeout(() => {
                history.replace({
                    pathname: '/fluttershy',
                    state: { isSaving: true },
                })
                expect(actions.tDoLoadVisualization).toBeCalledTimes(2)

                done()
            })
        })

        it('loads AO from user data store if id equals to "currentAnalyticalObject"', done => {
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

            it('does not reload visualization when interpretation toggled', done => {
                app()

                setTimeout(() => {
                    history.push('/applejack')
                    expect(actions.tDoLoadVisualization).toBeCalledTimes(1)

                    done()
                })
            })
        })
    })
})
