import React from 'react'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import { DimensionMenu } from '@dhis2/analytics'
import PropTypes from 'prop-types'

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
    axisItemHandler: PropTypes.func,
    currentAxisId: PropTypes.string,
    dimensionId: PropTypes.string,
    dualAxisItemHandler: PropTypes.func,
    id: PropTypes.string,
    numberOfDimensionItems: PropTypes.number,
    removeItemHandler: PropTypes.func,
    visType: PropTypes.string,
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
})

export default connect(null, mapDispatchToProps)(ChipMenu)
