import options from '../../options';
import reducer, { DEFAULT_CURRENT, actionTypes } from '../current';

describe('reducer: current', () => {
    it('should return the default state', () => {
        const actualState = reducer(undefined, { type: 'NO_MATCH' });

        expect(actualState).toEqual(DEFAULT_CURRENT);
    });

    it('SET_CURRENT: should set the new current', () => {
        const current = {};
        const actualState = reducer(undefined, {
            type: actionTypes.SET_CURRENT,
            value: current,
        });

        expect(current).toEqual(actualState);
    });

    it('SET_CURRENT_FROM_UI: should set the current from the ui state section', () => {
        const ui = {
            type: 'COLUMN',
            layout: {
                columns: ['dx'],
                rows: ['ou'],
                filters: ['pe'],
            },
            itemsByDimension: {
                dx: ['dxId1', 'dxId2'],
                ou: ['ouId1', 'ouId2'],
                pe: ['peId1'],
            },
            options,
        };
        const expectedState = {
            ...ui.options,
            type: ui.type,
            columns: [
                {
                    dimension: 'dx',
                    items: [{ id: 'dxId1' }, { id: 'dxId2' }],
                },
            ],
            rows: [
                {
                    dimension: 'ou',
                    items: [{ id: 'ouId1' }, { id: 'ouId2' }],
                },
            ],
            filters: [
                {
                    dimension: 'pe',
                    items: [{ id: 'peId1' }],
                },
            ],
        };

        const actualState = reducer(undefined, {
            type: actionTypes.SET_CURRENT_FROM_UI,
            value: ui,
        });

        expect(actualState).toEqual(expectedState);
    });
});
