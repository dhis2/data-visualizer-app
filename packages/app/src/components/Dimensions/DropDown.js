import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';

export const DropDown = ({ id, anchorEl, handleClose, menuItems }) => {
    return (
        <Menu
            id={id}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            {menuItems}
        </Menu>
    );
};

DropDown.propTypes = {
    id: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    menuItems: PropTypes.array.isRequired,
};

export default DropDown;
