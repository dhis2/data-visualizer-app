import {
    AXIS_ID_COLUMNS,
    AXIS_ID_ROWS,
    AXIS_ID_FILTERS,
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    DIMENSION_ID_ORGUNIT,
} from '@dhis2/analytics'
import { DEFAULT_CURRENT } from '../../reducers/current.js'
import { getAxesFromUi, getSingleValueCurrentFromUi } from '../current.js'

const dxItem1id = 'dxItem1id'
const dxItem2id = 'dxItem2id'
const dxItems = [dxItem1id, dxItem2id]

const otherId = 'other'
const otherItemId = 'otherItem1id'
const otherItems = [otherItemId]

const peItemId = 'peItem1id'
const peItems = [peItemId]

const ouItemId = 'ouItem1id'
const ouItems = [ouItemId]

const emptyId = 'empty'

const ui = {
    layout: {
        [AXIS_ID_COLUMNS]: [DIMENSION_ID_DATA, otherId],
        [AXIS_ID_ROWS]: [DIMENSION_ID_PERIOD, emptyId],
        [AXIS_ID_FILTERS]: [DIMENSION_ID_ORGUNIT],
    },
    itemsByDimension: {
        [DIMENSION_ID_DATA]: dxItems,
        [otherId]: otherItems,
        [DIMENSION_ID_PERIOD]: peItems,
        [DIMENSION_ID_ORGUNIT]: ouItems,
    },
    options: {},
}

describe('getAxesFromUi', () => {
    it('should return a layout object (columns, rows, filters) with dimensions (id and item objects) that are not empty', () => {
        const expectedState = {
            columns: [
                {
                    dimension: DIMENSION_ID_DATA,
                    items: [{ id: dxItem1id }, { id: dxItem2id }],
                },
                { dimension: otherId, items: [{ id: otherItemId }] },
            ],
            rows: [
                { dimension: DIMENSION_ID_PERIOD, items: [{ id: peItemId }] },
            ],
            filters: [
                { dimension: DIMENSION_ID_ORGUNIT, items: [{ id: ouItemId }] },
            ],
        }
        const actualState = getAxesFromUi(ui)

        expect(actualState).toEqual(expectedState)
    })
})

describe('getSingleValueCurrentFromUi', () => {
    it('should return only the 1st item in dx', () => {
        const expectedState = {
            columns: [
                { dimension: DIMENSION_ID_DATA, items: [{ id: dxItem1id }] },
            ],
            filters: [
                { dimension: DIMENSION_ID_ORGUNIT, items: [{ id: ouItemId }] },
                { dimension: otherId, items: [{ id: otherItemId }] },
                { dimension: DIMENSION_ID_PERIOD, items: [{ id: peItemId }] },
            ],
            rows: [],
            reportingParams: {
                organisationUnit: undefined,
                reportingPeriod: undefined,
                parentOrganisationUnit: undefined,
                grandParentOrganisationUnit: undefined,
            },
            type: 'SINGLEVALUE',
        }

        ui.type = 'SINGLEVALUE'

        const actualState = getSingleValueCurrentFromUi(DEFAULT_CURRENT, {
            value: ui,
        })

        expect(actualState).toEqual(expectedState)
    })
})
