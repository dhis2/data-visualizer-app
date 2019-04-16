import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';
import MenuItem from '@material-ui/core/MenuItem';
import DropDown from './DropDown';
import {
    acAddUiLayoutDimensions,
    acRemoveUiLayoutDimensions,
    acSetUiActiveModalDialog,
} from '../../../actions/ui';
import { sGetUiLayout, sGetUiItemsByDimension } from '../../../reducers/ui';
import { menuLabels, ADD_TO_LAYOUT_OPTIONS } from '../../../modules/layout';
import { isYearOverYear } from '../../../modules/chartTypes';

const FILTER = 2;
const emptyItems = [];

export class DimensionOptions extends Component {
    addDimension = axisName => {
        this.props.onAddDimension({ [this.props.id]: axisName });

        if (!this.props.items.length) {
            this.props.openDialog(this.props.id);
        }
        this.props.onCloseMenu();
    };

    removeDimension = id => {
        this.props.removeDimension(id);
        this.props.onCloseMenu();
    };

    getAddToItems = () => {
        let items = [];

        if (isYearOverYear(this.props.type)) {
            items = [
                this.renderMenuItem(
                    `add-to-${this.props.id}`,
                    ADD_TO_LAYOUT_OPTIONS[FILTER].axisKey,
                    this.addDimension,
                    ADD_TO_LAYOUT_OPTIONS[FILTER].name
                ),
            ];
        } else {
            items = Object.values(
                ADD_TO_LAYOUT_OPTIONS.map(axis =>
                    this.renderMenuItem(
                        `add-to-${axis.axisKey}`,
                        axis.axisKey,
                        this.addDimension,
                        axis.name
                    )
                )
            );
        }
        return items;
    };

    getMoveToItems = () => {
        if (isYearOverYear(this.props.type)) {
            return [];
        }

        const layout = Object.entries(this.props.currentLayout);
        const items = layout.filter(
            ([key, axisIds]) => !axisIds.includes(this.props.id)
        );

        return items.map(([key, axisIds]) => {
            const label = menuLabels[key];

            return this.renderMenuItem(
                `${this.props.id}-to-${key}`,
                key,
                this.addDimension,
                `${i18n.t(`Move to ${label}`, { label })}`
            );
        });
    };

    getRemoveMenuItem = () =>
        this.renderMenuItem(
            `remove-${this.props.id}`,
            this.props.id,
            this.removeDimension,
            i18n.t('Remove')
        );

    getMenuItems = () =>
        this.props.isSelected
            ? [...this.getMoveToItems(), this.getRemoveMenuItem()]
            : this.getAddToItems();

    renderMenuItem = (key, id, onClick, displayName) => (
        <MenuItem key={key} onClick={() => onClick(id)}>
            {displayName}
        </MenuItem>
    );

    render() {
        const { id, anchorEl, onCloseMenu } = this.props;

        const menuItems = this.getMenuItems();

        return (
            <DropDown
                id={id}
                anchorEl={anchorEl}
                onClose={onCloseMenu}
                menuItems={menuItems}
            />
        );
    }
}

DimensionOptions.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    anchorEl: PropTypes.object.isRequired,
    isSelected: PropTypes.bool.isRequired,
    currentLayout: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    onAddDimension: PropTypes.func.isRequired,
    openDialog: PropTypes.func.isRequired,
    onCloseMenu: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    currentLayout: sGetUiLayout(state),
    items: sGetUiItemsByDimension(state, ownProps.id) || emptyItems,
});

export default connect(
    mapStateToProps,
    {
        openDialog: id => acSetUiActiveModalDialog(id),
        onAddDimension: dimension => acAddUiLayoutDimensions(dimension),
        removeDimension: dimension => acRemoveUiLayoutDimensions(dimension),
    }
)(DimensionOptions);
