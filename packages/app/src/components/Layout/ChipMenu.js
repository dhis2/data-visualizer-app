import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    DimensionMenu,
    DIMENSION_ID_ASSIGNED_CATEGORIES,
} from '@dhis2/analytics'
import { Layer, Popper } from '@dhis2/ui'

import * as fromReducers from '../../reducers'
import MoreHorizontalIcon from '../../assets/MoreHorizontalIcon'
import { styles } from './styles/Menu.style'
import {
    acAddUiLayoutDimensions,
    acRemoveUiLayoutDimensions,
} from '../../actions/ui'
import IconButton from '../IconButton/IconButton'

const ChipMenu = ({
    assignedCategoriesItemHandler,
    axisItemHandler,
    currentAxisId,
    dimensionId,
    id,
    layoutHasAssignedCategories,
    numberOfDimensionItems,
    removeItemHandler,
    visType,
}) => {
    const buttonRef = useRef()
    const [dialogIsOpen, setDialogIsOpen] = useState(false)

    const toggleMenu = () => setDialogIsOpen(!dialogIsOpen)

    const getMenuId = () => `menu-for-${id}`

    return (
        <>
            <div ref={buttonRef}>
                <IconButton
                    ariaOwns={dialogIsOpen ? getMenuId() : null}
                    ariaHaspopup={true}
                    onClick={toggleMenu}
                    style={styles.icon}
                    dataTest={`layout-chip-menu-button-${dimensionId}`}
                >
                    <MoreHorizontalIcon style={styles.icon} />
                </IconButton>
            </div>
            {/* TODO: Fix bug with the first menu item getting selected when the menu is opened */}
            {dialogIsOpen && (
                <Layer position="fixed" level={2000} onClick={toggleMenu}>
                    <Popper reference={buttonRef} placement="bottom-start">
                        <DimensionMenu
                            dimensionId={dimensionId}
                            currentAxisId={currentAxisId}
                            visType={visType}
                            numberOfDimensionItems={numberOfDimensionItems}
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
                            dataTest={'layout-chip-menu-dimension-menu'}
                        />
                    </Popper>
                </Layer>
            )}
        </>
    )
}

ChipMenu.propTypes = {
    assignedCategoriesItemHandler: PropTypes.func,
    axisItemHandler: PropTypes.func,
    currentAxisId: PropTypes.string,
    dimensionId: PropTypes.string,
    id: PropTypes.string,
    layoutHasAssignedCategories: PropTypes.bool,
    numberOfDimensionItems: PropTypes.number,
    removeItemHandler: PropTypes.func,
    visType: PropTypes.string,
}

const mapStateToProps = state => {
    return {
        layoutHasAssignedCategories: fromReducers.fromUi.sLayoutHasAssignedCategories(
            state
        ),
    }
}

const mapDispatchToProps = dispatch => ({
    axisItemHandler: ({ dimensionId, axisId }) => {
        dispatch(acAddUiLayoutDimensions({ [dimensionId]: { axisId } }))
    },
    removeItemHandler: dimensionId => {
        dispatch(acRemoveUiLayoutDimensions(dimensionId))
    },
    assignedCategoriesItemHandler: (layoutHasAssignedCategories, axisId) => {
        dispatch(
            layoutHasAssignedCategories
                ? acRemoveUiLayoutDimensions(DIMENSION_ID_ASSIGNED_CATEGORIES)
                : acAddUiLayoutDimensions({
                      [DIMENSION_ID_ASSIGNED_CATEGORIES]: {
                          axisId,
                      },
                  })
        )
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(ChipMenu)
