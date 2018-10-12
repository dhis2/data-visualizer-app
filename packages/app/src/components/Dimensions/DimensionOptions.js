import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';
import MenuItem from '@material-ui/core/MenuItem';
import DropDown from './DropDown';
import { MoreHorizontal } from './icons';
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
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
        this.props.onClose();
    };

    addDimension = axisName => {
        this.props.onAddDimension({ [this.props.id]: axisName });
        this.handleClose();
    };

    getMenuItems = () => {
        return items.map(option => (
            <MenuItem
                key={option.axisName}
                onClick={() => this.addDimension(option.axisName)}
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
        const OptionsButton = this.renderOptionsOnHover();

        return (
            <div style={style.wrapper}>
                {OptionsButton}
                <DropDown
                    id={this.props.id}
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
