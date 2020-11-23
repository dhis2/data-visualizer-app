import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    DimensionMenu,
    DIMENSION_ID_ASSIGNED_CATEGORIES,
} from '@dhis2/analytics'
import { Popover } from '@dhis2/ui'

import DialogManager from './Dialogs/DialogManager'
import DndDimensionsPanel from './DndDimensionsPanel'
import * as fromReducers from '../../reducers'
import { styles } from './styles/DimensionsPanel.style'
import {
    acSetUiActiveModalDialog,
    acAddUiLayoutDimensions,
    acRemoveUiLayoutDimensions,
} from '../../actions/ui'

export const Dimensions = ({
    assignedCategoriesItemHandler,
    axisItemHandler,
    getCurrentAxisId,
    itemsByDimension,
    layoutHasAssignedCategories,
    removeItemHandler,
    ui,
}) => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false)
    const [dimensionId, setDimensionId] = useState(null)
    const [ref, setRef] = useState()

    const toggleMenu = () => {
        if (dialogIsOpen) {
            setDimensionId(null)
            setRef(null)
        }
        setDialogIsOpen(!dialogIsOpen)
    }

    const openOptionsMenuForDimension = (event, id, ref) => {
        event.stopPropagation()
        setRef(ref.current)
        setDimensionId(id)
        toggleMenu()
    }

    const getNumberOfDimensionItems = () =>
        (itemsByDimension[dimensionId] || []).length

    return (
        <div style={styles.divContainer}>
            <DndDimensionsPanel
                onDimensionOptionsClick={openOptionsMenuForDimension}
            />
            {dialogIsOpen && dimensionId && ref && (
                <Popover
                    reference={ref}
                    placement="bottom-start"
                    onClickOutside={toggleMenu}
                    arrow={false}
                >
                    <DimensionMenu
                        dimensionId={dimensionId}
                        currentAxisId={getCurrentAxisId(dimensionId)}
                        visType={ui.type}
                        numberOfDimensionItems={getNumberOfDimensionItems()}
                        isAssignedCategoriesInLayout={
                            layoutHasAssignedCategories
                        }
                        assignedCategoriesItemHandler={destination =>
                            assignedCategoriesItemHandler(
                                layoutHasAssignedCategories,
                                destination
                            )
                        }
                        axisItemHandler={axisItemHandler}
                        removeItemHandler={removeItemHandler}
                        onClose={toggleMenu}
                        dataTest={'dimensions-panel-dimension-menu'}
                    />
                </Popover>
            )}
            <DialogManager />
        </div>
    )
}

Dimensions.propTypes = {
    assignedCategoriesItemHandler: PropTypes.func,
    axisItemHandler: PropTypes.func,
    getCurrentAxisId: PropTypes.func,
    itemsByDimension: PropTypes.object,
    layoutHasAssignedCategories: PropTypes.bool,
    removeItemHandler: PropTypes.func,
    ui: PropTypes.object,
}

const mapStateToProps = state => ({
    ui: fromReducers.fromUi.sGetUi(state),
    dimensions: fromReducers.fromDimensions.sGetDimensions(state),
    layout: fromReducers.fromUi.sGetUiLayout(state),
    itemsByDimension: fromReducers.fromUi.sGetUiItems(state),
    layoutHasAssignedCategories: fromReducers.fromUi.sLayoutHasAssignedCategories(
        state
    ),
    getCurrentAxisId: dimensionId =>
        fromReducers.fromUi.sGetAxisIdByDimensionId(state, dimensionId),
})

const mapDispatchToProps = dispatch => ({
    axisItemHandler: ({
        dimensionId,
        axisId,
        numberOfDimensionItems,
        requireItems,
        isDimensionInLayout,
    }) => {
        dispatch(acAddUiLayoutDimensions({ [dimensionId]: { axisId } }))

        if (
            numberOfDimensionItems === 0 &&
            requireItems &&
            !isDimensionInLayout
        ) {
            dispatch(acSetUiActiveModalDialog(dimensionId))
        }
    },
    removeItemHandler: dimensionId => {
        dispatch(acRemoveUiLayoutDimensions(dimensionId))
    },
    assignedCategoriesItemHandler: (layoutHasAssignedCategories, axisId) => {
        dispatch(
            layoutHasAssignedCategories
                ? acRemoveUiLayoutDimensions(DIMENSION_ID_ASSIGNED_CATEGORIES)
                : acAddUiLayoutDimensions({
                      [DIMENSION_ID_ASSIGNED_CATEGORIES]: { axisId },
                  })
        )
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Dimensions)
