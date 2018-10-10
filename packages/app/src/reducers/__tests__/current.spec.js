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

    it('CLEAR_CURRENT should set the default state', () => {
        const actualState = reducer(
            { currentVal: 123 },
            { type: actionTypes.CLEAR_CURRENT }
        );

        expect(actualState).toEqual(DEFAULT_CURRENT);
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
                dx: [
                    { id: 'dxId1', name: 'dx item1' },
                    { id: 'dxId2', name: 'dx item2' },
                ],
                ou: [
                    { id: 'ouId1', name: 'ou item1' },
                    { id: 'ouId2', name: 'ou item2' },
                ],
                pe: [{ id: 'peId1', name: 'pe item1' }],
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
