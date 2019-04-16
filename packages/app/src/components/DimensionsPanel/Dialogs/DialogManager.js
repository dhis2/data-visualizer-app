import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import debounce from 'lodash-es/debounce';
import isEqual from 'lodash-es/isEqual';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import {
    DataDimension,
    DynamicDimension,
    PeriodDimension,
    OrgUnitDimension,
} from '@dhis2/d2-ui-analytics';

import HideButton from '../../HideButton/HideButton';
import AddToLayoutButton from '../../AddToLayoutButton/AddToLayoutButton';

import {
    acSetUiActiveModalDialog,
    acRemoveUiItems,
    acAddUiItems,
    acSetUiItems,
} from '../../../actions/ui';
import { acAddMetadata } from '../../../actions/metadata';
import { acSetRecommendedIds } from '../../../actions/recommendedIds';

import {
    sGetUiItems,
    sGetUiItemsByDimension,
    sGetUiActiveModalDialog,
} from '../../../reducers/ui';
import { sGetDimensions } from '../../../reducers/dimensions';
import { sGetMetadata } from '../../../reducers/metadata';
import { sGetSettingsDisplayNameProperty } from '../../../reducers/settings';
import { apiFetchRecommendedIds } from '../../../api/dimensions';
import { FIXED_DIMENSIONS } from '../../../modules/fixedDimensions';

const dxId = FIXED_DIMENSIONS.dx.id;
const peId = FIXED_DIMENSIONS.pe.id;
const ouId = FIXED_DIMENSIONS.ou.id;

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

    onSelect = ({ dimensionType, value: items }) => {
        console.log('onSelect items', items);
        this.props.addUiItems({
            dimensionType,
            value: items.map(item => item.id),
        });

        items.forEach(item => this.props.addMetadata({ [item.id]: item }));
    };

    // The OU content is persisted as mounted in order
    // to cache the org unit tree data
    renderPersistedContent = () => {
        const {
            d2,
            displayNameProperty,
            dialogId,
            ouIds,
            removeUiItems,
            setUiItems,
            metadata,
        } = this.props;

        if (this.state.ouMounted) {
            const ouItems = ouIds
                .filter(id => metadata[id])
                .map(id => metadata[id]);

            return (
                <div
                    key={ouId}
                    style={{
                        display: ouId === dialogId ? 'block' : 'none',
                    }}
                >
                    <OrgUnitDimension
                        d2={d2}
                        displayNameProperty={displayNameProperty}
                        ouItems={ouItems}
                        onSelect={this.onSelect}
                        onDeselect={removeUiItems}
                        onReorder={setUiItems}
                    />
                </div>
            );
        }

        return null;
    };

    renderDialogContent = () => {
        const {
            d2,
            displayNameProperty,
            dialogId,
            dxIds,
            peIds,
            metadata,
            dimensions,
            selectedItems,
            removeUiItems,
            setUiItems,
        } = this.props;

        const dynamicContent = () => {
            if (dialogId === dxId) {
                const selectedDimensions = dxIds
                    .filter(id => metadata[id])
                    .map(id => ({
                        id,
                        name: metadata[id].name,
                    }));

                return (
                    <DataDimension
                        d2={d2}
                        displayNameProp={displayNameProperty} // XXX from user settings but metadata only has name
                        selectedDimensions={selectedDimensions}
                        onSelect={this.onSelect}
                        onDeselect={removeUiItems}
                        onReorder={setUiItems}
                    />
                );
            }

            if (dialogId === peId) {
                const selectedPeriods = peIds
                    .filter(id => metadata[id])
                    .map(id => ({
                        id,
                        name: metadata[id].name,
                    }));

                return (
                    <PeriodDimension
                        d2={d2}
                        selectedPeriods={selectedPeriods}
                        onSelect={this.onSelect}
                        onDeselect={removeUiItems}
                        onReorder={setUiItems}
                    />
                );
            }

            if (!Object.keys(FIXED_DIMENSIONS).includes(dialogId)) {
                const dimension = dimensions[dialogId];

                const dynamicItems = selectedItems[dialogId]
                    ? selectedItems[dialogId]
                          .filter(id => metadata[id])
                          .map(id => ({
                              id,
                              name: metadata[id].name,
                          }))
                    : [];

                return (
                    <DynamicDimension
                        d2={d2}
                        selectedItems={dynamicItems}
                        onSelect={this.onSelect}
                        onDeselect={removeUiItems}
                        onReorder={setUiItems}
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

DialogManager.contexTypes = {
    d2: PropTypes.object,
};

DialogManager.propTypes = {
    dialogId: PropTypes.string,
    dxIds: PropTypes.array,
    peIds: PropTypes.array,
    ouIds: PropTypes.array.isRequired,
    closeDialog: PropTypes.func.isRequired,
    setRecommendedIds: PropTypes.func.isRequired,
    dimensions: PropTypes.object,
    metadata: PropTypes.object,
    selectedItems: PropTypes.object,
};

DialogManager.defaultProps = {
    dialogId: null,
    dxIds: [],
    peIds: [],
};

const mapStateToProps = state => ({
    displayNameProperty: sGetSettingsDisplayNameProperty(state),
    dialogId: sGetUiActiveModalDialog(state),
    dimensions: sGetDimensions(state),
    metadata: sGetMetadata(state),
    dxIds: sGetUiItemsByDimension(state, dxId),
    ouIds: sGetUiItemsByDimension(state, ouId),
    peIds: sGetUiItemsByDimension(state, peId),
    selectedItems: sGetUiItems(state),
});

export default connect(
    mapStateToProps,
    {
        closeDialog: acSetUiActiveModalDialog,
        setRecommendedIds: acSetRecommendedIds,
        setUiItems: acSetUiItems,
        addMetadata: acAddMetadata,
        addUiItems: acAddUiItems,
        removeUiItems: acRemoveUiItems,
    }
)(DialogManager);
