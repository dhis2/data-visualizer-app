import { AlertBar } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { acClearSnackbar } from '../../actions/snackbar.js'
import { sGetSnackbar } from '../../reducers/snackbar.js'
import styles from './styles/Snackbar.module.css'

export const VARIANT_ERROR = 'error'
export const VARIANT_SUCCESS = 'success'
export const VARIANT_WARNING = 'warning'

export const UnconnectedSnackbar = ({ snackbar, onClose }) => {
    const { variant, message, duration } = snackbar

    return (
        message && (
            <div className={styles.container}>
                <AlertBar
                    duration={duration}
                    critical={variant === VARIANT_ERROR}
                    success={variant === VARIANT_SUCCESS}
                    warning={variant === VARIANT_WARNING}
                    permanent={
                        variant === VARIANT_ERROR || variant === VARIANT_WARNING
                    }
                    onHidden={onClose}
                >
                    {message}
                </AlertBar>
            </div>
        )
    )
}

UnconnectedSnackbar.propTypes = {
    snackbar: PropTypes.object,
    onClose: PropTypes.func,
}

const mapStateToProps = (state) => ({
    snackbar: sGetSnackbar(state),
})

const mapDispatchToProps = (dispatch) => ({
    onClose: () => dispatch(acClearSnackbar()),
})

export const Snackbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(UnconnectedSnackbar)
