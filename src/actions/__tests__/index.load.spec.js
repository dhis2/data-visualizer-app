import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as api from '../../api/visualization.js'
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

const uid = 'xyzpdq789ab'
const visualization = {
    id: uid,
    name: 'Original name',
    displayName: 'Original name',
    description: 'Original description',
    displayDescription: 'Original description',
    content: {
        type: 'chart',
        level: 'medium',
    },
    color: 'blue',
    subscribers: ['jklmn'],
}

const store = mockStore({
    current: visualization,
})

const ouLevels = {
    level: 2,
    id: '2nd-floor',
}

describe('index tDoLoadVisualization', () => {
    it('does not include subscribers in fetch request', () => {
        // eslint-disable-next-line no-import-assign, import/namespace
        api.apiFetchVisualization = jest
            .fn()
            .mockResolvedValue({ visualization })

        return store
            .dispatch(fromActions.tDoLoadVisualization({ id: uid, ouLevels }))
            .then(() => {
                expect(api.apiFetchVisualization).toHaveBeenCalledWith(
                    expect.objectContaining({
                        id: uid,
                    })
                )
                expect(api.apiFetchVisualization).toHaveBeenCalledWith(
                    expect.not.objectContaining({
                        withSubscribers: true,
                    })
                )
            })
    })
})
