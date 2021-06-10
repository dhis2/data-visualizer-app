import PropTypes from 'prop-types'
import React from 'react'
import ListItemIcon from './ListItemIcon'
import styles from './styles/VisualizationTypeSelector.module.css'

const VisualizationTypeListItem = ({
    iconType,
    label,
    description,
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
            <div className={styles.listItemIcon}>
                {
                    <ListItemIcon
                        iconType={iconType}
                        style={{ width: 48, height: 48 }}
                    />
                }
            </div>
            <div className={styles.listItemText}>
                <p className={styles.listItemName}>{label}</p>
                <p className={styles.listItemDescription}>{description}</p>
            </div>
        </div>
    )
}

VisualizationTypeListItem.propTypes = {
    description: PropTypes.string,
    disabled: PropTypes.bool,
    iconType: PropTypes.string,
    isSelected: PropTypes.bool,
    label: PropTypes.string,
    onClick: PropTypes.func,
}

export default VisualizationTypeListItem
