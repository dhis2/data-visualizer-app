import React from 'react'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import {
    DimensionMenu,
    DIMENSION_ID_ASSIGNED_CATEGORIES,
    AXIS_ID_FILTERS,
} from '@dhis2/analytics'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import * as fromReducers from '../../reducers'

import MoreHorizontalIcon from '../../assets/MoreHorizontalIcon'
import { styles } from './styles/Menu.style'
import {
    acSetUiActiveModalDialog,
    acAddUiLayoutDimensions,
    acRemoveUiLayoutDimensions,
} from '../../actions/ui'
import { AXIS_SETUP_DIALOG_ID } from '../AxisSetup/AxisSetup'

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

    isAssignedCategoriesDimensionInLayout = dimensions =>
        dimensions.includes(DIMENSION_ID_ASSIGNED_CATEGORIES)

    render() {
        return (
            <React.Fragment>
                <IconButton
                    aria-owns={this.state.anchorEl ? this.getMenuId() : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    style={styles.icon}
                >
                    <MoreHorizontalIcon style={styles.icon} />
                </IconButton>
                <DimensionMenu
                    dimensionId={this.props.dimensionId}
                    currentAxisId={this.props.currentAxisId}
                    visType={this.props.visType}
                    numberOfDimensionItems={this.props.numberOfDimensionItems}
                    dualAxisItemHandler={this.props.dualAxisItemHandler}
                    assignedCategoriesItemHandler={
                        () =>
                            this.props.assignedCategoriesItemHandler(
                                this.isAssignedCategoriesDimensionInLayout(
                                    this.props.selectedIds
                                )
                            ) // AC TODO: Move this to a central reusable location
                    }
                    assignedCategoriesItemLabel={
                        this.isAssignedCategoriesDimensionInLayout(
                            this.props.selectedIds
                        )
                            ? i18n.t('Exclude categories in layout')
                            : i18n.t('Include categories in layout')
                        // AC TODO: Move this to a central reusable location
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
    dualAxisItemHandler: PropTypes.func,
    id: PropTypes.string,
    numberOfDimensionItems: PropTypes.number,
    removeItemHandler: PropTypes.func,
    selectedIds: PropTypes.array,
    visType: PropTypes.string,
}

const mapStateToProps = state => {
    return {
        selectedIds: fromReducers.fromUi.sGetDimensionIdsFromLayout(state),
    }
}

const mapDispatchToProps = dispatch => ({
    dualAxisItemHandler: () =>
        dispatch(acSetUiActiveModalDialog(AXIS_SETUP_DIALOG_ID)),
    axisItemHandler: (dimensionId, targetAxisId) => {
        dispatch(acAddUiLayoutDimensions({ [dimensionId]: targetAxisId }))
    },
    removeItemHandler: dimensionId => {
        dispatch(acRemoveUiLayoutDimensions(dimensionId))
    },
    assignedCategoriesItemHandler: isAssignedCategoriesDimensionInLayout => {
        dispatch(
            isAssignedCategoriesDimensionInLayout
                ? acRemoveUiLayoutDimensions(DIMENSION_ID_ASSIGNED_CATEGORIES)
                : acAddUiLayoutDimensions({
                      [DIMENSION_ID_ASSIGNED_CATEGORIES]: AXIS_ID_FILTERS,
                  })
        )
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(ChipMenu)
