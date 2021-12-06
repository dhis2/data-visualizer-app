import {
    DimensionMenu,
    DIMENSION_ID_ASSIGNED_CATEGORIES,
} from '@dhis2/analytics'
import { Layer, Popper, IconMore16 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import {
    acAddUiLayoutDimensions,
    acRemoveUiLayoutDimensions,
} from '../../actions/ui'
import * as fromReducers from '../../reducers'
import IconButton from '../IconButton/IconButton'
import { styles } from './styles/Menu.style'

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
    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const toggleMenu = () => setMenuIsOpen(!menuIsOpen)

    const getMenuId = () => `menu-for-${id}`

    return (
        <>
            <div ref={buttonRef}>
                <IconButton
                    ariaOwns={menuIsOpen ? getMenuId() : null}
                    ariaHaspopup={true}
                    onClick={toggleMenu}
                    style={styles.icon}
                    dataTest={`layout-chip-menu-button-${dimensionId}`}
                >
                    <IconMore16 color="var(--colors-grey700)" />
                </IconButton>
            </div>
            {/* TODO: Fix bug with the first menu item getting selected when the menu is opened */}
            {menuIsOpen && (
                <Layer onClick={toggleMenu}>
                    <Popper reference={buttonRef} placement="bottom-start">
                        <DimensionMenu
                            dimensionId={dimensionId}
                            currentAxisId={currentAxisId}
                            visType={visType}
                            numberOfDimensionItems={numberOfDimensionItems}
                            isAssignedCategoriesInLayout={
                                layoutHasAssignedCategories
                            }
                            assignedCategoriesItemHandler={(destination) =>
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

const mapStateToProps = (state) => {
    return {
        layoutHasAssignedCategories:
            fromReducers.fromUi.sLayoutHasAssignedCategories(state),
    }
}

const mapDispatchToProps = (dispatch) => ({
    axisItemHandler: ({ dimensionId, axisId }) => {
        dispatch(acAddUiLayoutDimensions({ [dimensionId]: { axisId } }))
    },
    removeItemHandler: (dimensionId) => {
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
