import React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { DimensionMenu } from '@dhis2/analytics';

import MoreHorizontalIcon from '../../assets/MoreHorizontalIcon';
import { styles } from './styles/Menu.style';
import {
    acSetUiActiveModalDialog,
    acAddUiLayoutDimensions,
    acRemoveUiLayoutDimensions,
} from '../../actions/ui';
import { AXIS_SETUP_DIALOG_ID } from '../AxisSetup/AxisSetup';

class ChipMenu extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        event.stopPropagation();
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = event => {
        // event.stopPropagation();
        this.setState({ anchorEl: null });
    };

    getMenuId = () => `menu-for-${this.props.id}`;

    render() {
        console.log('-B menu parent render-', this.state.anchorEl);
        return (
            <React.Fragment>
                <IconButton
                    aria-owns={this.state.anchorEl ? this.getMenuId() : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    style={styles.icon}
                >
                    <MoreHorizontalIcon style={styles.icon} />
                </IconButton>
                <DimensionMenu
                    dimensionId={this.props.dimensionId}
                    currentAxisName={this.props.currentAxisName}
                    visType={this.props.visType}
                    numberOfDimensionItems={this.props.numberOfDimensionItems}
                    dualAxisItemHandler={this.props.dualAxisItemHandler}
                    axisItemHandler={this.props.axisItemHandler}
                    removeItemHandler={this.props.removeItemHandler}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleClose}
                />
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    dualAxisItemHandler: () =>
        dispatch(acSetUiActiveModalDialog(AXIS_SETUP_DIALOG_ID)),
    axisItemHandler: (dimensionId, targetAxisName) => {
        // event.stopPropagation();
        dispatch(acAddUiLayoutDimensions({ [dimensionId]: targetAxisName }));
    },
    removeItemHandler: dimensionId => {
        dispatch(acRemoveUiLayoutDimensions(dimensionId));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(ChipMenu);
