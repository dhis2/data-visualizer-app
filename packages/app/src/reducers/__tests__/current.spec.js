import options from '../../modules/options';
import reducer, {
    DEFAULT_CURRENT,
    SET_CURRENT,
    SET_CURRENT_FROM_UI,
    CLEAR_CURRENT,
} from '../current';
import { COLUMN, YEAR_ON_YEAR } from '../../modules/chartTypes';
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
                dx: ['dxItemId1', 'dxItemId2'],
                ou: ['ouItemId1', 'ouItemId2'],
                pe: ['peItemId1'],
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
        };

        const actualState = reducer(undefined, {
            type: SET_CURRENT_FROM_UI,
            value: ui,
        });

        expect(actualState).toEqual(expectedState);
    });

    it('SET_CURRENT_FROM_UI: should set current on a year on year format from the ui state section', () => {
        const ui = {
            type: YEAR_ON_YEAR,
            layout: { columns: [], rows: [], filters: [dxId, ouId] },
            itemsByDimension: {
                dx: ['dxItemId1', 'dxItemId2'],
                ou: ['ouItemId1', 'ouItemId2'],
            },
            yearOnYearSeries: 'LAST_5_YEARS',
            yearOnYearCategory: 'MONTHS_THIS_YEAR',
            options,
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
            yearlySeries: 'LAST_5_YEARS',
        };

        const actualState = reducer(undefined, {
            type: SET_CURRENT_FROM_UI,
            value: ui,
        });

        expect(actualState).toEqual(expectedState);
    });
});
