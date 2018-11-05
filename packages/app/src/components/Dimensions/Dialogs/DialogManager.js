import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import DataDimension from './DataSelector/DataDimension';
import PeriodDimension from './PeriodSelector/PeriodDimension';
import OrgUnitDimension from './OrgUnitSelector/OrgUnitDimension';
import GenericItemSelector from './GenericSelector/GenericItemSelector';
import HideButton from '../../HideButton/HideButton';
import UpdateButton from '../../UpdateButton/UpdateButton';

import { sGetUi, sGetUiActiveModalDialog } from '../../../reducers/ui';
import { sGetDimensions } from '../../../reducers/dimensions';

import { acSetUiActiveModalDialog } from '../../../actions/ui';
import { acSetCurrentFromUi } from '../../../actions/current';

import { FIXED_DIMENSIONS } from '../../../modules/fixedDimensions';
import { styles } from './styles/DialogManager.style';

const dxId = FIXED_DIMENSIONS.dx.id;
const peId = FIXED_DIMENSIONS.pe.id;
const ouId = FIXED_DIMENSIONS.ou.id;

const fixedDimensionsIds = [dxId, peId, ouId];

export const fixedDimensions = {
    [dxId]: <DataDimension />,
    [ouId]: <OrgUnitDimension />,
    [peId]: <PeriodDimension />,
};

export const defaultState = {
    mounted: [],
};
export class DialogManager extends Component {
    state = defaultState;

    renderDialogContent = () => {
        return fixedDimensionsIds.includes(this.props.dialogId) ? (
            fixedDimensions[this.props.dialogId]
        ) : (
            <GenericItemSelector
                dialogId={this.props.dialogId}
                dialogTitle={this.props.dimensions[this.props.dialogId].name}
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
                    <HideButton />
                    <UpdateButton
                        onClick={() => this.props.closeDialog(null)}
                    />
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
