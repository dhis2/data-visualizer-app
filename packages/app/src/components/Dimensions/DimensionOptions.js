import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MenuItem } from '@material-ui/core';
import DropDown from './DropDown';
import { MoreHorizontal } from './icons';
import i18n from '@dhis2/d2-i18n';
import { acAddUiLayoutDimensions } from '../../actions/ui';

const style = {
    wrapper: {
        height: 24,
    },
    dropDownButton: {
        border: 'none',
        background: 'none',
        outline: 'none',
        padding: 0,
        height: 24,
    },
    renderPos: {
        left: 5,
    },
};

const items = [
    {
        axisName: 'columns',
        displayName: i18n.t('Add to series'),
    },
    {
        axisName: 'rows',
        displayName: i18n.t('Add to category'),
    },
    {
        axisName: 'filters',
        displayName: i18n.t('Add to filter'),
    },
];

export const OptionsButton = ({ action }) => {
    return (
        <button style={style.dropDownButton} onClick={action} tabIndex={1}>
            <MoreHorizontal />
        </button>
    );
};

export class DimensionOptions extends Component {
    state = { anchorEl: null };

    handleClick = event => {
        event.stopPropagation();
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = event => {
        event.stopPropagation();
        this.setState({ anchorEl: null });
        this.props.onClose();
    };

    addDimension = (event, axisName) => {
        this.props.onAddDimension({ [this.props.id]: axisName });
        this.handleClose(event);
    };

    getMenuId = () => `menu-for-${this.props.id}`;

    getMenuItems = () => {
        return items.map(option => (
            <MenuItem
                key={option.axisName}
                onClick={event => this.addDimension(event, option.axisName)}
            >
                {option.displayName}
            </MenuItem>
        ));
    };

    renderOptionsOnHover = () => {
        return this.props.showButton ? (
            <OptionsButton action={this.handleClick} />
        ) : null;
    };

    render = () => {
        const menuItems = this.getMenuItems();
        const menuId = this.getMenuId();
        const OptionsButton = this.renderOptionsOnHover();

        return (
            <div style={style.wrapper}>
                {OptionsButton}
                <DropDown
                    id={menuId}
                    anchorEl={this.state.anchorEl}
                    handleClose={this.handleClose}
                    menuItems={menuItems}
                />
            </div>
        );
    };
}

DimensionOptions.propTypes = {
    id: PropTypes.string.isRequired,
    showButton: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default connect(
    null,
    {
        onAddDimension: dimension => acAddUiLayoutDimensions(dimension),
    }
)(DimensionOptions);
