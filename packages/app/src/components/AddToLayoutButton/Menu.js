import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Menu from '@material-ui/core/Menu';

import { styles } from './styles/Menu.style';

export const DropDownButton = ({ anchorEl, onClick, onClose, menuItems }) => (
    <Fragment>
        <Button variant="contained" onClick={onClick} style={styles.arrowDown}>
            <ArrowDropDown style={styles.arrowIcon} />
        </Button>
        <Menu
            open={Boolean(anchorEl)}
            onClose={onClose}
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            PaperProps={{ style: styles.paper }}
            MenuListProps={{ style: styles.menuList }}
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
    onClick: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    menuItems: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default DropDownButton;
