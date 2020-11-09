/* 
//  TODO:

  ✓ Test that the following can be added by clicking on the item in the panel:
        data item
        period
        org unit
        assigned categories
        dynamic dimension
  ✓ Test that the "Filter dimensions" field works
    Test drag-and-drop to the layout
    Test the context menu: 
        AC for Data
      ✓ Add dimensions
        Move dimensions
        Remove dimensions
    Check the green recommended dot

*/

import {
    getFixedDimensions,
    getDynamicDimensions,
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    DIMENSION_ID_ORGUNIT,
    AXIS_ID_COLUMNS,
    DIMENSION_ID_ASSIGNED_CATEGORIES,
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
} from '../elements/DimensionsPanel'
import { expectAxisToHaveDimension } from '../elements/Layout'
import { expectStartScreenToBeVisible } from '../elements/StartScreen'
import { TEST_CUSTOM_DIMENSIONS } from '../utils/data'
import { getRandomArrayItem } from '../utils/random'

const TEST_FIXED_DIMS = Object.values(getFixedDimensions())
const TEST_DYNAMIC_DIMS = Object.values(getDynamicDimensions())
const TEST_CUSTOM_DIMS = TEST_CUSTOM_DIMENSIONS.slice(0, 1)

describe('interacting with the dimensions panel', () => {
    it('navigates to the start page', () => {
        cy.visit('')
        expectStartScreenToBeVisible()
    })
    describe('removes all default items from the layout', () => {
        it('removes data', () => {
            openContextMenu(DIMENSION_ID_DATA)
            clickContextMenuRemove(DIMENSION_ID_DATA)
        })
        it('removes period and period items', () => {
            openDimension(DIMENSION_ID_PERIOD)
            removeAllPeriodItems()
            clickModalUpdateButton()
            openContextMenu(DIMENSION_ID_PERIOD)
            clickContextMenuRemove(DIMENSION_ID_PERIOD)
        })
        it('removes org unit and org unit items', () => {
            openDimension(DIMENSION_ID_ORGUNIT)
            clickOrgUnitTreeItem('Sierra Leone')
            clickModalUpdateButton()
            openContextMenu(DIMENSION_ID_ORGUNIT)
            clickContextMenuRemove(DIMENSION_ID_ORGUNIT)
        })
    })
    describe('clicking dimensions', () => {
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
                it('clicks "Add to Series"', () => {
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
                it(`${TEST_AXIS} axis has dimension`, () => {
                    expectAxisToHaveDimension(TEST_AXIS, dim.id)
                })
            })
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
