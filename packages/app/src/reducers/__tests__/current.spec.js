import options from '../../modules/options';
import reducer, {
    DEFAULT_CURRENT,
    SET_CURRENT,
    SET_CURRENT_FROM_UI,
    CLEAR_CURRENT,
} from '../current';
import { COLUMN, YEAR_OVER_YEAR_LINE } from '../../modules/chartTypes';
import { FIXED_DIMENSIONS } from '../../modules/fixedDimensions';

const dxId = FIXED_DIMENSIONS.dx.id;
const peId = FIXED_DIMENSIONS.pe.id;
const ouId = FIXED_DIMENSIONS.ou.id;

describe('reducer: current', () => {
    it('should return the default state', () => {
        const actualState = reducer(undefined, { type: 'NO_MATCH' });

        expect(actualState).toEqual(DEFAULT_CURRENT);
    });

    it('SET_CURRENT: should set the new current', () => {
        const current = {};
        const actualState = reducer(undefined, {
            type: SET_CURRENT,
            value: current,
        });

        expect(current).toEqual(actualState);
    });

    it('CLEAR_CURRENT should set the default state', () => {
        const actualState = reducer(
            { currentVal: 123 },
            { type: CLEAR_CURRENT }
        );

        expect(actualState).toEqual(DEFAULT_CURRENT);
    });

    it('SET_CURRENT_FROM_UI: should set the current from the ui state section', () => {
        const ui = {
            type: COLUMN,
            layout: { columns: [dxId], rows: [ouId], filters: [peId] },
            itemsByDimension: {
                [dxId]: ['dxItemId1', 'dxItemId2'],
                [peId]: ['peItemId1'],
                [ouId]: ['ouItemId1', 'ouItemId2'],
            },
            options,
        };

        const expectedState = {
            ...ui.options,
            type: ui.type,
            columns: [
                {
                    dimension: dxId,
                    items: [{ id: 'dxItemId1' }, { id: 'dxItemId2' }],
                },
            ],
            rows: [
                {
                    dimension: ouId,
                    items: [{ id: 'ouItemId1' }, { id: 'ouItemId2' }],
                },
            ],
            filters: [
                {
                    dimension: peId,
                    items: [{ id: 'peItemId1' }],
                },
            ],
            seriesItems: [],
        };

        const actualState = reducer(undefined, {
            type: SET_CURRENT_FROM_UI,
            value: ui,
        });

        expect(actualState).toEqual(expectedState);
    });

    it('SET_CURRENT_FROM_UI: should set current on a year on year format from the ui state section', () => {
        const ui = {
            type: YEAR_OVER_YEAR_LINE,
            options,
            layout: { columns: [], rows: [], filters: [dxId, ouId] },
            itemsByDimension: {
                [dxId]: ['dxItemId1', 'dxItemId2'],
                [ouId]: ['ouItemId1', 'ouItemId2'],
            },
            yearOverYearSeries: ['LAST_5_YEARS'],
            yearOverYearCategory: ['MONTHS_THIS_YEAR'],
        };
        const expectedState = {
            ...ui.options,
            type: ui.type,
            columns: [
                {
                    dimension: dxId,
                    items: [{ id: 'dxItemId1' }],
                },
            ],
            rows: [
                {
                    dimension: peId,
                    items: [{ id: 'MONTHS_THIS_YEAR' }],
                },
            ],
            filters: [
                {
                    dimension: ouId,
                    items: [{ id: 'ouItemId1' }, { id: 'ouItemId2' }],
                },
            ],
            yearlySeries: ['LAST_5_YEARS'],
        };

        const actualState = reducer(undefined, {
            type: SET_CURRENT_FROM_UI,
            value: ui,
        });

        expect(actualState).toEqual(expectedState);
    });
});
