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

import { sGetUi, sGetUiActiveModalDialog } from '../../reducers/ui';
import { acSetUiActiveModalDialog } from '../../actions/ui';
import { acSetCurrentFromUi } from '../../actions/current';

import { styles } from './styles/DialogManager.style';

import { FIXED_DIMENSIONS } from '../../modules/fixedDimensions';
import { sGetDimensions } from '../../reducers/dimensions';

const dxId = FIXED_DIMENSIONS.dx.id;
const peId = FIXED_DIMENSIONS.pe.id;
const ouId = FIXED_DIMENSIONS.ou.id;

const fixedDimensionIds = [dxId, peId, ouId];

const dimensionComponents = {
    [dxId]: <DataDimension />,
    [ouId]: <OrgUnitDimension />,
    [peId]: <PeriodDimension />,
};

export class DialogManager extends Component {
    onUpdate = () => {
        this.props.onUpdate(this.props.ui);
        this.props.closeDialog(null);
    };

    renderDialogContent = () => {
        return fixedDimensionIds.includes(this.props.dialogId) ? (
            dimensionComponents[this.props.dialogId]
        ) : (
            <GenericDimension
                dimension={{
                    id: this.props.dialogId,
                    dialogtitle: this.props.dimensions[this.props.dialogId]
                        .name,
                }}
            />
        );
    };

    render = () => {
        return this.props.dialogId ? (
            <Dialog
                open={!!this.props.dialogId}
                onClose={() => this.props.closeDialog(null)}
                maxWidth={false}
                disableEnforceFocus
            >
                {this.renderDialogContent()}
                <DialogActions style={styles.dialogActions}>
                    <HideButton action={() => this.props.closeDialog(null)} />
                    <UpdateButton action={this.onUpdate} />
                </DialogActions>
            </Dialog>
        ) : null;
    };
}

DialogManager.propTypes = {
    dialogId: PropTypes.string,
    ui: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
};

DialogManager.defaultProps = {
    dialogId: null,
};

const mapStateToProps = state => ({
    ui: sGetUi(state),
    dimensions: sGetDimensions(state),
    dialogId: sGetUiActiveModalDialog(state),
});

export default connect(
    mapStateToProps,
    {
        onUpdate: acSetCurrentFromUi,
        closeDialog: acSetUiActiveModalDialog,
    }
)(DialogManager);
