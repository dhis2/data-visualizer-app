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
    clickDimensionModalHideButton,
    deselectUserOrgUnit,
    clickDimensionModalUpdateButton,
    expectDimensionModalToNotBeVisible,
    unselectAllItemsByButton,
} from '../elements/dimensionModal'
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
} from '../elements/dimensionsPanel'
import { expectAxisToHaveDimension } from '../elements/layout'
import { goToStartPage } from '../elements/startScreen'
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
        goToStartPage()
    })
    describe('displays recommended icons', () => {
        ;[getRandomArrayItem(TEST_DEFAULT_RECOMMENDED_DIMENSIONS)].forEach(
            (dim) =>
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
            unselectAllItemsByButton()
            clickDimensionModalUpdateButton()
            openContextMenu(DIMENSION_ID_PERIOD)
            clickContextMenuRemove(DIMENSION_ID_PERIOD)
            expectDimensionToNotHaveSelectedStyle(DIMENSION_ID_PERIOD)
        })
        it('removes org unit and org unit items', () => {
            openDimension(DIMENSION_ID_ORGUNIT)
            deselectUserOrgUnit('User organisation unit')
            clickDimensionModalUpdateButton()
            openContextMenu(DIMENSION_ID_ORGUNIT)
            clickContextMenuRemove(DIMENSION_ID_ORGUNIT)
            expectDimensionToNotHaveSelectedStyle(DIMENSION_ID_ORGUNIT)
        })
    })
    describe('opening items by clicking them', () => {
        ;[...TEST_FIXED_DIMS, ...TEST_CUSTOM_DIMS].forEach((dim) => {
            it(`opens and closes ${dim.name}`, () => {
                openDimension(dim.id)
                expectDimensionModalToBeVisible(dim.id)
                clickDimensionModalHideButton()
            })
        })
    })
    describe('adding items by using the context menu', () => {
        const TEST_AXIS = AXIS_ID_COLUMNS
        ;[
            ...TEST_FIXED_DIMS,
            ...TEST_DYNAMIC_DIMS,
            ...TEST_CUSTOM_DIMS,
        ].forEach((dim) => {
            it(`adds ${dim.name} to ${TEST_AXIS} axis`, () => {
                openContextMenu(dim.id)
                clickContextMenuAdd(dim.id, TEST_AXIS)
                expectDimensionToHaveSelectedStyle(dim.id)
                expectAxisToHaveDimension(TEST_AXIS, dim.id)
                if (dim.id !== DIMENSION_ID_ASSIGNED_CATEGORIES) {
                    expectDimensionModalToBeVisible(dim.id)
                    clickDimensionModalHideButton()
                    expectDimensionModalToNotBeVisible()
                }
            })
        })
    })
    describe('moving items by using the context menu', () => {
        const TEST_AXIS = AXIS_ID_ROWS
        const TEST_DIM = getRandomArrayItem(TEST_FIXED_DIMS)
        it(`moves ${TEST_DIM.name} to ${TEST_AXIS} axis`, () => {
            openContextMenu(TEST_DIM.id)
            clickContextMenuMove(TEST_DIM.id, TEST_AXIS)
            expectAxisToHaveDimension(TEST_AXIS, TEST_DIM.id)
        })
    })
    describe('removing by using the context menu', () => {
        const TEST_DIM = getRandomArrayItem(TEST_FIXED_DIMS)
        it(`removes ${TEST_DIM.name}`, () => {
            openContextMenu(TEST_DIM.id)
            clickContextMenuRemove(TEST_DIM.id)
            expectDimensionToNotHaveSelectedStyle(TEST_DIM.id)
        })
    })
    describe('handling AC by using the Data item context menu', () => {
        const TEST_DIM = TEST_DYNAMIC_DIMS.find(
            (dim) => dim.id === DIMENSION_ID_ASSIGNED_CATEGORIES
        )
        it(`removes and adds ${TEST_DIM.name}`, () => {
            const TEST_AXIS = AXIS_ID_COLUMNS
            // remove
            openContextMenu(DIMENSION_ID_DATA)
            clickContextMenuRemove(TEST_DIM.id)
            expectDimensionToNotHaveSelectedStyle(TEST_DIM.id)

            // add
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

        it(`applies dimension filter "${TEST_FILTER_SEARCH_TERM} and clears it"`, () => {
            // apply
            expectFixedDimensionsToHaveLength(TEST_DEFAULT_FIXED_DIMS_LENGTH)
            filterDimensionsByText(TEST_FILTER_SEARCH_TERM)
            expectFixedDimensionsToHaveLength(1)

            // clear
            clearDimensionsFilter()
            expectFixedDimensionsToHaveLength(TEST_DEFAULT_FIXED_DIMS_LENGTH)
        })
    })
})
