import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { getAvailableAxes } from '@dhis2/analytics';

import Menu from './Menu';
import { sGetUiActiveModalDialog, sGetUiType } from '../../../../reducers/ui';
import { acAddUiLayoutDimensions } from '../../../../actions/ui';

import { ADD_TO_LAYOUT_OPTIONS } from '../../../../modules/layout';
import styles from './styles/AddToLayoutButton.style';

export class AddToLayoutButton extends Component {
    constructor(props) {
        super(props);
        this.buttonRef = React.createRef();
    }

    state = { anchorEl: null };

    onClose = () => this.setState({ anchorEl: null });

    onToggle = event =>
        this.state.anchorEl
            ? this.onClose()
            : this.setState({ anchorEl: event.currentTarget });

    onUpdate = axisId => {
        this.props.onAddDimension({
            [this.props.dialogId]: axisId,
        });

        this.props.onClick();
    };

    getAxisMeta = axisIdArray =>
        axisIdArray.map(axisId =>
            ADD_TO_LAYOUT_OPTIONS.find(
                axisMetaObj => axisMetaObj.axisId === axisId
            )
        );

    renderMenuItems = () =>
        this.getAxisMeta(getAvailableAxes(this.props.visType))
            .slice(1)
            .map(axisMetaObj => (
                <MenuItem
                    className={this.props.classes.menuItem}
                    component="li"
                    key={axisMetaObj.axisId}
                    onClick={() => this.onUpdate(axisMetaObj.axisId)}
                >
                    {axisMetaObj.name}
                </MenuItem>
            ));

    render() {
        const availableAxisMeta = this.getAxisMeta(
            getAvailableAxes(this.props.visType)
        );

        return (
            <div ref={addToRef => (this.buttonRef = addToRef)}>
                <Button
                    className={this.props.classes.button}
                    variant="contained"
                    color="primary"
                    disableRipple
                    disableFocusRipple
                    onClick={() => this.onUpdate(availableAxisMeta[0].axisId)}
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
    }
}

AddToLayoutButton.propTypes = {
    classes: PropTypes.object.isRequired,
    visType: PropTypes.string.isRequired,
    dialogId: PropTypes.string.isRequired,
    onAddDimension: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    visType: sGetUiType(state),
    dialogId: sGetUiActiveModalDialog(state),
});

export default connect(
    mapStateToProps,
    {
        onAddDimension: acAddUiLayoutDimensions,
    }
)(withStyles(styles)(AddToLayoutButton));
