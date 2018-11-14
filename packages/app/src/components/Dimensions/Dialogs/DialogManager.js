import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import debounce from 'lodash-es/debounce';
import isEqual from 'lodash-es/isEqual';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import DataDimension from './DataSelector/DataDimension';
import PeriodDimension from './PeriodSelector/PeriodDimension';
import OrgUnitDimension from './OrgUnitSelector/OrgUnitDimension';
import GenericItemSelector from './GenericSelector/GenericItemSelector';
import HideButton from '../../HideButton/HideButton';
import AddToLayoutButton from '../../AddToLayoutButton/AddToLayoutButton';

import { acSetUiActiveModalDialog } from '../../../actions/ui';
import { acSetRecommendedIds } from '../../../actions/recommendedIds';

import { sGetUiItems, sGetUiActiveModalDialog } from '../../../reducers/ui';
import { sGetDimensions } from '../../../reducers/dimensions';

import { apiFetchRecommendedIds } from '../../../api/dimensions';

import { FIXED_DIMENSIONS } from '../../../modules/fixedDimensions';
import { styles } from './styles/DialogManager.style';

const dxId = FIXED_DIMENSIONS.dx.id;
const peId = FIXED_DIMENSIONS.pe.id;
const ouId = FIXED_DIMENSIONS.ou.id;

export const fixedDialogs = (
    id,
    hasFilterText,
    enableEscape,
    disableEscape
) => {
    const dialogs = {
        [dxId]: (
            <DataDimension
                disableEscapeKey={disableEscape}
                enableEscapeKey={enableEscape}
                isDisabled={hasFilterText}
            />
        ),
        [ouId]: <OrgUnitDimension />,
        [peId]: <PeriodDimension />,
    };

    return dialogs[id];
};

export class DialogManager extends Component {
    state = { hasFilterText: false };

    componentDidUpdate = prevProps => {
        const shouldFetchIds =
            !isEqual(prevProps.dxIds, this.props.dxIds) ||
            !isEqual(prevProps.ouIds, this.props.ouIds);

        if (shouldFetchIds) {
            this.fetchRecommended();
        }
    };

    fetchRecommended = debounce(async () => {
        const ids = await apiFetchRecommendedIds(
            this.props.dxIds,
            this.props.ouIds
        );

        this.props.setRecommendedIds(ids);
    }, 1000);

    onEnableEscape = () => {
        this.setState({ hasFilterText: false });
    };
    onDisableEscape = () => {
        this.setState({ hasFilterText: true });
    };

    renderDialogContent = () => {
        let dialogContent;

        if (FIXED_DIMENSIONS[this.props.dialogId]) {
            dialogContent = fixedDialogs(
                this.props.dialogId,
                this.state.hasFilterText,
                this.onEnableEscape,
                this.onDisableEscape
            );
        } else {
            dialogContent = (
                <GenericItemSelector
                    dialogId={this.props.dialogId}
                    dialogTitle={
                        this.props.dimensions[this.props.dialogId].name
                    }
                    isDisabled={this.state.hasFilterText}
                    enableEscapeKey={this.onEnableEscape}
                    disableEscapeKey={this.onDisableEscape}
                />
            );
        }

        return dialogContent;
    };

    render = () => {
        return this.props.dialogId ? (
            <Dialog
                open={!!this.props.dialogId}
                onClose={() => this.props.closeDialog(null)}
                maxWidth={false}
                disableEnforceFocus
                disableEscapeKeyDown={this.state.hasFilterText}
            >
                {this.renderDialogContent()}
                <DialogActions style={styles.dialogActions}>
                    <HideButton />
                    <AddToLayoutButton />
                </DialogActions>
            </Dialog>
        ) : null;
    };
}

DialogManager.propTypes = {
    dialogId: PropTypes.string,
    dxIds: PropTypes.array.isRequired,
    ouIds: PropTypes.array.isRequired,
    closeDialog: PropTypes.func.isRequired,
    setRecommendedIds: PropTypes.func.isRequired,
};

DialogManager.defaultProps = {
    dialogId: null,
};

const mapStateToProps = state => ({
    dialogId: sGetUiActiveModalDialog(state),
    dimensions: sGetDimensions(state),
    dxIds: sGetUiItems(state)[dxId] || [],
    ouIds: sGetUiItems(state)[ouId] || [],
});

export default connect(
    mapStateToProps,
    {
        closeDialog: acSetUiActiveModalDialog,
        setRecommendedIds: acSetRecommendedIds,
    }
)(DialogManager);
