import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import DropDownButton from './DropDownButton';
import styles from './styles/Menu.style';

export const DropDown = ({
    anchorEl,
    classes,
    onClick,
    onClose,
    menuItems,
}) => {
    const isOverFowing =
        anchorEl !== null &&
        anchorEl.getBoundingClientRect().bottom + 100 > window.innerHeight;

    return (
        <Fragment>
            <DropDownButton onClick={onClick} open={Boolean(anchorEl)} />
            <Menu
                open={Boolean(anchorEl)}
                onClose={onClose}
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                MenuListProps={{ className: classes.menuList }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                marginThreshold={isOverFowing ? 100 : 0}
            >
                {menuItems}
            </Menu>
        </Fragment>
    );
};
DropDown.defaultProps = {
    anchorEl: null,
};

DropDown.propTypes = {
    anchorEl: PropTypes.object,
    classes: PropTypes.object.isRequired,
    menuItems: PropTypes.arrayOf(PropTypes.element).isRequired,
    onClick: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(DropDown);
