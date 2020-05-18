import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import UpdateButton from '../../../UpdateButton/UpdateButton';
import Menu from './Menu';

import {
    sGetUi,
    sGetUiLayout,
    sGetUiActiveModalDialog,
    sGetUiType,
} from '../../../../reducers/ui';
import {
    acSetUiActiveModalDialog,
    acAddUiLayoutDimensions,
} from '../../../../actions/ui';
import { acSetCurrentFromUi } from '../../../../actions/current';

import { isYearOverYear } from '../../../../modules/chartTypes';
import { ADD_TO_LAYOUT_OPTIONS } from '../../../../modules/layout';
import styles from './styles/AddToLayoutButton.style';

const UNSELECTED_BUTTON_TYPE = -1;
const seriesItem = ADD_TO_LAYOUT_OPTIONS[0];
const filterItem = ADD_TO_LAYOUT_OPTIONS[2];
const itemsWithoutSeries = ADD_TO_LAYOUT_OPTIONS.filter(
    option => option.axisKey !== 'columns'
);

export class AddToLayoutButton extends Component {
    constructor(props) {
        super(props);
        this.buttonRef = React.createRef();
    }

    state = { anchorEl: null, buttonType: UNSELECTED_BUTTON_TYPE };

    componentDidMount() {
        const buttonType = Object.values(this.props.currentLayout).findIndex(
            axisIds => axisIds.includes(this.props.dialogId)
        );

        this.setState({ buttonType });
    }

    onClose = () => this.setState({ anchorEl: null });

    onToggle = event =>
        this.state.anchorEl
            ? this.onClose()
            : this.setState({ anchorEl: event.currentTarget });

    onUpdate = axisName => {
        this.props.onAddDimension({
            [this.props.dialogId]: axisName,
        });
        this.props.onUpdate(this.props.ui);
        this.props.closeDialog(null);
    };

    renderMenuItems = () =>
        itemsWithoutSeries.map(option => (
            <MenuItem
                className={this.props.classes.menuItem}
                component="li"
                key={option.axisKey}
                onClick={() => this.onUpdate(option.axisKey)}
            >
                {option.name()}
            </MenuItem>
        ));

    renderUnselectedButton = () =>
        isYearOverYear(this.props.layoutType) ? (
            <Button
                className={this.props.classes.button}
                variant="contained"
                color="primary"
                disableRipple
                disableFocusRipple
                onClick={() => this.onUpdate(filterItem.axisKey)}
            >
                {filterItem.name()}
            </Button>
        ) : (
            <div ref={addToRef => (this.buttonRef = addToRef)}>
                <Button
                    className={this.props.classes.button}
                    variant="contained"
                    color="primary"
                    disableRipple
                    disableFocusRipple
                    onClick={() => this.onUpdate(seriesItem.axisKey)}
                >
                    {seriesItem.name()}
                </Button>
                <Menu
                    onClose={this.onClose}
                    onClick={this.onToggle}
                    anchorEl={this.state.anchorEl}
                    menuItems={this.renderMenuItems()}
                    addToButtonRef={this.buttonRef}
                />
            </div>
        );

    render() {
        const displayButton =
            this.state.buttonType === UNSELECTED_BUTTON_TYPE ? (
                this.renderUnselectedButton()
            ) : (
                <UpdateButton
                    className={this.props.className}
                    onClick={() => this.props.closeDialog(null)}
                />
            );

        return displayButton;
    }
}

AddToLayoutButton.propTypes = {
    classes: PropTypes.object.isRequired,
    closeDialog: PropTypes.func.isRequired,
    currentLayout: PropTypes.object.isRequired,
    dialogId: PropTypes.string.isRequired,
    layoutType: PropTypes.string.isRequired,
    onAddDimension: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    ui: sGetUi(state),
    dialogId: sGetUiActiveModalDialog(state),
    layoutType: sGetUiType(state),
    currentLayout: sGetUiLayout(state),
});

export default connect(
    mapStateToProps,
    {
        closeDialog: acSetUiActiveModalDialog,
        onAddDimension: acAddUiLayoutDimensions,
        onUpdate: acSetCurrentFromUi,
    }
)(withStyles(styles)(AddToLayoutButton));
