import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import debounce from 'lodash-es/debounce'
import isEqual from 'lodash-es/isEqual'
import i18n from '@dhis2/d2-i18n'
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
    filterOutPredefinedDimensions,
    apiFetchRecommendedIds,
} from '@dhis2/analytics'
import {
    Modal,
    ModalContent,
    ModalActions,
    ButtonStrip,
    ModalTitle,
} from '@dhis2/ui'

import HideButton from '../../HideButton/HideButton'
import AddToLayoutButton from './AddToLayoutButton/AddToLayoutButton'
import UpdateVisualizationContainer from '../../UpdateButton/UpdateVisualizationContainer'
import {
    acSetUiActiveModalDialog,
    acRemoveUiItems,
    acAddUiItems,
    acSetUiItems,
    acAddParentGraphMap,
} from '../../../actions/ui'
import { acAddMetadata } from '../../../actions/metadata'
import { acSetRecommendedIds } from '../../../actions/recommendedIds'
import {
    sGetUiItems,
    sGetUiItemsByDimension,
    sGetUiActiveModalDialog,
    sGetUiParentGraphMap,
    sGetUiType,
    sGetAxisIdByDimensionId,
    sGetDimensionIdsFromLayout,
} from '../../../reducers/ui'
import { sGetDimensions } from '../../../reducers/dimensions'
import { sGetMetadata } from '../../../reducers/metadata'
import { sGetSettingsDisplayNameProperty } from '../../../reducers/settings'
import { removeLastPathSegment, getOuPath } from '../../../modules/orgUnit'
import UpdateButton from '../../UpdateButton/UpdateButton'

export class DialogManager extends Component {
    state = {
        onMounted: false,
    }

    componentDidUpdate = prevProps => {
        const shouldFetchIds =
            !isEqual(prevProps.dxIds, this.props.dxIds) ||
            !isEqual(prevProps.ouIds, this.props.ouIds)

        if (shouldFetchIds) {
            this.fetchRecommended()
        }

        if (
            this.props.dialogId === DIMENSION_ID_ORGUNIT &&
            !this.state.ouMounted
        ) {
            this.setState({ ouMounted: true })
        }
    }

    fetchRecommended = debounce(async () => {
        const ids = await apiFetchRecommendedIds(
            this.context.d2,
            this.props.dxIds,
            this.props.ouIds
        )

        this.props.setRecommendedIds(ids)
    }, 1000)

