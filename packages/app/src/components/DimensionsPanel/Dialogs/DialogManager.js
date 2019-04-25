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

import HideButton from './HideButton';
import AddToLayoutButton from './AddToLayoutButton/AddToLayoutButton';

import {
    acSetUiActiveModalDialog,
    acRemoveUiItems,
    acAddUiItems,
    acSetUiItems,
    acAddParentGraphMap,
} from '../../../actions/ui';
import { acAddMetadata } from '../../../actions/metadata';
import { acSetRecommendedIds } from '../../../actions/recommendedIds';

import {
    sGetUiItems,
    sGetUiItemsByDimension,
    sGetUiActiveModalDialog,
    sGetUiParentGraphMap,
} from '../../../reducers/ui';
import { sGetDimensions } from '../../../reducers/dimensions';
import { sGetMetadata } from '../../../reducers/metadata';
import { sGetSettingsDisplayNameProperty } from '../../../reducers/settings';
import { apiFetchRecommendedIds } from '../../../api/dimensions';
import { FIXED_DIMENSIONS } from '../../../modules/fixedDimensions';
import {
    getOrgUnitsFromIds,
    removeOrgUnitLastPathSegment,
} from '../../../modules/orgUnitDimensions';

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

    onSelect = ({ dimensionType, value }) => {
        const items = Object.values(value);

        this.props.addUiItems({
            dimensionType,
            value: items.map(item => item.id),
        });

        switch (dimensionType) {
            case ouId: {
                const forMetadata = {};
                const forParentGraphMap = {};

                items.forEach(ou => {
                    forMetadata[ou.id] = {
                        id: ou.id,
                        name: ou.name || ou.displayName,
                        displayName: ou.displayName,
                    };

                    const path = removeOrgUnitLastPathSegment(ou.path);

                    forParentGraphMap[ou.id] =
                        path === `/${ou.id}` ? '' : path.replace(/^\//, '');
                });

                this.props.addMetadata(forMetadata);
                this.props.addParentGraphMap(forParentGraphMap);

                break;
            }
            default: {
                this.props.addMetadata(
                    items.reduce((obj, item) => {
                        obj[item.id] = {
                            id: item.id,
                            name: item.name || item.displayName,
                            displayName: item.displayName,
                        };

                        return obj;
                    }, {})
                );
            }
        }
    };

    getSelectedItems = dialogId => {
        return this.props.selectedItems[dialogId]
            ? this.props.selectedItems[dialogId]
                  .filter(id => this.props.metadata[id])
                  .map(id => ({
                      id,
                      name: this.props.metadata[id].name,
                  }))
            : [];
    };

    // The OU content is persisted as mounted in order
    // to cache the org unit tree data
    renderPersistedContent = dimensionProps => {
        const {
            displayNameProperty,
            ouIds,
            metadata,
            parentGraphMap,
            dialogId,
        } = this.props;

        if (this.state.ouMounted) {
            const ouItems = getOrgUnitsFromIds(ouIds, metadata, parentGraphMap);

            const display = ouId === dialogId ? 'block' : 'none';

            return (
                <div key={ouId} style={{ display }}>
                    <OrgUnitDimension
                        displayNameProperty={displayNameProperty}
                        ouItems={ouItems}
                        {...dimensionProps}
                    />
                </div>
            );
        }

        return null;
    };

    renderDialogContent = () => {
        const {
            displayNameProperty,
            dialogId,
            dimensions,
            removeUiItems,
            setUiItems,
        } = this.props;

        const dimensionProps = {
            d2: this.context.d2,
            onSelect: this.onSelect,
            onDeselect: removeUiItems,
            onReorder: setUiItems,
        };

        const dynamicContent = () => {
            const selectedItems = this.getSelectedItems(dialogId);

            if (dialogId === dxId) {
                return (
                    <DataDimension
                        displayNameProp={displayNameProperty}
                        selectedDimensions={selectedItems}
                        {...dimensionProps}
                    />
                );
            }

            if (dialogId === peId) {
                return (
                    <PeriodDimension
                        selectedPeriods={selectedItems}
                        {...dimensionProps}
                    />
                );
            }

            if (!Object.keys(FIXED_DIMENSIONS).includes(dialogId)) {
                const dialogTitle =
                    dimensions[dialogId] && dimensions[dialogId].name;

                return (
                    <DynamicDimension
                        selectedItems={selectedItems}
                        dialogId={dialogId}
                        dialogTitle={dialogTitle}
                        {...dimensionProps}
                    />
                );
            }
            return null;
        };

        return (
            <Fragment>
                {this.renderPersistedContent(dimensionProps)}
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

DialogManager.contextTypes = {
    d2: PropTypes.object,
};

DialogManager.propTypes = {
    dialogId: PropTypes.string,
    dxIds: PropTypes.array,
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
};

const mapStateToProps = state => ({
    displayNameProperty: sGetSettingsDisplayNameProperty(state),
    dialogId: sGetUiActiveModalDialog(state),
    dimensions: sGetDimensions(state),
    metadata: sGetMetadata(state),
    parentGraphMap: sGetUiParentGraphMap(state),
    dxIds: sGetUiItemsByDimension(state, dxId),
    ouIds: sGetUiItemsByDimension(state, ouId),
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
        addParentGraphMap: acAddParentGraphMap,
    }
)(DialogManager);
