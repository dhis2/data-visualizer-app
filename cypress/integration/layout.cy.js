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
} from '../elements/DimensionModal'
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
} from '../elements/Layout'
import { goToStartPage } from '../elements/StartScreen'

const TEST_FIXED_DIMS = Object.values(getFixedDimensions())
const TEST_DYNAMIC_DIMS = Object.values(getDynamicDimensions())

describe('interacting with the dimensions panel', () => {
    it('navigates to the start page', () => {
        goToStartPage()
    })
    describe('clicking layout items', () => {
        TEST_FIXED_DIMS.forEach(dim => {
            describe(`${dim.name}`, () => {
                it('clicks the dimension', () => {
                    openDimension(dim.id)
                })
                it('shows the dimension modal', () => {
                    expectDimensionModalToBeVisible(dim.id)
                })
                it('clicks the modal hide button', () => {
                    clickDimensionModalHideButton()
                })
            })
        })
    })
    describe('moving through context menu', () => {
        const TEST_AXIS = AXIS_ID_FILTERS
        const TEST_DIM = TEST_FIXED_DIMS.find(
            dim => dim.id === DIMENSION_ID_DATA
        )
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
        const TEST_DIM = TEST_FIXED_DIMS.find(
            dim => dim.id === DIMENSION_ID_PERIOD
        )
        describe(`${TEST_DIM.name}`, () => {
            it('opens the context menu', () => {
                openContextMenu(TEST_DIM.id)
            })
            it(`removes ${TEST_DIM.name}`, () => {
                clickContextMenuRemove(TEST_DIM.id)
            })
            it(`${TEST_DIM.name} is removed`, () => {
                expectLayoutToNotHaveDimension(TEST_DIM.id)
            })
        })
    })
    describe('handling AC through the Data context menu', () => {
        const TEST_DIM = TEST_DYNAMIC_DIMS.find(
            dim => dim.id === DIMENSION_ID_ASSIGNED_CATEGORIES
        )
        const TEST_AXIS = AXIS_ID_COLUMNS
        it(`adds ${TEST_DIM.name}`, () => {
            openContextMenu(DIMENSION_ID_DATA)
            clickContextMenuDimSubMenu(TEST_DIM.id)
            clickContextMenuAdd(TEST_DIM.id, TEST_AXIS)
            expectDimensionToHaveSelectedStyle(TEST_DIM.id)
            expectAxisToHaveDimension(TEST_AXIS, TEST_DIM.id)
        })
        it(`removes ${TEST_DIM.name}`, () => {
            openContextMenu(DIMENSION_ID_DATA)
            clickContextMenuRemove(TEST_DIM.id)
            expectAxisToNotHaveDimension(TEST_AXIS, TEST_DIM.id)
        })
    })
})
