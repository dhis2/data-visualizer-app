import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';
import MenuItem from '@material-ui/core/MenuItem';
import OptionsButton from '../DimensionOptions/OptionsButton';
import DropDown from './DropDown';
import {
    acAddUiLayoutDimensions,
    acRemoveUiLayoutDimensions,
    acSetUiActiveModalDialog,
} from '../../actions/ui';
import { sGetUiLayout, sGetUiItems } from '../../reducers/ui';
import { axisLabels } from '../../modules/layout';
import { isYearOverYear } from '../../modules/chartTypes';
import { styles } from './styles/DimensionOptions.style';

const FILTER = 'filters';
export class DimensionOptions extends Component {
    state = { anchorEl: null };

    onOpenMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    onCloseMenu = () => {
        this.setState({ anchorEl: null });
        this.props.onCloseMenu();
    };

    addDimension = axisName => {
        this.onCloseMenu();
        this.props.onAddDimension({ [this.props.id]: axisName });

        const items = this.props.items[this.props.id];
        const hasNoItems = Boolean(!items || !items.length);

        if (hasNoItems) {
            this.props.openDialog(this.props.id);
        }
    };

    removeDimension = id => {
        this.onCloseMenu();
        this.props.removeDimension(id);
    };

    getAddToItems = () => [
        isYearOverYear(this.props.type)
            ? this.renderMenuItem(
                  `add-to-${this.props.id}`,
                  FILTER,
                  this.addDimension,
                  `Add to ${axisLabels[FILTER]}`
              )
            : Object.entries(axisLabels).map(([key, label]) =>
                  this.renderMenuItem(
                      `add-to-${key}`,
                      key,
                      this.addDimension,
                      `${i18n.t('Add to')} ${label}`
                  )
              ),
    ];

    getMoveToItems = () => {
        if (isYearOverYear(this.props.type)) {
            return [];
        }
        const layout = Object.entries(this.props.currentLayout);

        return layout
            .filter(([axisKey, axisIds]) => !axisIds.includes(this.props.id))
            .map(([axisKey, axisIds]) =>
                this.renderMenuItem(
                    `${this.props.id}-to-${axisKey}`,
                    axisKey,
                    this.addDimension,
                    `${i18n.t('Move to')} ${axisLabels[axisKey]}`
                )
            );
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

    renderOptionsOnHover = () =>
        this.props.showButton ? (
            <OptionsButton
                style={styles.dropDownButton}
                onClick={this.onOpenMenu}
            />
        ) : null;

    render = () => {
        const menuItems = this.getMenuItems();
        const OptionsButton = this.renderOptionsOnHover();

        return (
            <div style={styles.wrapper}>
                {OptionsButton}
                <DropDown
                    id={this.props.id}
                    anchorEl={this.state.anchorEl}
                    onClose={this.onCloseMenu}
                    menuItems={menuItems}
                />
            </div>
        );
    };
}

DimensionOptions.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    currentLayout: PropTypes.object.isRequired,
    items: PropTypes.object.isRequired,
    showButton: PropTypes.bool.isRequired,
    onAddDimension: PropTypes.func.isRequired,
    openDialog: PropTypes.func.isRequired,
    onCloseMenu: PropTypes.func.isRequired,
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
    }
)(DimensionOptions);
