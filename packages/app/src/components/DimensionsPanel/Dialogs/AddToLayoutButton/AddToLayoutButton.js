import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import {
    AXIS_NAME_COLUMNS,
    getLayoutTypeByChartType,
    getAvailableAxes,
} from '@dhis2/analytics';

import UpdateButton from '../../../UpdateButton/UpdateButton';
import Menu from './Menu';
import {
    sGetUi,
    sGetUiLayout,
    sGetUiActiveModalDialog,
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
    option => option.axisName !== AXIS_NAME_COLUMNS
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

    getAvailableAxisNames = () =>
        getAvailableAxes(getLayoutTypeByChartType(this.props.ui.type));

    getAxisMeta = axisNameArray =>
        axisNameArray.map(axisName =>
            ADD_TO_LAYOUT_OPTIONS.find(
                axisMetaObj => axisMetaObj.axisName === axisName
            )
        );

    renderMenuItems = () =>
        this.getAxisMeta(this.getAvailableAxisNames())
            .slice(1)
            .map(axisMetaObj => (
                <MenuItem
                    className={this.props.classes.menuItem}
                    component="li"
                    key={axisMetaObj.axisName}
                    onClick={() => this.onUpdate(axisMetaObj.axisName)}
                >
                    {axisMetaObj.name}
                </MenuItem>
            ));

    renderUnselectedButton = () => {
        const availableAxisMeta = this.getAxisMeta(
            this.getAvailableAxisNames()
        );

        return (
            <div ref={addToRef => (this.buttonRef = addToRef)}>
                <Button
                    className={this.props.classes.button}
                    variant="contained"
                    color="primary"
                    disableRipple
                    disableFocusRipple
                    onClick={() => this.onUpdate(seriesItem.axisName)}
                >
                    {availableAxisMeta[0].name}
                </Button>
                {availableAxisMeta.length > 1 ? (
                    <Menu
                        onClose={this.onClose}
                        onClick={this.onToggle}
                        anchorEl={this.state.anchorEl}
                        menuItems={this.renderMenuItems()}
                        addToButtonRef={this.buttonRef}
                    />
                ) : null}
            </div>
        );
    };

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
    onAddDimension: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    ui: sGetUi(state),
    dialogId: sGetUiActiveModalDialog(state),
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
