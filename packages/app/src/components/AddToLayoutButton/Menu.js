import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles/Menu.style';

export const DropDownButton = ({
    anchorEl,
    classes,
    onClick,
    onClose,
    menuItems,
}) => (
    <Fragment>
        <Button
            className={classes.arrowDown}
            color="primary"
            variant="contained"
            disableRipple
            disableFocusRipple
            onClick={onClick}
        >
            <ArrowDropDown className={classes.arrowIcon} />
        </Button>
        <Menu
            open={Boolean(anchorEl)}
            onClose={onClose}
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            classes={{ paper: classes.paper }}
            MenuListProps={{ className: classes.menuList }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            {menuItems}
        </Menu>
    </Fragment>
);

DropDownButton.defaultProps = {
    anchorEl: null,
};

DropDownButton.propTypes = {
    anchorEl: PropTypes.object,
    classes: PropTypes.object.isRequired,
    menuItems: PropTypes.arrayOf(PropTypes.element).isRequired,
    onClick: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(DropDownButton);
