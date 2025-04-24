import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as api from '../../api/visualization.js'
import * as history from '../../modules/history.js'
import * as selectors from '../../reducers/settings.js'
import DataEngineMock from '../__mocks__/DataEngine.js'
import * as fromActions from '../index.js'

const dataEngineMock = new DataEngineMock()
const middlewares = [thunk.withExtraArgument(dataEngineMock)]
const mockStore = configureMockStore(middlewares)

const rootOrganisationUnits = ['abc123']
const relativePeriod = 'xyzpdq'
const digitGroupSeparator = 'COMMA'
/* eslint-disable no-import-assign, import/namespace */
selectors.sGetRootOrgUnits = () => rootOrganisationUnits
selectors.sGetRelativePeriod = () => relativePeriod
selectors.sGetSettingsDigitGroupSeparator = () => digitGroupSeparator
jest.mock('@dhis2/analytics', () => ({
    ...jest.requireActual('@dhis2/analytics'),
    apiFetchOrganisationUnitLevels: () =>
        Promise.resolve([
            {
                level: 2,
                id: '2nd-floor',
            },
        ]),
    convertOuLevelsToUids: (ouLevels, vis) => vis,
    preparePayloadForSave: ({ visualization, name, description }) => ({
        ...visualization,
        name,
        description,
    }),
}))
/* eslint-enable no-import-assign, import/namespace */

const uid = 1

const vis = {
    id: uid,
    content: 'hey',
}

const extraParams = { name: 'test', description: 'test' }

const store = mockStore({
    current: vis,
})

// history function mocks
history.default.push = jest.fn()
history.default.replace = jest.fn()

describe('index tDoSaveVisualization', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.resetAllMocks()
    })

    it('replaces the location in history on successful save', () => {
        // eslint-disable-next-line no-import-assign, import/namespace
        api.apiSaveVisualization = jest.fn().mockResolvedValue({
            status: 'OK',
            response: {
                uid,
            },
        })
        const expectedVis = {
            ...vis,
            ...extraParams,
        }

        return store
            .dispatch(fromActions.tDoSaveVisualization(extraParams, false))
            .then(() => {
                expect(api.apiSaveVisualization).toHaveBeenCalled()
                expect(api.apiSaveVisualization).toHaveBeenCalledWith(
                    dataEngineMock,
                    expectedVis
                )
                expect(history.default.replace).toHaveBeenCalled()
                expect(history.default.replace).toHaveBeenCalledWith(
                    { pathname: `/${uid}` },
                    { isSaving: true }
                )
            })
    })

    it('pushes a new location in history on successful save as', () => {
        const newUid = 2

        // eslint-disable-next-line no-import-assign, import/namespace
        api.apiSaveVisualization = jest.fn().mockResolvedValue({
            status: 'OK',
            response: {
                uid: newUid,
            },
        })

        const expectedVis = {
            ...vis,
            id: undefined,
            ...extraParams,
        }

        return store
            .dispatch(fromActions.tDoSaveVisualization(extraParams, true))
            .then(() => {
                expect(api.apiSaveVisualization).toHaveBeenCalled()
                expect(api.apiSaveVisualization).toHaveBeenCalledWith(
                    dataEngineMock,
                    expectedVis
                )
                expect(history.default.push).toHaveBeenCalled()
                expect(history.default.push).toHaveBeenCalledWith(
                    { pathname: `/${newUid}` },
                    { isSaving: true }
                )
            })
    })
})
