import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import DropDownButton from './DropDownButton';
import styles from './styles/Menu.style';

const MENU_HEIGHT = 100;
const ADD_TO_BUTTON_MARGIN = 5;

export const DropDown = ({
    anchorEl,
    classes,
    onClick,
    onClose,
    menuItems,
    addToButtonRef,
}) => {
    const menuWidth = addToButtonRef.offsetWidth - ADD_TO_BUTTON_MARGIN;

    const isOverFlowing =
        anchorEl &&
        anchorEl.getBoundingClientRect().bottom + MENU_HEIGHT >
            window.innerHeight;

    const anchorOrigin = isOverFlowing
        ? { vertical: 'top', horizontal: 'right' }
        : { vertical: 'bottom', horizontal: 'right' };

    const transformOrigin = isOverFlowing
        ? { vertical: 'bottom', horizontal: 'right' }
        : { vertical: 'top', horizontal: 'right' };

    return (
        <Fragment>
            <DropDownButton onClick={onClick} open={Boolean(anchorEl)} />
            <Menu
                open={Boolean(anchorEl)}
                onClose={onClose}
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                MenuListProps={{
                    style: { minWidth: menuWidth },
                    className: classes.menuList,
                }}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
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
    addToButtonRef: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    menuItems: PropTypes.arrayOf(PropTypes.element).isRequired,
    onClick: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(DropDown);
