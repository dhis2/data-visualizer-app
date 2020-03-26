import React from 'react'
import PropTypes from 'prop-types'

import MenuItemIcon from './MenuItemIcon'

import styles from './styles/VisualizationTypeSelector.module.css'

const VisualizationTypeListItem = ({
    iconType,
    label,
    disabled,
    isSelected,
    onClick,
}) => {
    const classNames = [styles.listItem]

    if (isSelected) {
        classNames.push(styles.listItemActive)
    }

    if (disabled) {
        classNames.push(styles.listItemDisabled)
    }

    return (
        <div className={classNames.join(' ')} onClick={onClick}>
            <span className={styles.listItemIcon}>
                {
                    <MenuItemIcon
                        iconType={iconType}
                        style={{ width: 48, height: 48 }}
                    />
                }
            </span>
            <span className={styles.listItemText}>{label}</span>
        </div>
    )
}

VisualizationTypeListItem.propTypes = {
    disabled: PropTypes.bool,
    iconType: PropTypes.string,
    isSelected: PropTypes.bool,
    label: PropTypes.string,
    onClick: PropTypes.func,
}

export default VisualizationTypeListItem
