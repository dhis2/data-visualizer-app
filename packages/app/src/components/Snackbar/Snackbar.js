import React from 'react'
import PropTypes from 'prop-types'

import { AlertBar } from '@dhis2/ui-core'

import styles from './styles/Snackbar.module.css'

export const VARIANT_ERROR = 'error'
export const VARIANT_SUCCESS = 'success'
export const VARIANT_WARNING = 'warning'

export const Snackbar = ({ variant, message, duration, onClose }) => (
    <div className={styles.container}>
        <AlertBar
            duration={duration}
            critical={variant === VARIANT_ERROR}
            success={variant === VARIANT_SUCCESS}
            warning={variant === VARIANT_WARNING}
            permanent={variant === VARIANT_ERROR || variant === VARIANT_WARNING}
            onHidden={onClose}
        >
            {message}
        </AlertBar>
    </div>
)

Snackbar.propTypes = {
    duration: PropTypes.number,
    message: PropTypes.string,
    variant: PropTypes.oneOf([VARIANT_ERROR, VARIANT_SUCCESS, VARIANT_WARNING]),
    onClose: PropTypes.func,
}

export default Snackbar
