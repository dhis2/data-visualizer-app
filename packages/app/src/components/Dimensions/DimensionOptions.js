import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';
import MenuItem from '@material-ui/core/MenuItem';
import DropDown from './DropDown';
import MoreHorizontalIcon from '../../assets/MoreHorizontalIcon';
import {
    acAddUiLayoutDimensions,
    acSetUiItems,
    acRemoveUiLayoutDimensions,
    acSetUiActiveModalDialog,
} from '../../actions/ui';
import { styles } from './styles/DimensionOptions.style';
import { sGetUiLayout, sGetUiItems } from '../../reducers/ui';

const items = [
    {
        axisName: 'columns',
        name: i18n.t('Add to series'),
    },
    {
        axisName: 'rows',
        name: i18n.t('Add to category'),
    },
    {
        axisName: 'filters',
        name: i18n.t('Add to filter'),
    },
];

export const OptionsButton = ({ action }) => {
    return (
        <button style={styles.dropDownButton} onClick={action} tabIndex={1}>
            <MoreHorizontalIcon />
        </button>
    );
};

export class DimensionOptions extends Component {
    state = { anchorEl: null };

    handleClick = event => {
        event && event.stopPropagation();
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = event => {
        event && event.stopPropagation();
        this.setState({ anchorEl: null });
        this.props.onClose();
    };

    addDimension = axisName => {
        this.props.onAddDimension({ [this.props.id]: axisName });
        this.handleClose();
        setTimeout(() => this.props.openDialog(this.props.id), 10);
    };

    getMenuItems = () =>
        items.map(option => (
            <MenuItem
                key={option.axisName}
                onClick={() => this.addDimension(option.axisName)}
            >
                {option.name}
            </MenuItem>
        ));

    renderOptionsOnHover = () => {
        return this.props.showButton ? (
            <OptionsButton action={this.handleClick} />
        ) : null;
    };

    render = () => {
        const menuItems = this.getMenuItems();
        const OptionsButton = this.renderOptionsOnHover();

        return (
            <div style={styles.wrapper}>
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
    onAddDimension: PropTypes.func.isRequired,
    openDialog: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    currentLayout: sGetUiLayout(state),
    items: sGetUiItems(state),
});

export default connect(
    mapStateToProps,
    {
        openDialog: id => acSetUiActiveModalDialog(id),
        onAddDimension: dimension => acAddUiLayoutDimensions(dimension),
        removeDimension: dimension => acRemoveUiLayoutDimensions(dimension),
        setUiItems: items => acSetUiItems(items),
    }
)(DimensionOptions);
