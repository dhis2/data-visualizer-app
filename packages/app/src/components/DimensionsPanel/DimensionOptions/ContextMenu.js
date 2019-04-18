import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import Zoom from '@material-ui/core/Zoom';

export const ContextMenu = ({ id, anchorEl, onClose, menuItems }) => (
    <Menu
        id={id}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        onExited={onClose}
        transitionDuration={{ enter: 50, exit: 0 }}
        TransitionComponent={Zoom}
    >
        {menuItems}
    </Menu>
);

ContextMenu.defaultProps = {
    anchorEl: null,
};

ContextMenu.propTypes = {
    id: PropTypes.string.isRequired,
    anchorEl: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    menuItems: PropTypes.array.isRequired,
};

export default ContextMenu;
