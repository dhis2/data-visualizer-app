import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import UpdateButton from '../../UpdateButton/UpdateButton';
import { DropDown } from './DropDown';
import { AddToSeries } from './buttons';
import { DropDownButton } from './buttons';

import {
    sGetUi,
    sGetUiLayout,
    sGetUiActiveModalDialog,
} from '../../../reducers/ui';
import {
    acSetUiActiveModalDialog,
    acAddUiLayoutDimensions,
} from '../../../actions/ui';
import { acSetCurrentFromUi } from '../../../actions/current';

const ADD_TO_BUTTON = -1;

export class AddToButton extends Component {
    state = { anchorEl: null, buttonType: ADD_TO_BUTTON };

    componentDidMount = () => {
        const { selectedLayout, dialogId } = this.props;

        const currentLayout = Object.values(selectedLayout);
        const buttonType = currentLayout.findIndex(axisIds =>
            axisIds.includes(dialogId)
        );

        this.setState({ buttonType });
    };

    toggleAlternatives = event => {
        this.state.anchorEl
            ? this.onCloseMenu()
            : this.setState({ anchorEl: event.currentTarget });
    };

    onCloseMenu = () => {
        this.setState({ anchorEl: null });
    };

    onUpdate = axisName => {
        this.props.onUpdate(this.props.ui);
        this.props.onAddDimension({ [this.props.dialogId]: axisName });
        this.props.closeDialog(null);
    };

    render = () => {
        return this.state.buttonType !== ADD_TO_BUTTON ? (
            <UpdateButton onClick={() => this.props.closeDialog(null)} />
        ) : (
            <Fragment>
                <AddToSeries onClick={this.onUpdate} />
                <DropDown
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.onCloseMenu}
                    anchorEl={this.state.anchorEl}
                    onItemClick={this.onUpdate}
                />
                <DropDownButton onClick={this.toggleAlternatives} />
            </Fragment>
        );
    };
}

const mapStateToProps = state => ({
    ui: sGetUi(state),
    selectedLayout: sGetUiLayout(state),
    dialogId: sGetUiActiveModalDialog(state),
});

export default connect(
    mapStateToProps,
    {
        onAddDimension: dimension => acAddUiLayoutDimensions(dimension),
        onUpdate: acSetCurrentFromUi,
        closeDialog: acSetUiActiveModalDialog,
    }
)(AddToButton);
