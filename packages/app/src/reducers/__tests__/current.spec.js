import {
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    DIMENSION_ID_ORGUNIT,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
    VIS_TYPE_COLUMN,
} from '@dhis2/analytics'

import options from '../../modules/options'
import { getOptionsFromUi } from '../../modules/current'
import reducer, {
    DEFAULT_CURRENT,
    SET_CURRENT,
    SET_CURRENT_FROM_UI,
    CLEAR_CURRENT,
} from '../current'

describe('reducer: current', () => {
    it('should return the default state', () => {
        const actualState = reducer(undefined, { type: 'NO_MATCH' })

        expect(actualState).toEqual(DEFAULT_CURRENT)
    })

    it('SET_CURRENT: should set the new current', () => {
        const current = {}
        const actualState = reducer(undefined, {
            type: SET_CURRENT,
            value: current,
        })

        expect(current).toEqual(actualState)
    })

    it('CLEAR_CURRENT should set the default state', () => {
        const actualState = reducer(
            { currentVal: 123 },
            { type: CLEAR_CURRENT }
        )

        expect(actualState).toEqual(DEFAULT_CURRENT)
    })

    it('SET_CURRENT_FROM_UI: should set the current from the ui state section', () => {
        const ui = {
            type: VIS_TYPE_COLUMN,
            layout: {
                columns: [DIMENSION_ID_DATA],
                rows: [DIMENSION_ID_ORGUNIT],
                filters: [DIMENSION_ID_PERIOD],
            },
            itemsByDimension: {
                [DIMENSION_ID_DATA]: ['dxItemId1', 'dxItemId2'],
                [DIMENSION_ID_PERIOD]: ['peItemId1'],
                [DIMENSION_ID_ORGUNIT]: ['ouItemId1', 'ouItemId2'],
            },
            options,
        }

        const expectedState = {
            ...getOptionsFromUi(ui),
            type: ui.type,
            columns: [
                {
                    dimension: DIMENSION_ID_DATA,
                    items: [{ id: 'dxItemId1' }, { id: 'dxItemId2' }],
                },
            ],
            rows: [
                {
                    dimension: DIMENSION_ID_ORGUNIT,
                    items: [{ id: 'ouItemId1' }, { id: 'ouItemId2' }],
                },
            ],
            filters: [
                {
                    dimension: DIMENSION_ID_PERIOD,
                    items: [{ id: 'peItemId1' }],
                },
            ],
            series: [],
        }

        const actualState = reducer(undefined, {
            type: SET_CURRENT_FROM_UI,
            value: ui,
        })

        expect(actualState).toEqual(expectedState)
    })

    it('SET_CURRENT_FROM_UI: should set current on a year on year format from the ui state section', () => {
        const ui = {
            type: VIS_TYPE_YEAR_OVER_YEAR_LINE,
            options,
            layout: {
                columns: [],
                rows: [],
                filters: [DIMENSION_ID_DATA, DIMENSION_ID_ORGUNIT],
            },
            itemsByDimension: {
                [DIMENSION_ID_DATA]: ['dxItemId1', 'dxItemId2'],
                [DIMENSION_ID_ORGUNIT]: ['ouItemId1', 'ouItemId2'],
            },
            yearOverYearSeries: ['LAST_5_YEARS'],
            yearOverYearCategory: ['MONTHS_THIS_YEAR'],
        }
        const expectedState = {
            ...getOptionsFromUi(ui),
            type: ui.type,
            columns: [
                {
                    dimension: DIMENSION_ID_DATA,
                    items: [{ id: 'dxItemId1' }],
                },
            ],
            rows: [
                {
                    dimension: DIMENSION_ID_PERIOD,
                    items: [{ id: 'MONTHS_THIS_YEAR' }],
                },
            ],
            filters: [
                {
                    dimension: DIMENSION_ID_ORGUNIT,
                    items: [{ id: 'ouItemId1' }, { id: 'ouItemId2' }],
                },
            ],
            yearlySeries: ['LAST_5_YEARS'],
        }

        const actualState = reducer(undefined, {
            type: SET_CURRENT_FROM_UI,
            value: ui,
        })

        expect(actualState).toEqual(expectedState)
    })
})
