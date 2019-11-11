import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { visTypeDisplayNames } from '@dhis2/analytics';

import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import VisualizationTypeIcon from './VisualizationTypeIcon';

const VisualizationTypeMenuItem = ({
    type,
    visualizationType,
    styles,
    ...props
}) => (
    <MenuItem
        selected={type === visualizationType}
        style={styles.menuItem}
        disableRipple
        {...props}
    >
        <ListItemIcon style={styles.listItemIcon}>
            <VisualizationTypeIcon type={type} style={styles.listItemSvg} />
        </ListItemIcon>
        <ListItemText
            primary={visTypeDisplayNames[type]}
            disableTypography={true}
            style={styles.listItemText}
        />
    </MenuItem>
);

VisualizationTypeMenuItem.propTypes = {
    type: PropTypes.oneOf(Object.keys(visTypeDisplayNames)),
    visualizationType: PropTypes.oneOf(Object.keys(visTypeDisplayNames)),
    styles: PropTypes.object,
};

export default VisualizationTypeMenuItem;
