//  TODO: Test drag-and-drop in the layout

import {
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    DIMENSION_ID_ASSIGNED_CATEGORIES,
    AXIS_ID_COLUMNS,
    AXIS_ID_FILTERS,
    getFixedDimensions,
    getDynamicDimensions,
} from '@dhis2/analytics'
import {
    expectDimensionModalToBeVisible,
    clickDimensionModalHideButton,
    expectDimensionModalToNotBeVisible,
} from '../elements/dimensionModal/index.js'
import {
    openDimension,
    openContextMenu,
    clickContextMenuAdd,
    clickContextMenuRemove,
    clickContextMenuMove,
    expectDimensionToHaveSelectedStyle,
    clickContextMenuDimSubMenu,
    expectAxisToHaveDimension,
    expectAxisToNotHaveDimension,
    expectLayoutToNotHaveDimension,
} from '../elements/layout.js'
import { goToStartPage } from '../elements/startScreen.js'

const TEST_FIXED_DIMS = Object.values(getFixedDimensions())
const TEST_DYNAMIC_DIMS = Object.values(getDynamicDimensions())

describe('interacting with the layout', () => {
    it('navigates to the start page', () => {
        goToStartPage()
    })
    describe('opening items by clicking them', () => {
        TEST_FIXED_DIMS.forEach((dim) => {
            it(`opens and closes ${dim.name}`, () => {
                openDimension(dim.id)
                expectDimensionModalToBeVisible(dim.id)
                clickDimensionModalHideButton()
                expectDimensionModalToNotBeVisible()
            })
        })
    })
    describe('moving items by using the context menu', () => {
        const TEST_AXIS = AXIS_ID_FILTERS
        const TEST_DIM = TEST_FIXED_DIMS.find(
            (dim) => dim.id === DIMENSION_ID_DATA
        )
        it(`moves ${TEST_DIM.name} to ${TEST_AXIS}`, () => {
            openContextMenu(TEST_DIM.id)
            clickContextMenuMove(TEST_DIM.id, TEST_AXIS)
            expectAxisToHaveDimension(TEST_AXIS, TEST_DIM.id)
        })
    })
    describe('removing item by using the context menu', () => {
        const TEST_DIM = TEST_FIXED_DIMS.find(
            (dim) => dim.id === DIMENSION_ID_PERIOD
        )
        it(`removes ${TEST_DIM.name}`, () => {
            openContextMenu(TEST_DIM.id)
            clickContextMenuRemove(TEST_DIM.id)
            expectLayoutToNotHaveDimension(TEST_DIM.id)
        })
    })
    describe('handling AC by using the Data item context menu', () => {
        const TEST_DIM = TEST_DYNAMIC_DIMS.find(
            (dim) => dim.id === DIMENSION_ID_ASSIGNED_CATEGORIES
        )
        const TEST_AXIS = AXIS_ID_COLUMNS
        it(`adds and removes ${TEST_DIM.name}`, () => {
            // add
            openContextMenu(DIMENSION_ID_DATA)
            clickContextMenuDimSubMenu(TEST_DIM.id)
            clickContextMenuAdd(TEST_DIM.id, TEST_AXIS)
            expectDimensionToHaveSelectedStyle(TEST_DIM.id)
            expectAxisToHaveDimension(TEST_AXIS, TEST_DIM.id)

            // remove
            openContextMenu(DIMENSION_ID_DATA)
            clickContextMenuRemove(TEST_DIM.id)
            expectAxisToNotHaveDimension(TEST_AXIS, TEST_DIM.id)
        })
    })
})
