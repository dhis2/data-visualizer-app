import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles/DropDownButton.style'

export const DropDownButton = ({ classes, onClick, open }) => (
    <Button
        className={classes.arrowDown}
        color="primary"
        variant="contained"
        disableRipple
        disableFocusRipple
        onClick={onClick}
    >
        {open ? (
            <ArrowDropUp className={classes.arrowIcon} />
        ) : (
            <ArrowDropDown className={classes.arrowIcon} />
        )}
    </Button>
)

DropDownButton.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(DropDownButton)
