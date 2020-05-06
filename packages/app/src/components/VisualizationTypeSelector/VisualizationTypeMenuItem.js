import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';

import { getChartTypeDisplayName, chartTypes } from '../../modules/chartTypes';
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
            primary={getChartTypeDisplayName(type)}
            disableTypography={true}
            style={styles.listItemText}
        />
    </MenuItem>
);

VisualizationTypeMenuItem.propTypes = {
    type: PropTypes.oneOf(chartTypes),
    visualizationType: PropTypes.oneOf(chartTypes),
    styles: PropTypes.object,
};

export default VisualizationTypeMenuItem;
