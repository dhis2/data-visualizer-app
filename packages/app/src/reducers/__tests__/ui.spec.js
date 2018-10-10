import reducer, { DEFAULT_UI, actionTypes } from '../ui';
import { AXIS_NAMES } from '../../layout';

const [COLUMNS, ROWS, FILTERS] = AXIS_NAMES;

const dxId = 'dx';
const dxItem1Id = 'dxItem1';
const dx = {
    dimension: dxId,
    items: [{ id: dxItem1Id }],
};

const peId = 'pe';
const peItem1Id = 'peItem1';
const pe = {
    dimension: peId,
    items: [{ id: peItem1Id }],
};

const ouId = 'ou';
const ouItem1Id = 'ouItem1';
const ou = {
    dimension: ouId,
    items: [{ id: ouItem1Id }],
};

const type = 'bar';
const aggregationType = 'SUM';

const visualization = {
    type,
    aggregationType,
    [COLUMNS]: [dx],
    [ROWS]: [pe],
    [FILTERS]: [ou],
};

describe('reducer: ui', () => {
    it('should return the default state', () => {
        const actualState = reducer(DEFAULT_UI, { type: 'NO_MATCH' });

        expect(actualState).toEqual(DEFAULT_UI);
    });

    it(`${actionTypes.SET_UI}: should set the new ui`, () => {
        const ui = {};
        const actualState = reducer(DEFAULT_UI, {
            type: actionTypes.SET_UI,
            value: ui,
        });

        expect(ui).toEqual(actualState);
    });

    it('CLEAR_UI should set the default state', () => {
        const actualState = reducer(
            { currentVal: 123 },
            { type: actionTypes.CLEAR_UI }
        );

        expect(actualState).toEqual(DEFAULT_UI);
    });

    it(`${
        actionTypes.SET_UI_FROM_VISUALIZATION
    }: should set the new based on a visualization`, () => {
        const expectedState = {
            type,
            options: { ...DEFAULT_UI.options, aggregationType },
            layout: {
                [COLUMNS]: [dxId],
                [ROWS]: [peId],
                [FILTERS]: [ouId],
            },
            itemsByDimension: {
                [dxId]: [{ id: dxItem1Id }],
                [peId]: [{ id: peItem1Id }],
                [ouId]: [{ id: ouItem1Id }],
            },
        };
        const actualState = reducer(DEFAULT_UI, {
            type: actionTypes.SET_UI_FROM_VISUALIZATION,
            value: visualization,
        });

        expect(actualState).toEqual(expectedState);
    });

    it(`${actionTypes.SET_UI_TYPE}: should set the type`, () => {
        const expectedState = {
            ...DEFAULT_UI,
            type,
        };
        const actualState = reducer(DEFAULT_UI, {
            type: actionTypes.SET_UI_TYPE,
            value: type,
        });

        expect(actualState.type).toEqual(expectedState.type);
    });

    it(`${actionTypes.SET_UI_OPTIONS}: should set options`, () => {
        const newOptions = { cumulativeValues: true, title: 'test' };
        const expectedState = {
            ...DEFAULT_UI,
            options: { ...DEFAULT_UI.options, ...newOptions },
        };
        const actualState = reducer(DEFAULT_UI, {
            type: actionTypes.SET_UI_OPTIONS,
            value: newOptions,
        });

        expect(actualState).toEqual(expectedState);
    });

    it(`${actionTypes.SET_UI_LAYOUT}: should set layout`, () => {
        const newLayout = {};
        const expectedState = {
            ...DEFAULT_UI,
            layout: newLayout,
        };
        const actualState = reducer(DEFAULT_UI, {
            type: actionTypes.SET_UI_LAYOUT,
            value: newLayout,
        });

        expect(actualState).toEqual(expectedState);
    });

    describe('itemByDimension', () => {
        it(`${actionTypes.SET_UI_ITEMS}: sets items by dimension`, () => {
            const newItemsByDimension = {
                dx: 'abc',
                pe: 'def',
            };
            const expectedState = {
                ...DEFAULT_UI,
                itemsByDimension: newItemsByDimension,
            };
            const actualState = reducer(DEFAULT_UI, {
                type: actionTypes.SET_UI_ITEMS,
                value: newItemsByDimension,
            });

            expect(actualState).toEqual(expectedState);
        });

        it(`${actionTypes.ADD_UI_ITEMS}: adds single item to dx`, () => {
            const dx = [{ id: 'abc', name: 'rainbow dash' }];

            const value = {
                dimensionType: 'dx',
                value: dx,
            };
            const expectedState = dx;
            const actualState = reducer(DEFAULT_UI, {
                type: actionTypes.ADD_UI_ITEMS,
                value,
            });

            expect(actualState.itemsByDimension.dx).toEqual(expectedState);
        });

        it(`${actionTypes.ADD_UI_ITEMS}: adds several items to dx`, () => {
            const dx1 = { id: 'abc', name: 'rainbow dash' };
            const dx2 = { id: 'def', name: 'pinkie pie' };

            const value = { dimensionType: 'dx', value: [dx1, dx2] };
            const expectedState = [dx1, dx2];
            const actualState = reducer(DEFAULT_UI, {
                type: actionTypes.ADD_UI_ITEMS,
                value,
            });

            expect(actualState.itemsByDimension.dx).toEqual(expectedState);
        });

        it(`${actionTypes.ADD_UI_ITEMS}: adds pre-existing items to dx`, () => {
            const dx1 = { id: 'abc', name: 'rainbow dash' };
            const dx2 = { id: 'def', name: 'pinkie pie' };

            const defaultIBD = Object.assign(
                {},
                { ...DEFAULT_UI.itemsByDimension },
                { dx: [dx1] }
            );

            const startingState = Object.assign(
                {},
                { ...DEFAULT_UI },
                { itemsByDimension: defaultIBD }
            );

            const value = { dimensionType: 'dx', value: [dx1, dx2] };
            const expectedState = [dx1, dx2];
            const actualState = reducer(startingState, {
                type: actionTypes.ADD_UI_ITEMS,
                value,
            });

            expect(actualState.itemsByDimension.dx).toEqual(expectedState);
        });

        it(`${actionTypes.REMOVE_UI_ITEMS}: removes items from dx`, () => {
            const dx1 = { id: 'abc', name: 'rainbow dash' };
            const dx2 = { id: 'def', name: 'pinkie pie' };

            const defaultIBD = Object.assign(
                {},
                { ...DEFAULT_UI.itemsByDimension },
                { dx: [dx1, dx2] }
            );

            const startingState = Object.assign(
                {},
                { ...DEFAULT_UI },
                { itemsByDimension: defaultIBD }
            );

            const value = { dimensionType: 'dx', value: [dx1.id] };
            const expectedState = [dx2];
            const actualState = reducer(startingState, {
                type: actionTypes.REMOVE_UI_ITEMS,
                value,
            });

            expect(actualState.itemsByDimension.dx).toEqual(expectedState);
        });
    });

    it(`${
        actionTypes.ADD_UI_ITEMS
    }: should add items by dimension preserving old value`, () => {
        const ouItems = {
            ou: [
                'USER_ORG_UNIT',
                'USER_ORGUNIT_CHILDREN',
                'USER_ORGUNIT_GRANDCHILDREN',
            ],
        };

        const expectedState = {
            ...DEFAULT_UI,
            itemsByDimension: {
                ...DEFAULT_UI.itemsByDimension,
                ...ouItems,
            },
        };

        const actualState = reducer(DEFAULT_UI, {
            type: actionTypes.ADD_UI_ITEMS,
            value: ouItems,
        });

        expect(actualState).toEqual(expectedState);
    });
});
