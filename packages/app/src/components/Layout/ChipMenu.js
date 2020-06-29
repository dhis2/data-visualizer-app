import React from 'react'
import { connect } from 'react-redux'
import {
    DimensionMenu,
    DIMENSION_ID_ASSIGNED_CATEGORIES,
} from '@dhis2/analytics'
import PropTypes from 'prop-types'
import * as fromReducers from '../../reducers'

import MoreHorizontalIcon from '../../assets/MoreHorizontalIcon'
import { styles } from './styles/Menu.style'
import {
    acAddUiLayoutDimensions,
    acRemoveUiLayoutDimensions,
} from '../../actions/ui'
import IconButton from '../IconButton/IconButton'

class ChipMenu extends React.Component {
    state = {
        anchorEl: null,
    }

    handleClick = event => {
        event.stopPropagation()
        this.setState({ anchorEl: event.currentTarget })
    }

    handleClose = () => {
        // event.stopPropagation();
        this.setState({ anchorEl: null })
    }

    getMenuId = () => `menu-for-${this.props.id}`

    render() {
        return (
            <React.Fragment>
                <IconButton
                    ariaOwns={this.state.anchorEl ? this.getMenuId() : null}
                    ariaHaspopup={true}
                    onClick={this.handleClick}
                    style={styles.icon}
                >
                    <MoreHorizontalIcon style={styles.icon} />
                </IconButton>
                {/* TODO: Fix bug with the first menu item getting selected when the menu is opened */}
                <DimensionMenu
                    dimensionId={this.props.dimensionId}
                    currentAxisId={this.props.currentAxisId}
                    visType={this.props.visType}
                    numberOfDimensionItems={this.props.numberOfDimensionItems}
                    isAssignedCategoriesInLayout={
                        this.props.layoutHasAssignedCategories
                    }
                    assignedCategoriesItemHandler={destination =>
                        this.props.assignedCategoriesItemHandler(
                            this.props.layoutHasAssignedCategories,
                            destination
                        )
                    }
                    axisItemHandler={this.props.axisItemHandler}
                    removeItemHandler={this.props.removeItemHandler}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleClose}
                />
            </React.Fragment>
        )
    }
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
