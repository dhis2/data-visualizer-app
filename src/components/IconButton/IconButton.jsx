import PropTypes from 'prop-types'
import React from 'react'
import styles from './styles/IconButton.module.css'

const IconButton = ({
    children,
    dataTest,
    disabled,
    name,
    onBlur,
    onClick,
    onFocus,
    ariaOwns,
    ariaHaspopup,
}) => (
    <button
        className={styles.iconButton}
        data-test={dataTest}
        disabled={disabled}
        name={name}
        onBlur={onBlur}
        onClick={onClick}
        onFocus={onFocus}
        aria-owns={ariaOwns}
        aria-haspopup={ariaHaspopup}
    >
        {children}
    </button>
)

IconButton.propTypes = {
    ariaHaspopup: PropTypes.bool,
    ariaOwns: PropTypes.string,
    children: PropTypes.node,
    dataTest: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
}

export default IconButton
