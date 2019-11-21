import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';

import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import MenuItemIcon from './MenuItemIcon';

const VisualizationTypeMenuItem = ({
    iconType,
    styles,
    label,
    isSelected,
    ...props
}) => (
    <MenuItem
        selected={Boolean(isSelected)}
        style={styles.menuItem}
        disableRipple
        {...props}
    >
        <ListItemIcon style={styles.listItemIcon}>
            <MenuItemIcon iconType={iconType} style={styles.listItemSvg} />
        </ListItemIcon>
        <ListItemText
            primary={label}
            disableTypography={true}
            style={styles.listItemText}
        />
    </MenuItem>
);

VisualizationTypeMenuItem.propTypes = {
    iconType: PropTypes.string,
    styles: PropTypes.object,
    label: PropTypes.string,
    isSelected: PropTypes.bool,
};

export default VisualizationTypeMenuItem;