    selectUiItems = ({ dimensionId, items }) => {
        this.props.setUiItems({
            dimensionId,
            itemIds: items.map(item => item.id),
        })

        switch (dimensionId) {
            case DIMENSION_ID_ORGUNIT: {
                const forMetadata = {}
                const forParentGraphMap = {}

                items.forEach(ou => {
                    const id = ouIdHelper.removePrefix(ou.id)
                    forMetadata[id] = {
                        id,
                        name: ou.name || ou.displayName,
                        displayName: ou.displayName,
                    }

                    if (ou.path) {
                        const path = removeLastPathSegment(ou.path)

                        forParentGraphMap[ou.id] =
                            path === `/${ou.id}` ? '' : path.replace(/^\//, '')
                    }
                })

                this.props.addMetadata(forMetadata)
                this.props.addParentGraphMap(forParentGraphMap)

                break
            }
            default: {
                this.props.addMetadata(
                    items.reduce((obj, item) => {
                        obj[item.id] = {
                            id: item.id,
                            name: item.name || item.displayName,
                            displayName: item.displayName,
                        }

                        return obj
                    }, {})
                )
            }
        }
    }

    closeDialog = () => this.props.closeDialog(null)

    getSelectedItems = dialogId => {
        return this.props.selectedItems[dialogId]
            ? this.props.selectedItems[dialogId]
                  .filter(id => this.props.metadata[id])
                  .map(id => ({
                      id,
                      name: this.props.metadata[id].name,
                  }))
            : []
    }

    getOrgUnitsFromIds = (ids, metadata, parentGraphMap) =>
        ids
            .filter(id => metadata[ouIdHelper.removePrefix(id)] !== undefined)
            .map(id => {
                const ouUid = ouIdHelper.removePrefix(id)
                return {
                    id,
                    name: metadata[ouUid].displayName || metadata[ouUid].name,
                    path: getOuPath(ouUid, metadata, parentGraphMap),
                }
            })

    // The OU content is persisted as mounted in order
    // to cache the org unit tree data
    renderPersistedContent = dimensionProps => {
        const {
            displayNameProperty,
            ouIds,
            metadata,
            parentGraphMap,
            dialogId,
        } = this.props

        if (this.state.ouMounted) {
            const ouItems = this.getOrgUnitsFromIds(
                ouIds,
                metadata,
                parentGraphMap
            )

            const display = DIMENSION_ID_ORGUNIT === dialogId ? 'block' : 'none'

            return (
                <div key={DIMENSION_ID_ORGUNIT} style={{ display }}>
                    <OrgUnitDimension
                        displayNameProperty={displayNameProperty}
                        ouItems={ouItems}
                        {...dimensionProps}
                    />
                </div>
            )
        }

        return null
    }

    renderDialogContent = () => {
        const {
            displayNameProperty,
            dialogId,
            type,
            removeUiItems,
            setUiItems,
        } = this.props

        const dimensionProps = {
            d2: this.context.d2,
            onSelect: this.selectUiItems,
            onDeselect: removeUiItems,
            onReorder: setUiItems,
        }

        const dynamicContent = () => {
            const selectedItems = this.getSelectedItems(dialogId)
            let infoBoxMessage

            const axisId = this.props.getAxisIdByDimensionId(dialogId)
            const visType = type
            const numberOfItems = selectedItems.length

            const axisMaxNumberOfItems = getAxisMaxNumberOfItems(
                visType,
                axisId
            )

            const hasMaxNumberOfItemsRule = !!axisMaxNumberOfItems

            if (
                hasMaxNumberOfItemsRule &&
                numberOfItems > axisMaxNumberOfItems
            ) {
                infoBoxMessage =
                    axisMaxNumberOfItems === 1
                        ? i18n.t(
                              `'{{visualizationType}}' is intended to show a single data item. Only the first item will be used and saved.`,
                              {
                                  visualizationType: getDisplayNameByVisType(
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
                          )

                selectedItems.forEach((item, index) => {
                    item.isActive = index < axisMaxNumberOfItems
                })
            }
            let content = null
            if (dialogId === DIMENSION_ID_DATA) {
                content = (
                    <DataDimension
                        displayNameProp={displayNameProperty}
                        selectedDimensions={selectedItems}
                        infoBoxMessage={infoBoxMessage}
                        {...dimensionProps}
                    />
                )
            } else if (dialogId === DIMENSION_ID_PERIOD) {
                content = (
                    <PeriodDimension
                        selectedPeriods={selectedItems}
                        onSelect={dimensionProps.onSelect}
                        // TODO: infoBoxMessage should ideally be implemented for all dimensions
                    />
                )
            } else if (
                filterOutPredefinedDimensions(
                    Object.keys(this.props.dimensions)
                ).includes(dialogId)
            ) {
                content = (
                    <DynamicDimension
                        selectedItems={selectedItems}
                        dimensionId={dialogId}
                        onSelect={dimensionProps.onSelect}
                        context={dimensionProps.d2}
                        // TODO: infoBoxMessage should ideally be implemented for all dimensions
                    />
                )
            }
            return content
        }

        return (
            <Fragment>
                {this.renderPersistedContent(dimensionProps)}
                {dialogId && dynamicContent()}
            </Fragment>
        )
    }

    getPrimaryOnClick = handler => () => {
        handler()
        this.closeDialog()
    }

    render() {
        const { dialogId, dimensions } = this.props
        const dimension = dimensions[dialogId]

        return (
            <Fragment>
                {dimension && (
                    <Modal
                        onClose={this.closeDialog}
                        dataTest={`dialog-manager-${dimension.id}`}
                        position="top"
                        large
                    >
                        <ModalTitle dataTest={'dialog-manager-modal-title'}>
                            {dimension.name}
                        </ModalTitle>
                        <ModalContent dataTest={'dialog-manager-modal-content'}>
                            {this.renderDialogContent()}
                        </ModalContent>
                        <ModalActions dataTest={'dialog-manager-modal-actions'}>
                            <ButtonStrip>
                                <HideButton
                                    onClick={this.closeDialog}
                                    dataTest={
                                        'dialog-manager-modal-action-cancel'
                                    }
                                />
                                <UpdateVisualizationContainer
                                    renderComponent={handler =>
                                        this.props.dimensionIdsInLayout.includes(
                                            dialogId
                                        ) ? (
                                            <UpdateButton
                                                onClick={this.getPrimaryOnClick(
                                                    handler
                                                )}
                                                dataTest={
                                                    'dialog-manager-modal-action-confirm'
                                                }
                                            />
                                        ) : (
                                            <AddToLayoutButton
                                                onClick={this.getPrimaryOnClick(
                                                    handler
                                                )}
                                                dataTest={
                                                    'dialog-manager-modal-action-confirm'
                                                }
                                            />
                                        )
                                    }
                                />
                            </ButtonStrip>
                        </ModalActions>
                    </Modal>
                )}
            </Fragment>
        )
    }
}

DialogManager.contextTypes = {
    d2: PropTypes.object,
}

DialogManager.propTypes = {
    closeDialog: PropTypes.func.isRequired,
    dimensionIdsInLayout: PropTypes.array.isRequired,
    ouIds: PropTypes.array.isRequired,
    setRecommendedIds: PropTypes.func.isRequired,
    addMetadata: PropTypes.func,
    addParentGraphMap: PropTypes.func,
    dialogId: PropTypes.string,
    dimensions: PropTypes.object,
    displayNameProperty: PropTypes.string,
    dxIds: PropTypes.array,
    getAxisIdByDimensionId: PropTypes.func,
    metadata: PropTypes.object,
    parentGraphMap: PropTypes.object,
    removeUiItems: PropTypes.func,
    selectedItems: PropTypes.object,
    setUiItems: PropTypes.func,
    type: PropTypes.string,
}

DialogManager.defaultProps = {
    dialogId: null,
    dxIds: [],
}

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
        sGetAxisIdByDimensionId(state, dimensionId),
    dimensionIdsInLayout: sGetDimensionIdsFromLayout(state),
})

export default connect(mapStateToProps, {
    closeDialog: acSetUiActiveModalDialog,
    setRecommendedIds: acSetRecommendedIds,
    setUiItems: acSetUiItems,
    addMetadata: acAddMetadata,
    addUiItems: acAddUiItems,
    removeUiItems: acRemoveUiItems,
    addParentGraphMap: acAddParentGraphMap,
})(DialogManager)
