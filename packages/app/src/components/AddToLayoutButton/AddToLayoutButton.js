import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UpdateButton from '../UpdateButton/UpdateButton';
import DropDownButton from './DropDownButton';
import { AddToSeriesButton as AddToSeries } from './AddToSeriesButton';

import { sGetUiLayout, sGetUiActiveModalDialog } from '../../reducers/ui';
import {
    acSetUiActiveModalDialog,
    acAddUiLayoutDimensions,
} from '../../actions/ui';

const ADD_TO_LAYOUT_BUTTON = -1;

export class AddToLayoutButton extends Component {
    state = { anchorEl: null, buttonType: ADD_TO_LAYOUT_BUTTON };

    componentDidMount = () => {
        const currentLayout = Object.values(this.props.currentLayout);
        const buttonType = currentLayout.findIndex(axisIds =>
            axisIds.includes(this.props.dialogId)
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
        this.props.onAddDimension({ [this.props.dialogId]: axisName });
        this.props.closeDialog(null);
    };

    render = () => {
        return this.state.buttonType !== ADD_TO_LAYOUT_BUTTON ? (
            <UpdateButton onClick={() => this.props.closeDialog(null)} />
        ) : (
            <Fragment>
                <AddToSeries onClick={this.onUpdate} />
                <DropDownButton
                    open={Boolean(this.state.anchorEl)}
                    onDropDownClick={this.toggleAlternatives}
                    onItemClick={this.onUpdate}
                    onClose={this.onCloseMenu}
                    anchorEl={this.state.anchorEl}
                />
            </Fragment>
        );
    };
}

AddToLayoutButton.propTypes = {
    dialogId: PropTypes.string.isRequired,
    currentLayout: PropTypes.object.isRequired,
    onAddDimension: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    dialogId: sGetUiActiveModalDialog(state),
    currentLayout: sGetUiLayout(state),
});

export default connect(
    mapStateToProps,
    {
        onAddDimension: dimension => acAddUiLayoutDimensions(dimension),
        closeDialog: acSetUiActiveModalDialog,
    }
)(AddToLayoutButton);
