import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import {
    getAvailableAxes,
    getAxisNameByLayoutType,
    getLayoutTypeByVisType,
} from '@dhis2/analytics'

import Menu from './Menu'
import { sGetUiActiveModalDialog, sGetUiType } from '../../../../reducers/ui'
import { acAddUiLayoutDimensions } from '../../../../actions/ui'

import styles from './styles/AddToLayoutButton.style'
import i18n from '@dhis2/d2-i18n'

export class AddToLayoutButton extends Component {
    constructor(props) {
        super(props)
        this.buttonRef = React.createRef()
    }

    state = { anchorEl: null }

    onClose = () => this.setState({ anchorEl: null })

    onToggle = event =>
        this.state.anchorEl
            ? this.onClose()
            : this.setState({ anchorEl: event.currentTarget })

    onUpdate = axisId => {
        this.props.onAddDimension({
            [this.props.dialogId]: { axisId },
        })

        this.props.onClick()
    }

    renderMenuItems = () =>
        getAvailableAxes(this.props.visType)
            .slice(1)
            .map(axis => (
                <MenuItem
                    className={this.props.classes.menuItem}
                    component="li"
                    key={axis}
                    onClick={() => this.onUpdate(axis)}
                >
                    {i18n.t(`Add to {{axisName}}`, {
                        axisName: getAxisNameByLayoutType(
                            axis,
                            getLayoutTypeByVisType(this.props.visType)
                        ),
                    })}
                </MenuItem>
            ))

    render() {
        const availableAxis = getAvailableAxes(this.props.visType)

        return (
            <div ref={addToRef => (this.buttonRef = addToRef)}>
                <Button
                    className={this.props.classes.button}
                    variant="contained"
                    color="primary"
                    disableRipple
                    disableFocusRipple
                    onClick={() => this.onUpdate(availableAxis[0])}
                >
                    {i18n.t(`Add to {{axisName}}`, {
                        axisName: getAxisNameByLayoutType(
                            availableAxis[0],
                            getLayoutTypeByVisType(this.props.visType)
                        ),
                    })}
                </Button>
                {availableAxis.length > 1 ? (
                    <Menu
                        onClose={this.onClose}
                        onClick={this.onToggle}
                        anchorEl={this.state.anchorEl}
                        menuItems={this.renderMenuItems()}
                        addToButtonRef={this.buttonRef}
                    />
                ) : null}
            </div>
        )
    }
}

AddToLayoutButton.propTypes = {
    classes: PropTypes.object.isRequired,
    dialogId: PropTypes.string.isRequired,
    visType: PropTypes.string.isRequired,
    onAddDimension: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    visType: sGetUiType(state),
    dialogId: sGetUiActiveModalDialog(state),
})

export default connect(mapStateToProps, {
    onAddDimension: acAddUiLayoutDimensions,
})(withStyles(styles)(AddToLayoutButton))
