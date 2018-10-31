import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import DataDimension from './Dialogs/DataDimension/DataDimension';
import PeriodDimension from './Dialogs/PeriodDimension/PeriodDimension';
import OrgUnitDimension from './Dialogs/OrgUnitDimension/OrgUnitDimension';
import GenericDimension from './Dialogs/GenericDimension/GenericDimension';

import { HideButton, UpdateButton } from './Dialogs/buttons';

import { sGetUi } from '../../reducers/ui';
import { acSetCurrentFromUi } from '../../actions/current';

import { styles } from './styles/DialogManager.style';

import { FIXED_DIMENSIONS } from '../../modules/fixedDimensions';

const dxId = FIXED_DIMENSIONS.dx.id;
const peId = FIXED_DIMENSIONS.pe.id;
const ouId = FIXED_DIMENSIONS.ou.id;

const dimensionComponents = {
    [dxId]: <DataDimension />,
    [ouId]: <OrgUnitDimension />,
    [peId]: <PeriodDimension />,
};

export class DialogManager extends Component {
    onUpdate = () => {
        this.props.onUpdate(this.props.ui);
        this.props.toggleDialog(null);
    };

    isFixed = () => {
        return (
            this.props.dimension.id === 'dx' ||
            this.props.dimension.id === 'pe' ||
            this.props.dimension.id === 'ou'
        );
    };

    renderDialogContent = () => {
        return this.isFixed() ? (
            dimensionComponents[this.props.dimension.id]
        ) : (
            <GenericDimension dimension={this.props.dimension} />
        );
    };

    render = () => {
        return this.props.dimension ? (
            <Dialog
                open={!!this.props.dimension}
                onClose={() => this.props.toggleDialog(null)}
                maxWidth={false}
                disableEnforceFocus
            >
                {this.renderDialogContent()}
                <DialogActions style={styles.dialogActions}>
                    <HideButton action={() => this.props.toggleDialog(null)} />
                    <UpdateButton action={this.onUpdate} />
                </DialogActions>
            </Dialog>
        ) : null;
    };
}

DialogManager.propTypes = {
    toggleDialog: PropTypes.func.isRequired,
    id: PropTypes.string,
    dialogIsOpen: PropTypes.bool.isRequired,
    ui: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    ui: sGetUi(state),
});

export default connect(
    mapStateToProps,
    { onUpdate: acSetCurrentFromUi }
)(DialogManager);
