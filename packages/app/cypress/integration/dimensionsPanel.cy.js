//  TODO: Test drag-and-drop to the layout

import {
    getFixedDimensions,
    getDynamicDimensions,
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    DIMENSION_ID_ORGUNIT,
    AXIS_ID_COLUMNS,
    DIMENSION_ID_ASSIGNED_CATEGORIES,
    AXIS_ID_ROWS,
} from '@dhis2/analytics'
import {
    expectDimensionModalToBeVisible,
    clickModalUHideButton,
    clickOrgUnitTreeItem,
    clickModalUpdateButton,
} from '../elements/DimensionModal'
import { removeAllPeriodItems } from '../elements/DimensionModal/periodDimension'
import {
    openDimension,
    openContextMenu,
    clickContextMenuAdd,
    clickContextMenuRemove,
    filterDimensionsByText,
    expectFixedDimensionsToHaveLength,
    clearDimensionsFilter,
    clickContextMenuMove,
    expectDimensionToNotHaveSelectedStyle,
    expectDimensionToHaveSelectedStyle,
    clickContextMenuDimSubMenu,
    expectRecommendedIconToBeVisible,
} from '../elements/DimensionsPanel'
import { expectAxisToHaveDimension } from '../elements/Layout'
import { expectStartScreenToBeVisible } from '../elements/StartScreen'
import {
    TEST_CUSTOM_DIMENSIONS,
    TEST_DEFAULT_RECOMMENDED_DIMENSIONS,
} from '../utils/data'
import { getRandomArrayItem } from '../utils/random'

const TEST_FIXED_DIMS = Object.values(getFixedDimensions())
const TEST_DYNAMIC_DIMS = Object.values(getDynamicDimensions())
const TEST_CUSTOM_DIMS = [getRandomArrayItem(TEST_CUSTOM_DIMENSIONS)]

