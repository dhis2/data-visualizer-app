import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash-es/debounce';
import isEqual from 'lodash-es/isEqual';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import i18n from '@dhis2/d2-i18n';
import {
    DataDimension,
    DynamicDimension,
    PeriodDimension,
    OrgUnitDimension,
    ouIdHelper,
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    DIMENSION_ID_ORGUNIT,
    getAxisMaxNumberOfItems,
    getDisplayNameByVisType,
    filterOutFixedDimensions,
} from '@dhis2/analytics';

import HideButton from './HideButton';
import AddToLayoutButton from './AddToLayoutButton/AddToLayoutButton';
import UpdateVisualizationContainer from '../../UpdateButton/UpdateVisualizationContainer';

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
    sGetUiType,
    getAxisIdByDimensionId,
    sGetDimensionIdsFromLayout,
} from '../../../reducers/ui';
import { sGetDimensions } from '../../../reducers/dimensions';
import { sGetMetadata } from '../../../reducers/metadata';
import { sGetSettingsDisplayNameProperty } from '../../../reducers/settings';
import { apiFetchRecommendedIds } from '../../../api/dimensions';
import { removeLastPathSegment, getOuPath } from '../../../modules/orgUnit';
import UpdateButton from '../../UpdateButton/UpdateButton';

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

        if (
            this.props.dialogId === DIMENSION_ID_ORGUNIT &&
            !this.state.ouMounted
        ) {
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

    onSelect = ({ dimensionId, items }) => {
        this.props.setUiItems({
            dimensionId,
            itemIds: items.map(item => item.id),
        });

        switch (dimensionId) {
            case DIMENSION_ID_ORGUNIT: {
                const forMetadata = {};
                const forParentGraphMap = {};

                items.forEach(ou => {
                    const id = ouIdHelper.removePrefix(ou.id);
                    forMetadata[id] = {
                        id,
                        name: ou.name || ou.displayName,
                        displayName: ou.displayName,
                    };

                    if (ou.path) {
                        const path = removeLastPathSegment(ou.path);

                        forParentGraphMap[ou.id] =
                            path === `/${ou.id}` ? '' : path.replace(/^\//, '');
                    }
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
                  .map((id, index) => ({
                      id,
                      name: this.props.metadata[id].name,
                  }))
            : [];
    };

    getOrgUnitsFromIds = (ids, metadata, parentGraphMap) =>
        ids
            .filter(id => metadata[ouIdHelper.removePrefix(id)] !== undefined)
            .map(id => {
                const ouUid = ouIdHelper.removePrefix(id);
                return {
                    id,
                    name: metadata[ouUid].displayName || metadata[ouUid].name,
                    path: getOuPath(ouUid, metadata, parentGraphMap),
                };
            });

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
            const ouItems = this.getOrgUnitsFromIds(
                ouIds,
                metadata,
                parentGraphMap
            );

            const display =
                DIMENSION_ID_ORGUNIT === dialogId ? 'block' : 'none';

            return (
                <div key={DIMENSION_ID_ORGUNIT} style={{ display }}>
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
            type,
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
            let infoBoxMessage;

            const axisId = this.props.getAxisIdByDimensionId(dialogId);
            const visType = type;
            const numberOfItems = selectedItems.length;

            const axisMaxNumberOfItems = getAxisMaxNumberOfItems(
                visType,
                axisId
            );

            const hasMaxNumberOfItemsRule = !!axisMaxNumberOfItems;

            if (
                hasMaxNumberOfItemsRule &&
                numberOfItems > axisMaxNumberOfItems
            ) {
                infoBoxMessage =
                    axisMaxNumberOfItems === 1
                        ? i18n.t(
                              `'{{visualiationType}}' is intended to show a single data item. Only the first item will be used and saved.`,
                              {
                                  visualiationType: getDisplayNameByVisType(
                                      visType
                                  ),
                              }
                          )
                        : i18n.t(
                              `'{{visualiationType}}' is intended to show maximum {{maxNumber}} number of items. Only the first {{maxNumber}} items will be used and saved.`,
                              {
                                  visualiationType: getDisplayNameByVisType(
                                      visType
                                  ),
                                  maxNumber: axisMaxNumberOfItems,
                              }
                          );

                selectedItems.forEach((item, index) => {
                    item.isActive = index < axisMaxNumberOfItems;
                });
            }

            if (dialogId === DIMENSION_ID_DATA) {
                return (
                    <DataDimension
                        displayNameProp={displayNameProperty}
                        selectedDimensions={selectedItems}
                        infoBoxMessage={infoBoxMessage}
                        {...dimensionProps}
                    />
                );
            }

            if (dialogId === DIMENSION_ID_PERIOD) {
                return (
                    <PeriodDimension
                        selectedPeriods={selectedItems}
                        {...dimensionProps}
                        // TODO infoBoxMessage should ideally be implemented for all dimensions
                    />
                );
            }

            const dynamicDimensions = filterOutFixedDimensions(
                Object.keys(this.props.dimensions)
            );

            if (dynamicDimensions.includes(dialogId)) {
                const dialogTitle =
                    dimensions[dialogId] && dimensions[dialogId].name;

                return (
                    <DynamicDimension
                        selectedItems={selectedItems}
                        dialogId={dialogId}
                        dialogTitle={dialogTitle}
                        {...dimensionProps}
                        // TODO infoBoxMessage should ideally be implemented for all dimensions
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

    renderPrimaryButton = dialogId => (
        <UpdateVisualizationContainer
            renderComponent={handler =>
                this.props.dimensionIdsInLayout.includes(dialogId) ? (
                    <UpdateButton
                        flat
                        size="small"
                        onClick={this.getPrimaryOnClick(handler)}
                    />
                ) : (
                    <AddToLayoutButton
                        onClick={this.getPrimaryOnClick(handler)}
                    />
                )
            }
        />
    );

    getPrimaryOnClick = handler => () => {
        handler();
        this.props.closeDialog(null);
    };

    render() {
        const { dialogId, dimensions } = this.props;
        const keepMounted = !dialogId || dialogId === DIMENSION_ID_ORGUNIT;

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
                    {dialogId && this.renderPrimaryButton(dialogId)}
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
    type: PropTypes.string,
    dimensionIdsInLayout: PropTypes.array.isRequired,
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
    dxIds: sGetUiItemsByDimension(state, DIMENSION_ID_DATA),
    ouIds: sGetUiItemsByDimension(state, DIMENSION_ID_ORGUNIT),
    selectedItems: sGetUiItems(state),
    type: sGetUiType(state),
    getAxisIdByDimensionId: dimensionId =>
        getAxisIdByDimensionId(state, dimensionId),
    dimensionIdsInLayout: sGetDimensionIdsFromLayout(state),
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
