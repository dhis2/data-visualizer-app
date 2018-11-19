import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/Button';
import UpdateButton from '../UpdateButton/UpdateButton';
import Menu from './Menu';

import {
    sGetUiLayout,
    sGetUiActiveModalDialog,
    sGetUiType,
} from '../../reducers/ui';
import {
    acSetUiActiveModalDialog,
    acAddUiLayoutDimensions,
} from '../../actions/ui';

import { isYearOverYear } from '../../modules/chartTypes';
import { ADD_TO_LAYOUT_OPTIONS as items } from '../../modules/layout';
import { styles } from './styles/AddToLayoutButton.style';

const UNSELECTED = -1;
const SERIES = 0;
const FILTER = 2;

export class AddToLayoutButton extends Component {
    state = { anchorEl: null, buttonType: UNSELECTED };

    componentDidMount = () => {
        const buttonType = Object.values(this.props.currentLayout).findIndex(
            axisIds => axisIds.includes(this.props.dialogId)
        );

        this.setState({ buttonType });
    };

    onClose = () => this.setState({ anchorEl: null });

    onToggle = event =>
        this.state.anchorEl
            ? this.onClose()
            : this.setState({ anchorEl: event.currentTarget });

    onUpdate = axisName => {
        this.props.onAddDimension({
            [this.props.dialogId]: axisName,
        });
        this.props.closeDialog(null);
    };

    getMenuItems = () =>
        items.slice(1).map(option => (
            <MenuItem
                key={option.axisName}
                variant="contained"
                style={styles.menuItem}
                onClick={() => this.onUpdate(option.axisName)}
            >
                {option.name}
            </MenuItem>
        ));

    getUnselectedButton = () =>
        isYearOverYear(this.props.layoutType) ? (
            <Button
                variant="contained"
                style={styles.button}
                onClick={() => this.onUpdate(items[FILTER].axisName)}
            >
                {items[FILTER].name}
            </Button>
        ) : (
            <Fragment>
                <Button
                    variant="contained"
                    style={styles.button}
                    onClick={() => this.onUpdate(items[SERIES].axisName)}
                >
                    {items[SERIES].name}
                </Button>
                <Menu
                    onClose={this.onClose}
                    onClick={this.onToggle}
                    anchorEl={this.state.anchorEl}
                    menuItems={this.getMenuItems()}
                />
            </Fragment>
        );

    render = () => {
        const displayButton =
            this.state.buttonType === UNSELECTED ? (
                this.getUnselectedButton()
            ) : (
                <UpdateButton
                    className={this.props.className}
                    onClick={() => this.props.closeDialog(null)}
                />
            );

        return displayButton;
    };
}

AddToLayoutButton.propTypes = {
    dialogId: PropTypes.string.isRequired,
    layoutType: PropTypes.string.isRequired,
    currentLayout: PropTypes.object.isRequired,
    onAddDimension: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    dialogId: sGetUiActiveModalDialog(state),
    layoutType: sGetUiType(state),
    currentLayout: sGetUiLayout(state),
});

export default connect(
    mapStateToProps,
    {
        onAddDimension: dimension => acAddUiLayoutDimensions(dimension),
        closeDialog: acSetUiActiveModalDialog,
    }
)(AddToLayoutButton);
