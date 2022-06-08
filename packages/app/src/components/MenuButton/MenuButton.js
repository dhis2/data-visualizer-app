import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styles from './styles/MenuButton.module.css'

const MenuButton = forwardRef(
    ({ children, dataTest, disabled, name, onBlur, onClick, onFocus }, ref) => (
        <button
            ref={ref}
            className={styles.menuButton}
            data-test={dataTest}
            disabled={disabled}
            name={name}
            onBlur={onBlur}
            onClick={onClick}
            onFocus={onFocus}
        >
            {children}
        </button>
    )
)

MenuButton.displayName = 'MenuButton'

MenuButton.propTypes = {
    children: PropTypes.node,
    dataTest: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
}

export default MenuButton
