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

const ouDialogContent = <OrgUnitDimension />;

export class DialogManager extends Component {
    state = {
        onMounted: false,
    };

    componentDidUpdate = prevProps => {
        const shouldFetchIds =
            !isEqual(prevProps.dxIds, this.props.dxIds) ||
            !isEqual(prevProps.ouIds, this.props.ouIds);

        if (shouldFetchIds) {
            this.fetchRecommended();
        }

        if (this.props.dialogId === ouId && !this.state.ouMounted) {
            this.setState({ ouMounted: true });
        }
    };

    fetchRecommended = debounce(async () => {
        const ids = await apiFetchRecommendedIds(
            this.props.dxIds,
            this.props.ouIds
        );

        this.props.setRecommendedIds(ids);
    }, 1000);

    // The OU content is persisted as mounted in order
    // to cache the org unit tree data
    renderPersistedContent = () => {
        if (this.state.ouMounted) {
            return (
                <div
                    key={ouId}
                    style={{
                        display:
                            ouId === this.props.dialogId ? 'block' : 'none',
                    }}
                >
                    {ouDialogContent}
                </div>
            );
        }

        return null;
    };

    renderDialogContent = () => {
        const { dialogId } = this.props;
        const dynamicContent = () => {
            if (dialogId === dxId) {
                return <DataDimension />;
            }

            if (dialogId === peId) {
                return <PeriodDimension />;
            }

            if (!Object.keys(FIXED_DIMENSIONS).includes(dialogId)) {
                const dimension = this.props.dimensions[dialogId];

                return (
                    <DynamicDimension
                        dialogId={dialogId}
                        dialogTitle={dimension && dimension.name}
                    />
                );
            }
            return null;
        };

        return (
            <Fragment>
                {this.renderPersistedContent()}
                {dialogId && dynamicContent()}
            </Fragment>
        );
    };

    render() {
        const { dialogId, dimensions } = this.props;
        const keepMounted = !dialogId || dialogId === ouId;

        return (
            <Dialog
                data-test="dialog-manager"
                open={dialogId in dimensions}
                onClose={() => this.props.closeDialog(null)}
                maxWidth="lg"
                disableEnforceFocus
                keepMounted={keepMounted}
            >
                {this.renderDialogContent()}
                <DialogActions>
                    <HideButton />
                    {dialogId && <AddToLayoutButton dialogId={dialogId} />}
                </DialogActions>
            </Dialog>
        );
    }
}

DialogManager.propTypes = {
    dialogId: PropTypes.string,
    dxIds: PropTypes.array,
    ouIds: PropTypes.array.isRequired,
    closeDialog: PropTypes.func.isRequired,
    setRecommendedIds: PropTypes.func.isRequired,
};

DialogManager.defaultProps = {
    dialogId: null,
    dxIds: [],
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
