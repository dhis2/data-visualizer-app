import reducer, {
    DEFAULT_UI,
    SET_UI,
    SET_UI_FROM_VISUALIZATION,
    SET_UI_TYPE,
    SET_UI_OPTIONS,
    SET_UI_LAYOUT,
    ADD_UI_LAYOUT_DIMENSIONS,
    REMOVE_UI_LAYOUT_DIMENSIONS,
    SET_UI_ITEMS,
    ADD_UI_ITEMS,
    REMOVE_UI_ITEMS,
    SET_UI_PARENT_GRAPH_MAP,
    ADD_UI_PARENT_GRAPH_MAP,
    SET_UI_ACTIVE_MODAL_DIALOG,
    CLEAR_UI,
    SET_UI_YEAR_ON_YEAR_SERIES,
    SET_UI_YEAR_ON_YEAR_CATEGORY,
} from '../ui';
import { AXIS_NAMES } from '../../modules/layout';
import { BAR, YEAR_OVER_YEAR_LINE } from '../../modules/chartTypes';
import { FIXED_DIMENSIONS } from '../../modules/fixedDimensions';

const [COLUMNS, ROWS, FILTERS] = AXIS_NAMES;

const dxId = FIXED_DIMENSIONS.dx.id;
const peId = FIXED_DIMENSIONS.pe.id;
const ouId = FIXED_DIMENSIONS.ou.id;

const dxItem1Id = 'dxItem1';
const dx = {
    dimension: dxId,
    items: [{ id: dxItem1Id }],
};

const peItem1Id = 'peItem1';
const pe = {
    dimension: peId,
    items: [{ id: peItem1Id }],
};

const ouItem1Id = 'ouItem1';
const ou = {
    dimension: ouId,
    items: [{ id: ouItem1Id }],
};

