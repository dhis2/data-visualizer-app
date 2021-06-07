import PropTypes from '@dhis2/prop-types'
import React from 'react'
import styles from './styles/MenuButton.module.css'

const MenuButton = ({
    children,
    dataTest,
    disabled,
    name,
    onBlur,
    onClick,
    onFocus,
}) => (
    <button
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
