import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import { acAddUiLayoutDimensions } from '../../actions/ui';

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

DropDown.propTypes = {
    renderPos: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onAddDimension: PropTypes.func.isRequired,
};

export default connect(
    null,
    {
        onAddDimension: dimension => acAddUiLayoutDimensions(dimension),
    }
)(DropDown);
