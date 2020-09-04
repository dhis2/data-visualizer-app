import {
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    DIMENSION_ID_ORGUNIT,
    AXIS_ID_COLUMNS,
    AXIS_ID_ROWS,
    AXIS_ID_FILTERS,
    VIS_TYPE_COLUMN,
    VIS_TYPE_BAR,
} from '@dhis2/analytics'

import * as ui from '../ui'

const reducer = ui.default

const otherId = '123'

const dxItem1Id = 'dxItem1'
const dx = {
    dimension: DIMENSION_ID_DATA,
    items: [{ id: dxItem1Id }],
}

const peItem1Id = 'peItem1'
const pe = {
    dimension: DIMENSION_ID_PERIOD,
    items: [{ id: peItem1Id }],
}

const ouItem1Id = 'ouItem1'
const ou = {
    dimension: DIMENSION_ID_ORGUNIT,
    items: [{ id: ouItem1Id }],
}

const type = VIS_TYPE_BAR
const aggregationType = 'SUM'

const visualization = {
    type,
    aggregationType,
    [AXIS_ID_COLUMNS]: [dx],
    [AXIS_ID_ROWS]: [pe],
    [AXIS_ID_FILTERS]: [ou],
}

describe('reducer: ui', () => {
    it('returns the default state when no matching action', () => {
        const actualState = reducer(ui.DEFAULT_UI, { type: 'NO_MATCH' })

        expect(actualState).toEqual(ui.DEFAULT_UI)
    })

    it(`${ui.SET_UI} sets the new ui`, () => {
        const newUi = {}
        const actualState = reducer(ui.DEFAULT_UI, {
            type: ui.SET_UI,
            value: newUi,
        })

        expect(actualState).toEqual(newUi)
    })

    it(`${ui.CLEAR_UI} sets the default state`, () => {
        const settings = {
            rootOrganisationUnit: { id: 'ROOT_ORGUNIT' },
            relativePeriod: 'LAST_12_MONTHS',
            digitGroupSeparator: 'SPACE',
        }

        const actualState = reducer(
            { currentVal: 123 },
            { type: ui.CLEAR_UI, value: settings }
        )

        expect(actualState).toEqual({
            ...ui.DEFAULT_UI,
            options: {
                ...ui.DEFAULT_UI.options,
                digitGroupSeparator: settings.digitGroupSeparator,
            },
            parentGraphMap: {
                ...ui.DEFAULT_UI.parentGraphMap,
                [settings.rootOrganisationUnit.id]: '',
            },
            itemsByDimension: {
                ...ui.DEFAULT_UI.itemsByDimension,
                [DIMENSION_ID_ORGUNIT]: [settings.rootOrganisationUnit.id],
                [DIMENSION_ID_PERIOD]: [settings.relativePeriod],
            },
        })
    })

    it(`${ui.SET_UI_FROM_VISUALIZATION} sets the new ui based on a visualization`, () => {
        const expectedState = {
            ...ui.DEFAULT_UI,
            type,
            options: { ...ui.DEFAULT_UI.options, aggregationType },
            layout: {
                [AXIS_ID_COLUMNS]: [DIMENSION_ID_DATA],
                [AXIS_ID_ROWS]: [DIMENSION_ID_PERIOD],
                [AXIS_ID_FILTERS]: [DIMENSION_ID_ORGUNIT],
            },
            itemsByDimension: {
                [DIMENSION_ID_DATA]: [dxItem1Id],
                [DIMENSION_ID_PERIOD]: [peItem1Id],
                [DIMENSION_ID_ORGUNIT]: [ouItem1Id],
            },
        }

        const actualState = reducer(ui.DEFAULT_UI, {
            type: ui.SET_UI_FROM_VISUALIZATION,
            value: visualization,
        })

        expect(actualState).toEqual(expectedState)
    })

    it(`${ui.SET_UI_TYPE} sets the type`, () => {
        const expectedState = {
            ...ui.DEFAULT_UI,
            type,
        }
        const actualState = reducer(ui.DEFAULT_UI, {
            type: ui.SET_UI_TYPE,
            value: type,
        })

        expect(actualState.type).toEqual(expectedState.type)
    })

    it(`${ui.SET_UI_OPTIONS} sets options`, () => {
        const newOptions = { cumulativeValues: true, title: 'test' }
        const expectedState = {
            ...ui.DEFAULT_UI,
            options: { ...ui.DEFAULT_UI.options, ...newOptions },
        }
        const actualState = reducer(ui.DEFAULT_UI, {
            type: ui.SET_UI_OPTIONS,
            value: newOptions,
        })

        expect(actualState).toEqual(expectedState)
    })

    it(`${ui.SET_UI_LAYOUT} sets layout`, () => {
        const newLayout = {}
        const expectedState = {
            ...ui.DEFAULT_UI,
            layout: newLayout,
        }
        const actualState = reducer(ui.DEFAULT_UI, {
            type: ui.SET_UI_LAYOUT,
            value: newLayout,
        })

        expect(actualState).toEqual(expectedState)
    })

    it(`${ui.ADD_UI_LAYOUT_DIMENSIONS}: should swap layout dimensions`, () => {
        const state = {
            type: VIS_TYPE_COLUMN,
            layout: {
                columns: [DIMENSION_ID_DATA],
                rows: [DIMENSION_ID_PERIOD],
                filters: [DIMENSION_ID_ORGUNIT],
            },
        }

        const actualState = reducer(state, {
            type: ui.ADD_UI_LAYOUT_DIMENSIONS,
            value: {
                [DIMENSION_ID_DATA]: { axisId: AXIS_ID_ROWS },
            },
        })

        const expectedState = {
            ...state,
            layout: {
                columns: [DIMENSION_ID_PERIOD],
                rows: [DIMENSION_ID_DATA],
                filters: [DIMENSION_ID_ORGUNIT],
            },
        }

        expect(actualState).toEqual(expectedState)
    })

    it(`${ui.ADD_UI_LAYOUT_DIMENSIONS}: should add/remove layout dimensions`, () => {
        const state = {
            type: VIS_TYPE_COLUMN,
            layout: {
                columns: [DIMENSION_ID_DATA],
                rows: [DIMENSION_ID_PERIOD],
                filters: [DIMENSION_ID_ORGUNIT],
            },
        }

        const actualState = reducer(state, {
            type: ui.ADD_UI_LAYOUT_DIMENSIONS,
            value: {
                [otherId]: { axisId: AXIS_ID_COLUMNS },
            },
        })

        const expectedState = {
            ...state,
            layout: {
                columns: [otherId],
                rows: [DIMENSION_ID_PERIOD],
                filters: [DIMENSION_ID_ORGUNIT, DIMENSION_ID_DATA],
            },
        }

        expect(actualState).toEqual(expectedState)
    })

    it(`${ui.ADD_UI_LAYOUT_DIMENSIONS}: should add layout dimensions at desired position`, () => {
        const state = {
            type: VIS_TYPE_COLUMN,
            layout: {
                columns: [DIMENSION_ID_DATA],
                rows: [DIMENSION_ID_PERIOD],
                filters: [DIMENSION_ID_ORGUNIT],
            },
        }

        const actualState = reducer(state, {
            type: ui.ADD_UI_LAYOUT_DIMENSIONS,
            value: {
                [otherId]: { axisId: AXIS_ID_FILTERS, index: 0 },
            },
        })

        const expectedState = {
            ...state,
            layout: {
                columns: [DIMENSION_ID_DATA],
                rows: [DIMENSION_ID_PERIOD],
                filters: [otherId, DIMENSION_ID_ORGUNIT],
            },
        }

        expect(actualState).toEqual(expectedState)
    })

    it(`${ui.REMOVE_UI_LAYOUT_DIMENSIONS}: should remove a single dimension`, () => {
        const state = {
            layout: {
                columns: [DIMENSION_ID_DATA],
                rows: [DIMENSION_ID_PERIOD],
                filters: [DIMENSION_ID_ORGUNIT],
            },
        }

        const actualState = reducer(state, {
            type: ui.REMOVE_UI_LAYOUT_DIMENSIONS,
            value: DIMENSION_ID_PERIOD,
        })

        const expectedState = {
            layout: {
                columns: [DIMENSION_ID_DATA],
                rows: [],
                filters: [DIMENSION_ID_ORGUNIT],
            },
        }

        expect(actualState).toEqual(expectedState)
    })

    it(`${ui.REMOVE_UI_LAYOUT_DIMENSIONS} removes muliple dimensions`, () => {
        const state = {
            layout: {
                columns: [DIMENSION_ID_DATA],
                rows: [DIMENSION_ID_PERIOD],
                filters: [DIMENSION_ID_ORGUNIT],
            },
        }

        const actualState = reducer(state, {
            type: ui.REMOVE_UI_LAYOUT_DIMENSIONS,
            value: [DIMENSION_ID_PERIOD, DIMENSION_ID_ORGUNIT],
        })

        const expectedState = {
            layout: {
                columns: [DIMENSION_ID_DATA],
                rows: [],
                filters: [],
            },
        }

        expect(actualState).toEqual(expectedState)
    })

    it(`${ui.SET_UI_INTERPRETATION} sets the interpretation value`, () => {
        const interpretation = { id: 'abc123', created: 'eons ago' }
        const actualState = reducer(ui.DEFAULT_UI, {
            type: ui.SET_UI_INTERPRETATION,
            value: interpretation,
        })

        const expectedState = {
            ...ui.DEFAULT_UI,
            interpretation,
        }

        expect(actualState).toEqual(expectedState)
    })

    it(`${ui.CLEAR_UI_INTERPRETATION} clears the interpretation value`, () => {
        const state = {
            ...ui.DEFAULT_UI,
            interpretation: { id: 'abc123', created: 'eons ago' },
        }

        const actualState = reducer(state, {
            type: ui.CLEAR_UI_INTERPRETATION,
        })

        expect(actualState).toEqual(ui.DEFAULT_UI)
    })

    describe('itemByDimension', () => {
        it(`${ui.SET_UI_ITEMS} sets items by dimension`, () => {
            const startingState = {
                ...ui.DEFAULT_UI,
                itemsByDimension: {
                    [DIMENSION_ID_DATA]: 'abc',
                    [DIMENSION_ID_PERIOD]: 'def',
                },
            }
            const expectedItemsByDimension = {
                ...startingState.itemsByDimension,
                twilight: 'xyz',
            }

            const actualState = reducer(startingState, {
                type: ui.SET_UI_ITEMS,
                value: {
                    dimensionId: 'twilight',
                    itemIds: 'xyz',
                },
            })

            expect(actualState.itemsByDimension).toEqual(
                expectedItemsByDimension
            )
        })

        it(`${ui.ADD_UI_ITEMS} adds single item to dx`, () => {
            const dx = ['abc']

            const value = {
                dimensionId: DIMENSION_ID_DATA,
                itemIds: dx,
            }
            const expectedState = dx
            const actualState = reducer(ui.DEFAULT_UI, {
                type: ui.ADD_UI_ITEMS,
                value,
            })

            expect(actualState.itemsByDimension[DIMENSION_ID_DATA]).toEqual(
                expectedState
            )
        })

        it(`${ui.ADD_UI_ITEMS} adds several items to dx`, () => {
            const dx1 = 'abc'
            const dx2 = 'def'

            const value = {
                dimensionId: DIMENSION_ID_DATA,
                itemIds: [dx1, dx2],
            }
            const expectedState = [dx1, dx2]
            const actualState = reducer(ui.DEFAULT_UI, {
                type: ui.ADD_UI_ITEMS,
                value,
            })

            expect(actualState.itemsByDimension[DIMENSION_ID_DATA]).toEqual(
                expectedState
            )
        })

        it(`${ui.ADD_UI_ITEMS} adds pre-existing items to dx`, () => {
            const dx1 = 'abc'
            const dx2 = 'def'

            const defaultIBD = Object.assign(
                {},
                { ...ui.DEFAULT_UI.itemsByDimension },
                { [DIMENSION_ID_DATA]: [dx1] }
            )

            const startingState = Object.assign(
                {},
                { ...ui.DEFAULT_UI },
                { itemsByDimension: defaultIBD }
            )

            const value = {
                dimensionId: DIMENSION_ID_DATA,
                itemIds: [dx1, dx2],
            }
            const expectedState = [dx1, dx2]
            const actualState = reducer(startingState, {
                type: ui.ADD_UI_ITEMS,
                value,
            })

            expect(actualState.itemsByDimension[DIMENSION_ID_DATA]).toEqual(
                expectedState
            )
        })

        it(`${ui.REMOVE_UI_ITEMS} removes items from dx`, () => {
            const dx1 = 'abc'
            const dx2 = 'def'

            const defaultIBD = Object.assign(
                {},
                { ...ui.DEFAULT_UI.itemsByDimension },
                { [DIMENSION_ID_DATA]: [dx1, dx2] }
            )

            const startingState = Object.assign(
                {},
                { ...ui.DEFAULT_UI },
                { itemsByDimension: defaultIBD }
            )

            const value = {
                dimensionId: DIMENSION_ID_DATA,
                itemIdsToRemove: [dx1],
            }
            const expectedState = [dx2]
            const actualState = reducer(startingState, {
                type: ui.REMOVE_UI_ITEMS,
                value,
            })

            expect(actualState.itemsByDimension[DIMENSION_ID_DATA]).toEqual(
                expectedState
            )
        })
    })

    it(`${ui.ET_UI_YEAR_ON_YEAR_SERIES} sets new yearOverYearSeries`, () => {
        const series = ['LAST_YEAR']

        const actualState = reducer(ui.DEFAULT_UI, {
            type: ui.SET_UI_YEAR_ON_YEAR_SERIES,
            value: series,
        })

        const expectedState = {
            ...ui.DEFAULT_UI,
            yearOverYearSeries: series,
        }

        expect(actualState).toEqual(expectedState)
    })

    it(`${ui.SET_UI_YEAR_ON_YEAR_CATEGORY} sets new yearOverYearCategory`, () => {
        const category = ['LAST_3_MONTHS']

        const actualState = reducer(ui.DEFAULT_UI, {
            type: ui.SET_UI_YEAR_ON_YEAR_CATEGORY,
            value: category,
        })

        const expectedState = {
            ...ui.DEFAULT_UI,
            yearOverYearCategory: category,
        }

        expect(actualState).toEqual(expectedState)
    })

    it(`${ui.SET_UI_PARENT_GRAPH_MAP} sets the new parent graph map`, () => {
        const graphMapToSet = {
            abc: 'Silly district',
        }
        const actualState = reducer(ui.DEFAULT_UI, {
            type: ui.SET_UI_PARENT_GRAPH_MAP,
            value: graphMapToSet,
        })

        expect(actualState.parentGraphMap).toEqual(graphMapToSet)
    })

    it(`${ui.ADD_UI_PARENT_GRAPH_MAP} adds to the parent graph map`, () => {
        const currentGraphMap = {
            bcd: 'Very silly district',
        }
        const graphMapToAdd = {
            abc: 'Silly district',
        }
        const testState = reducer(ui.DEFAULT_UI, {
            type: ui.SET_UI_PARENT_GRAPH_MAP,
            value: currentGraphMap,
        })
        const actualState = reducer(testState, {
            type: ui.ADD_UI_PARENT_GRAPH_MAP,
            value: graphMapToAdd,
        })

        expect(actualState.parentGraphMap).toEqual(
            Object.assign({}, currentGraphMap, graphMapToAdd)
        )
    })

    it(`${ui.SET_UI_ACTIVE_MODAL_DIALOG} sets the active modal dialog`, () => {
        const dialog = 'dynamic-123'

        const actualState = reducer(ui.DEFAULT_UI, {
            type: ui.SET_UI_ACTIVE_MODAL_DIALOG,
            value: dialog,
        })

        expect(actualState.activeModalDialog).toEqual(dialog)
    })

    it(`${ui.TOGGLE_UI_RIGHT_SIDEBAR_OPEN} toggles the state of the right sidebar`, () => {
        let actualState = reducer(ui.DEFAULT_UI, {
            type: ui.TOGGLE_UI_RIGHT_SIDEBAR_OPEN,
        })

        expect(actualState.rightSidebarOpen).toEqual(true)

        actualState = reducer(actualState, {
            type: ui.TOGGLE_UI_RIGHT_SIDEBAR_OPEN,
        })

        expect(actualState.rightSidebarOpen).toEqual(false)
    })
})