const type = BAR;
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

    it(`${SET_UI}: should set the new ui`, () => {
        const ui = {};
        const actualState = reducer(DEFAULT_UI, {
            type: SET_UI,
            value: ui,
        });

        expect(ui).toEqual(actualState);
    });

    it('CLEAR_UI should set the default state', () => {
        const actualState = reducer({ currentVal: 123 }, { type: CLEAR_UI });

        expect(actualState).toEqual(DEFAULT_UI);
    });

    it(`${SET_UI_FROM_VISUALIZATION}: should set the new ui based on a visualization`, () => {
        const expectedState = {
            ...DEFAULT_UI,
            type,
            options: { ...DEFAULT_UI.options, aggregationType },
            layout: { [COLUMNS]: [dxId], [ROWS]: [peId], [FILTERS]: [ouId] },
            itemsByDimension: {
                [dxId]: [dxItem1Id],
                [peId]: [peItem1Id],
                [ouId]: [ouItem1Id],
            },
        };

        const actualState = reducer(DEFAULT_UI, {
            type: SET_UI_FROM_VISUALIZATION,
            value: visualization,
        });

        expect(actualState).toEqual(expectedState);
    });

    it(`${SET_UI_TYPE}: should set the type`, () => {
        const expectedState = {
            ...DEFAULT_UI,
            type,
        };
        const actualState = reducer(DEFAULT_UI, {
            type: SET_UI_TYPE,
            value: type,
        });

        expect(actualState.type).toEqual(expectedState.type);
    });

    it(`${SET_UI_OPTIONS}: should set options`, () => {
        const newOptions = { cumulativeValues: true, title: 'test' };
        const expectedState = {
            ...DEFAULT_UI,
            options: { ...DEFAULT_UI.options, ...newOptions },
        };
        const actualState = reducer(DEFAULT_UI, {
            type: SET_UI_OPTIONS,
            value: newOptions,
        });

        expect(actualState).toEqual(expectedState);
    });

    it(`${SET_UI_LAYOUT}: should set layout`, () => {
        const newLayout = {};
        const expectedState = {
            ...DEFAULT_UI,
            layout: newLayout,
        };
        const actualState = reducer(DEFAULT_UI, {
            type: SET_UI_LAYOUT,
            value: newLayout,
        });

        expect(actualState).toEqual(expectedState);
    });

    it(`${ADD_UI_LAYOUT_DIMENSIONS}: should add layout dimensions`, () => {
        const state = {
            layout: {
                columns: [dxId],
                rows: [peId],
                filters: [ouId],
            },
        };

        const actualState = reducer(state, {
            type: ADD_UI_LAYOUT_DIMENSIONS,
            value: {
                [dxId]: 'rows',
            },
        });

        const expectedState = {
            layout: {
                columns: [peId],
                rows: [dxId],
                filters: [ouId],
            },
        };

        expect(actualState).toEqual(expectedState);
    });

    it(`${REMOVE_UI_LAYOUT_DIMENSIONS}: should remove a single dimension`, () => {
        const state = {
            layout: {
                columns: [dxId],
                rows: [peId],
                filters: [ouId],
            },
        };

        const actualState = reducer(state, {
            type: REMOVE_UI_LAYOUT_DIMENSIONS,
            value: peId,
        });

        const expectedState = {
            layout: {
                columns: [dxId],
                rows: [],
                filters: [ouId],
            },
        };

        expect(actualState).toEqual(expectedState);
    });

    it(`${REMOVE_UI_LAYOUT_DIMENSIONS}: should remove muliple dimensions`, () => {
        const state = {
            layout: {
                columns: [dxId],
                rows: [peId],
                filters: [ouId],
            },
        };

        const actualState = reducer(state, {
            type: REMOVE_UI_LAYOUT_DIMENSIONS,
            value: [peId, ouId],
        });

        const expectedState = {
            layout: {
                columns: [dxId],
                rows: [],
                filters: [],
            },
        };

        expect(actualState).toEqual(expectedState);
    });

    describe('itemByDimension', () => {
        it(`${SET_UI_ITEMS}: sets items by dimension`, () => {
            const newItemsByDimension = {
                [dxId]: 'abc',
                [peId]: 'def',
            };
            const expectedState = {
                ...DEFAULT_UI,
                itemsByDimension: newItemsByDimension,
            };
            const actualState = reducer(DEFAULT_UI, {
                type: SET_UI_ITEMS,
                value: newItemsByDimension,
            });

            expect(actualState).toEqual(expectedState);
        });

        it(`${ADD_UI_ITEMS}: adds single item to dx`, () => {
            const dx = ['abc'];

            const value = {
                dimensionType: dxId,
                value: dx,
            };
            const expectedState = dx;
            const actualState = reducer(DEFAULT_UI, {
                type: ADD_UI_ITEMS,
                value,
            });

            expect(actualState.itemsByDimension[dxId]).toEqual(expectedState);
        });

        it(`${ADD_UI_ITEMS}: adds several items to dx`, () => {
            const dx1 = 'abc';
            const dx2 = 'def';

            const value = { dimensionType: dxId, value: [dx1, dx2] };
            const expectedState = [dx1, dx2];
            const actualState = reducer(DEFAULT_UI, {
                type: ADD_UI_ITEMS,
                value,
            });

            expect(actualState.itemsByDimension[dxId]).toEqual(expectedState);
        });

        it(`${ADD_UI_ITEMS}: adds pre-existing items to dx`, () => {
            const dx1 = 'abc';
            const dx2 = 'def';

            const defaultIBD = Object.assign(
                {},
                { ...DEFAULT_UI.itemsByDimension },
                { [dxId]: [dx1] }
            );

            const startingState = Object.assign(
                {},
                { ...DEFAULT_UI },
                { itemsByDimension: defaultIBD }
            );

            const value = { dimensionType: dxId, value: [dx1, dx2] };
            const expectedState = [dx1, dx2];
            const actualState = reducer(startingState, {
                type: ADD_UI_ITEMS,
                value,
            });

            expect(actualState.itemsByDimension[dxId]).toEqual(expectedState);
        });

        it(`${REMOVE_UI_ITEMS}: removes items from dx`, () => {
            const dx1 = 'abc';
            const dx2 = 'def';

            const defaultIBD = Object.assign(
                {},
                { ...DEFAULT_UI.itemsByDimension },
                { [dxId]: [dx1, dx2] }
            );

            const startingState = Object.assign(
                {},
                { ...DEFAULT_UI },
                { itemsByDimension: defaultIBD }
            );

            const value = { dimensionType: dxId, value: [dx1] };
            const expectedState = [dx2];
            const actualState = reducer(startingState, {
                type: REMOVE_UI_ITEMS,
                value,
            });

            expect(actualState.itemsByDimension[dxId]).toEqual(expectedState);
        });
    });

    it(`${SET_UI_YEAR_ON_YEAR_SERIES}: should set new yearOnYearSeries`, () => {
        const series = ['LAST_YEAR'];

        const actualState = reducer(DEFAULT_UI, {
            type: SET_UI_YEAR_ON_YEAR_SERIES,
            value: series,
        });

        const expectedState = {
            ...DEFAULT_UI,
            yearOnYearSeries: series,
        };

        expect(actualState).toEqual(expectedState);
    });

    it(`${SET_UI_YEAR_ON_YEAR_CATEGORY}: should set new yearOnYearCategory`, () => {
        const category = ['LAST_3_MONTHS'];

        const actualState = reducer(DEFAULT_UI, {
            type: SET_UI_YEAR_ON_YEAR_CATEGORY,
            value: category,
        });

        const expectedState = {
            ...DEFAULT_UI,
            yearOnYearCategory: category,
        };

        expect(actualState).toEqual(expectedState);
    });

    it(`${SET_UI_PARENT_GRAPH_MAP}: should set the new parent graph map`, () => {
        const graphMapToSet = {
            abc: 'Silly district',
        };
        const actualState = reducer(DEFAULT_UI, {
            type: SET_UI_PARENT_GRAPH_MAP,
            value: graphMapToSet,
        });

        expect(actualState.parentGraphMap).toEqual(graphMapToSet);
    });

    it(`${ADD_UI_PARENT_GRAPH_MAP}: should add to the parent graph map`, () => {
        const currentGraphMap = {
            bcd: 'Very silly district',
        };
        const graphMapToAdd = {
            abc: 'Silly district',
        };
        const testState = reducer(DEFAULT_UI, {
            type: SET_UI_PARENT_GRAPH_MAP,
            value: currentGraphMap,
        });
        const actualState = reducer(testState, {
            type: ADD_UI_PARENT_GRAPH_MAP,
            value: graphMapToAdd,
        });

        expect(actualState.parentGraphMap).toEqual(
            Object.assign({}, currentGraphMap, graphMapToAdd)
        );
    });

    it(`${SET_UI_ACTIVE_MODAL_DIALOG}: should set the active modal dialog`, () => {
        const dialog = 'dynamic-123';

        const actualState = reducer(DEFAULT_UI, {
            type: SET_UI_ACTIVE_MODAL_DIALOG,
            value: dialog,
        });

        expect(actualState.activeModalDialog).toEqual(dialog);
    });
});
