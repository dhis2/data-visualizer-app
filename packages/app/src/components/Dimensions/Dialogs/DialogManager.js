import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import debounce from 'lodash-es/debounce';
import isEqual from 'lodash-es/isEqual';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import DataDimension from './DataDimension/DataDimension';
import PeriodDimension from './PeriodDimension/PeriodDimension';
import OrgUnitDimension from './OrgUnitDimension/OrgUnitDimension';
import DynamicDimension from './DynamicDimension/DynamicDimension';
import HideButton from '../../HideButton/HideButton';
import AddToLayoutButton from '../../AddToLayoutButton/AddToLayoutButton';

import { acSetUiActiveModalDialog } from '../../../actions/ui';
import { acSetRecommendedIds } from '../../../actions/recommendedIds';

import {
    sGetUiItemsByDimension,
    sGetUiActiveModalDialog,
} from '../../../reducers/ui';
import { sGetDimensions } from '../../../reducers/dimensions';

import { apiFetchRecommendedIds } from '../../../api/dimensions';

import { FIXED_DIMENSIONS } from '../../../modules/fixedDimensions';

const dxId = FIXED_DIMENSIONS.dx.id;
const peId = FIXED_DIMENSIONS.pe.id;
const ouId = FIXED_DIMENSIONS.ou.id;

export const fixedDialogs = {
    [dxId]: <DataDimension />,
    [ouId]: <OrgUnitDimension />,
    [peId]: <PeriodDimension />,
};

export const defaultState = {
    mounted: [],
};

export class DialogManager extends Component {
    state = defaultState;

    componentDidUpdate = prevProps => {
        const shouldFetchIds =
            !isEqual(prevProps.dxIds, this.props.dxIds) ||
            !isEqual(prevProps.ouIds, this.props.ouIds);

        if (shouldFetchIds) {
            this.fetchRecommended();
        }

        if (
            this.props.dialogId &&
            !this.state.mounted.includes(this.props.dialogId)
        ) {
            this.setState({
                mounted: [...this.state.mounted, this.props.dialogId],
            });
        }
    };

    fetchRecommended = debounce(async () => {
        const ids = await apiFetchRecommendedIds(
            this.props.dxIds,
            this.props.ouIds
        );

        this.props.setRecommendedIds(ids);
    }, 1000);

    closeDialog = () => {
        this.props.closeDialog(null);
    };

    renderDialogContent = () => (
        <Fragment>
            {Object.keys(FIXED_DIMENSIONS).map(dimensionId => {
                return this.state.mounted.includes(dimensionId) ? (
                    <div
                        key={dimensionId}
                        style={{
                            display:
                                dimensionId === this.props.dialogId
                                    ? 'block'
                                    : 'none',
                        }}
                    >
                        {fixedDialogs[dimensionId]}
                    </div>
                ) : null;
            })}
            {this.props.dialogId &&
                !Object.keys(FIXED_DIMENSIONS).includes(
                    this.props.dialogId
                ) && (
                    <DynamicDimension
                        dialogId={this.props.dialogId}
                        dialogTitle={
                            this.props.dimensions[this.props.dialogId].name
                        }
                    />
                )}
        </Fragment>
    );

    render = () => (
        <Dialog
            open={!!this.props.dialogId}
            onClose={this.closeDialog}
            maxWidth={false}
            disableEnforceFocus
            keepMounted
        >
            {this.renderDialogContent()}
            <DialogActions>
                <HideButton />
                {this.props.dialogId && (
                    <AddToLayoutButton dialogId={this.props.dialogId} />
                )}
            </DialogActions>
        </Dialog>
    );
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
    dxIds: sGetUiItemsByDimension(state, dxId),
    ouIds: sGetUiItemsByDimension(state, ouId),
});

export default connect(
    mapStateToProps,
    {
        closeDialog: acSetUiActiveModalDialog,
        setRecommendedIds: acSetRecommendedIds,
    }
)(DialogManager);
