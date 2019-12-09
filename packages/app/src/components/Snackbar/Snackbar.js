import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MUISnackbar from '@material-ui/core/Snackbar'
import MUISnackbarContent from '@material-ui/core/SnackbarContent'
import { withStyles } from '@material-ui/core/styles'

import InfoIcon from '@material-ui/icons/InfoOutlined'
import CloseIcon from '@material-ui/icons/Close'
import { sGetSnackbar } from '../../reducers/snackbar'
import { tDoCloseSnackbar } from '../../actions'
import styles from './styles/Snackbar.style'

export const VARIANT_INFORMATION = 'information'
export const VARIANT_WARNING = 'warning'
export const VARIANT_ERROR = 'error'

export const Snackbar = ({
    classes,
    variant,
    open,
    message,
    duration,
    onClose,
}) => (
    <MUISnackbar open={open} autoHideDuration={duration} onClose={onClose}>
        <MUISnackbarContent
            className={classes[variant]}
            message={
                <span className={classes.container}>
                    {variant === VARIANT_ERROR ? (
                        <InfoIcon className={classes.icon} />
                    ) : null}
                    {message}
                    {variant === VARIANT_WARNING ? (
                        <CloseIcon
                            className={classes.closeIcon}
                            onClick={onClose}
                        />
                    ) : null}
                </span>
            }
        />
    </MUISnackbar>
)

Snackbar.propTypes = {
    classes: PropTypes.object.isRequired,
    variant: PropTypes.oneOf([
        VARIANT_INFORMATION,
        VARIANT_WARNING,
        VARIANT_ERROR,
    ]).isRequired,
    duration: PropTypes.number,
    message: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
}

const mapStateToProps = state => {
    const { variant, message, duration, open } = sGetSnackbar(state)

    return {
        variant,
        open,
        message,
        duration,
    }
}

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(tDoCloseSnackbar()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Snackbar))