describe('interacting with the dimensions panel', () => {
    it('navigates to the start page', () => {
        cy.visit('')
        expectStartScreenToBeVisible()
    })
    describe('displays recommended icons', () => {
        ;[getRandomArrayItem(TEST_DEFAULT_RECOMMENDED_DIMENSIONS)].forEach(
            dim =>
                describe(`${dim.name}`, () => {
                    it('displays the recommended icon', () => {
                        expectRecommendedIconToBeVisible(dim.id)
                    })
                })
        )
    })
    describe('removes all default items from the layout', () => {
        it('removes data', () => {
            openContextMenu(DIMENSION_ID_DATA)
            clickContextMenuRemove(DIMENSION_ID_DATA)
            expectDimensionToNotHaveSelectedStyle(DIMENSION_ID_DATA)
        })
        it('removes period and period items', () => {
            openDimension(DIMENSION_ID_PERIOD)
            removeAllPeriodItems()
            clickModalUpdateButton()
            openContextMenu(DIMENSION_ID_PERIOD)
            clickContextMenuRemove(DIMENSION_ID_PERIOD)
            expectDimensionToNotHaveSelectedStyle(DIMENSION_ID_PERIOD)
        })
        it('removes org unit and org unit items', () => {
            openDimension(DIMENSION_ID_ORGUNIT)
            clickOrgUnitTreeItem('Sierra Leone')
            clickModalUpdateButton()
            openContextMenu(DIMENSION_ID_ORGUNIT)
            clickContextMenuRemove(DIMENSION_ID_ORGUNIT)
            expectDimensionToNotHaveSelectedStyle(DIMENSION_ID_ORGUNIT)
        })
    })
    describe('clicking list items', () => {
        ;[...TEST_FIXED_DIMS, ...TEST_CUSTOM_DIMS].forEach(dim => {
            describe(`${dim.name}`, () => {
                it('clicks the dimension', () => {
                    openDimension(dim.id)
                })
                it('shows the dimension modal', () => {
                    expectDimensionModalToBeVisible(dim.id)
                })
                it('clicks the modal hide button', () => {
                    clickModalUHideButton()
                })
            })
        })
    })
    describe('adding through context menu', () => {
        const TEST_AXIS = AXIS_ID_COLUMNS
        ;[
            ...TEST_FIXED_DIMS,
            ...TEST_DYNAMIC_DIMS,
            ...TEST_CUSTOM_DIMS,
        ].forEach(dim => {
            describe(`${dim.name}`, () => {
                it('opens the context menu', () => {
                    openContextMenu(dim.id)
                })
                it(`adds to ${TEST_AXIS} axis`, () => {
                    clickContextMenuAdd(dim.id, TEST_AXIS)
                })
                if (dim.id !== DIMENSION_ID_ASSIGNED_CATEGORIES) {
                    it('shows the dimension modal', () => {
                        expectDimensionModalToBeVisible(dim.id)
                    })
                    it('clicks the modal hide button', () => {
                        clickModalUHideButton()
                    })
                }
                it(`${dim.name} has selected style`, () => {
                    expectDimensionToHaveSelectedStyle(dim.id)
                })
                it(`${TEST_AXIS} axis has dimension`, () => {
                    expectAxisToHaveDimension(TEST_AXIS, dim.id)
                })
            })
        })
    })
    describe('moving through context menu', () => {
        const TEST_AXIS = AXIS_ID_ROWS
        const TEST_DIM = getRandomArrayItem(TEST_FIXED_DIMS)
        describe(`${TEST_DIM.name}`, () => {
            it('opens the context menu', () => {
                openContextMenu(TEST_DIM.id)
            })
            it(`moves to ${TEST_AXIS} axis`, () => {
                clickContextMenuMove(TEST_DIM.id, TEST_AXIS)
            })
            it(`${TEST_AXIS} axis has dimension`, () => {
                expectAxisToHaveDimension(TEST_AXIS, TEST_DIM.id)
            })
        })
    })
    describe('removing through context menu', () => {
        const TEST_DIM = getRandomArrayItem(TEST_FIXED_DIMS)
        describe(`${TEST_DIM.name}`, () => {
            it('opens the context menu', () => {
                openContextMenu(TEST_DIM.id)
            })
            it(`removes ${TEST_DIM.name}`, () => {
                clickContextMenuRemove(TEST_DIM.id)
            })
            it(`${TEST_DIM.name} is removed`, () => {
                expectDimensionToNotHaveSelectedStyle(TEST_DIM.id)
            })
        })
    })
    describe('handling AC through the Data context menu', () => {
        const TEST_DIM = TEST_DYNAMIC_DIMS.find(
            dim => dim.id === DIMENSION_ID_ASSIGNED_CATEGORIES
        )
        it(`removes ${TEST_DIM.name}`, () => {
            openContextMenu(DIMENSION_ID_DATA)
            clickContextMenuRemove(TEST_DIM.id)
            expectDimensionToNotHaveSelectedStyle(TEST_DIM.id)
        })
        it(`adds ${TEST_DIM.name}`, () => {
            const TEST_AXIS = AXIS_ID_COLUMNS
            openContextMenu(DIMENSION_ID_DATA)
            clickContextMenuDimSubMenu(TEST_DIM.id)
            clickContextMenuAdd(TEST_DIM.id, TEST_AXIS)
            expectDimensionToHaveSelectedStyle(TEST_DIM.id)
            expectAxisToHaveDimension(TEST_AXIS, TEST_DIM.id)
        })
    })
    describe('filtering dimensions', () => {
        const TEST_DEFAULT_FIXED_DIMS_LENGTH = TEST_FIXED_DIMS.length
        const TEST_FILTER_SEARCH_TERM = getRandomArrayItem(TEST_FIXED_DIMS).name

        it(`applies dimension filter "${TEST_FILTER_SEARCH_TERM}"`, () => {
            expectFixedDimensionsToHaveLength(TEST_DEFAULT_FIXED_DIMS_LENGTH)
            filterDimensionsByText(TEST_FILTER_SEARCH_TERM)
            expectFixedDimensionsToHaveLength(1)
        })
        it('clears filter', () => {
            clearDimensionsFilter()
            expectFixedDimensionsToHaveLength(TEST_DEFAULT_FIXED_DIMS_LENGTH)
        })
    })
})
