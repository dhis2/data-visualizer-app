import {
    DataDimension,
    DynamicDimension,
    PeriodDimension,
    OrgUnitDimension,
    ouIdHelper,
    dataTypeMap,
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    DIMENSION_ID_ORGUNIT,
    DIMENSION_TYPE_DATA_ELEMENT,
    DIMENSION_TYPE_DATA_ELEMENT_OPERAND,
    getDimensionMaxNumberOfItems,
    getAxisMaxNumberOfItems,
    getDisplayNameByVisType,
    filterOutPredefinedDimensions,
    apiFetchRecommendedIds,
    DAILY,
    WEEKLY,
    WEEKLYWED,
    WEEKLYTHU,
    WEEKLYSAT,
    WEEKLYSUN,
    BIWEEKLY,
    MONTHLY,
    BIMONTHLY,
    ALL_DYNAMIC_DIMENSION_ITEMS,
    VIS_TYPE_OUTLIER_TABLE,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import {
    Modal,
    ModalContent,
    ModalActions,
    ButtonStrip,
    ModalTitle,
    TabBar,
    Tab,
} from '@dhis2/ui'
import debounce from 'lodash-es/debounce'
import isEqual from 'lodash-es/isEqual'
import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { acAddMetadata } from '../../../actions/metadata.js'
import { acSetRecommendedIds } from '../../../actions/recommendedIds.js'
import {
    acSetUiActiveModalDialog,
    acSetUiItems,
    acAddParentGraphMap,
    acSetUiItemAttributes,
} from '../../../actions/ui.js'
import { removeLastPathSegment, getOuPath } from '../../../modules/orgUnit.js'
import {
    ITEM_ATTRIBUTE_HORIZONTAL,
    ITEM_ATTRIBUTE_VERTICAL,
} from '../../../modules/ui.js'
import { sGetDimensions } from '../../../reducers/dimensions.js'
import { sGetMetadata } from '../../../reducers/metadata.js'
import {
    sGetSettings,
    sGetSettingsDisplayNameProperty,
} from '../../../reducers/settings.js'
import {
    sGetUiItemsByDimension,
    sGetUiActiveModalDialog,
    sGetUiParentGraphMap,
    sGetUiType,
    sGetAxisIdByDimensionId,
    sGetDimensionIdsFromLayout,
    sGetUiItemsByAttribute,
} from '../../../reducers/ui.js'
import HideButton from '../../HideButton/HideButton.jsx'
import UpdateButton from '../../UpdateButton/UpdateButton.jsx'
import UpdateVisualizationContainer from '../../UpdateButton/UpdateVisualizationContainer.js'
import { default as AddToLayoutButton } from './AddToLayoutButton/AddToLayoutButton.jsx'
import styles from './styles/DialogManager.module.css'

const isScatterAttribute = (dialogId) =>
    [ITEM_ATTRIBUTE_VERTICAL, ITEM_ATTRIBUTE_HORIZONTAL].includes(dialogId)

const getExcludedPeriodTypes = (settings = {}) => {
    const types = []
    if (settings['keyHideDailyPeriods']) {
        types.push(DAILY)
    }
    if (settings['keyHideWeeklyPeriods']) {
        types.push(WEEKLY, WEEKLYWED, WEEKLYTHU, WEEKLYSAT, WEEKLYSUN)
    }
    if (settings['keyHideBiWeeklyPeriods']) {
        types.push(BIWEEKLY)
    }
    if (settings['keyHideMonthlyPeriods']) {
        types.push(MONTHLY)
    }
    if (settings['keyHideBiMonthlyPeriods']) {
        types.push(BIMONTHLY)
    }
    return types
}

class DialogManager extends Component {
    state = {
        onMounted: false,
    }

    componentDidUpdate = (prevProps) => {
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
            this.props.dataEngine,
            this.props.dxIds,
            this.props.ouIds
        )

        this.props.setRecommendedIds(ids)
    }, 1000)

    selectUiItems = ({ dimensionId, items, itemAttribute }) => {
        if (itemAttribute) {
            this.props.setUiItemAttributes({
                dimensionId,
                attribute: itemAttribute,
                itemIds: items.map((item) => item.id),
            })
        } else {
            this.props.setUiItems({
                dimensionId,
                itemIds: items.map((item) => item.id),
            })
        }

        if (dimensionId === DIMENSION_ID_ORGUNIT) {
            const forMetadata = {}
            const forParentGraphMap = {}

            items.forEach((ou) => {
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
        } else {
            this.props.addMetadata(
                items.reduce((obj, item) => {
                    obj[item.id] = {
                        id: item.id,
                        name: item.name || item.displayName,
                        displayName: item.displayName,
                        dimensionItemType: item.type,
                        optionSetId: item.optionSetId,
                        ...(item.expression
                            ? { expression: item.expression }
                            : {}),
                    }

                    return obj
                }, {})
            )
        }
    }

    closeDialog = () => this.props.changeDialog(null)

    getSelectedItems = (dialogId) => {
        const items = isScatterAttribute(dialogId)
            ? this.props.getItemsByAttribute(dialogId)
            : this.props.selectedItems(dialogId)
        return (items || [])
            .filter(
                (id) =>
                    this.props.metadata[id] ||
                    id === ALL_DYNAMIC_DIMENSION_ITEMS
            )
            .map((id) => ({
                id,
                name: this.props.metadata[id]?.name,
                type:
                    this.props.metadata[id]?.type ||
                    this.props.metadata[id]?.dimensionItemType,
                optionSetId: this.props.metadata[id]?.optionSetId,
                ...(this.props.metadata[id]?.expression
                    ? {
                          expression: this.props.metadata[id].expression,
                      }
                    : {}),
                access: this.props.metadata[id]?.access,
            }))
    }

    getOrgUnitsFromIds = (ids, metadata, parentGraphMap) =>
        ids
            .filter((id) => metadata[ouIdHelper.removePrefix(id)] !== undefined)
            .map((id) => {
                const ouUid = ouIdHelper.removePrefix(id)
                return {
                    id,
                    name: metadata[ouUid].displayName || metadata[ouUid].name,
                    path: getOuPath(ouUid, metadata, parentGraphMap),
                }
            })

    // The OU content is persisted as mounted in order
    // to cache the org unit tree data
    renderPersistedContent = (dimensionProps, displayNameProperty) => {
        const { ouIds, metadata, parentGraphMap, dialogId } = this.props

        if (this.state.ouMounted) {
            const selected = this.getOrgUnitsFromIds(
                ouIds,
                metadata,
                parentGraphMap
            )

            const display = DIMENSION_ID_ORGUNIT === dialogId ? 'block' : 'none'

            const rootOrgUnits = this.props.rootOrgUnits || []

            return (
                <div key={DIMENSION_ID_ORGUNIT} style={{ display }}>
                    <OrgUnitDimension
                        selected={selected}
                        roots={rootOrgUnits.map(
                            (rootOrgUnit) => rootOrgUnit.id
                        )}
                        displayNameProp={displayNameProperty}
                        {...dimensionProps}
                    />
                </div>
            )
        }

        return null
    }

    renderDialogContent = () => {
        const { displayNameProperty, dialogId, type: visType } = this.props

        const dimensionProps = {
            onSelect: this.selectUiItems,
        }

        const dynamicContent = () => {
            const selectedItems = this.getSelectedItems(dialogId)
            let infoBoxMessage

            const axisId = this.props.getAxisIdByDimensionId(dialogId)
            const numberOfItems = selectedItems.length

            const dimensionMaxNumberOfItems = getDimensionMaxNumberOfItems(
                visType,
                dialogId
            )

            const axisMaxNumberOfItems = getAxisMaxNumberOfItems(
                visType,
                axisId
            )

            const hasMaxNumberOfItemsRule = Boolean(
                axisMaxNumberOfItems || dimensionMaxNumberOfItems
            )
            const maxNumberOfItems =
                axisMaxNumberOfItems || dimensionMaxNumberOfItems

            if (hasMaxNumberOfItemsRule && numberOfItems > maxNumberOfItems) {
                infoBoxMessage =
                    maxNumberOfItems === 1
                        ? i18n.t(
                              `'{{visualizationType}}' is intended to show a single item for this type of dimension. Only the first item will be used and saved.`,
                              {
                                  visualizationType:
                                      getDisplayNameByVisType(visType),
                              }
                          )
                        : i18n.t(
                              `'{{visualiationType}}' is intended to show maximum {{maxNumber}} number of items. Only the first {{maxNumber}} items will be used and saved.`,
                              {
                                  visualiationType:
                                      getDisplayNameByVisType(visType),
                                  maxNumber: maxNumberOfItems,
                              }
                          )

                selectedItems.forEach((item, index) => {
                    item.isActive = index < maxNumberOfItems
                })
            } else if (isScatterAttribute(dialogId) && numberOfItems > 1) {
                infoBoxMessage = i18n.t(
                    `'Scatter' is intended to show a single data item per axis. Only the first item will be used and saved.`
                )
                selectedItems.forEach((item, index) => {
                    item.isActive = index < 1
                })
            }

            let content = null
            if (
                dialogId === DIMENSION_ID_DATA ||
                isScatterAttribute(dialogId)
            ) {
                const dataTypes = Object.values(dataTypeMap).filter(
                    ({ id }) => {
                        if (visType === VIS_TYPE_OUTLIER_TABLE) {
                            return id === DIMENSION_TYPE_DATA_ELEMENT
                        }

                        return true
                    }
                )

                const onSelect = isScatterAttribute(dialogId)
                    ? (defaultProps) =>
                          this.selectUiItems({
                              ...defaultProps,
                              itemAttribute: dialogId,
                          })
                    : dimensionProps.onSelect
                const onCalculationSave = (calculation) => {
                    this.props.addMetadata({
                        [calculation.id]: {
                            id: calculation.id,
                            name: calculation.name,
                            dimensionItemType: calculation.type,
                            expression: calculation.expression,
                        },
                    })
                }

                if (visType === VIS_TYPE_OUTLIER_TABLE) {
                    let showInfo = false

                    selectedItems.forEach((item) => {
                        if (
                            ![
                                DIMENSION_TYPE_DATA_ELEMENT,
                                DIMENSION_TYPE_DATA_ELEMENT_OPERAND,
                            ].includes(item.type)
                        ) {
                            item.isActive = false
                            showInfo = true
                        }
                    })

                    if (showInfo) {
                        infoBoxMessage = i18n.t(
                            `'Outlier table' shows values from data elements only. Only data elements will be used and saved.`
                        )
                    }
                }

                const dimensionSelector = (
                    <DataDimension
                        enabledDataTypes={dataTypes}
                        displayNameProp={displayNameProperty}
                        selectedDimensions={selectedItems}
                        infoBoxMessage={infoBoxMessage}
                        onSelect={onSelect}
                        onCalculationSave={onCalculationSave}
                        visType={visType}
                    />
                )
                const dataTabs = isScatterAttribute(dialogId) ? (
                    <TabBar
                        dataTest={'dialog-manager-modal-tabs'}
                        className={styles.tabs}
                    >
                        {[
                            {
                                key: ITEM_ATTRIBUTE_VERTICAL,
                                label: i18n.t('Vertical'),
                            },
                            {
                                key: ITEM_ATTRIBUTE_HORIZONTAL,
                                label: i18n.t('Horizontal'),
                            },
                        ].map(({ key, label }) => (
                            <Tab
                                key={key}
                                onClick={() => this.props.changeDialog(key)}
                                selected={key === dialogId}
                            >
                                {label}
                            </Tab>
                        ))}
                    </TabBar>
                ) : null
                content = dataTabs ? (
                    <>
                        {dataTabs}
                        {dimensionSelector}
                    </>
                ) : (
                    dimensionSelector
                )
            } else if (dialogId === DIMENSION_ID_PERIOD) {
                content = (
                    <PeriodDimension
                        selectedPeriods={selectedItems}
                        infoBoxMessage={infoBoxMessage}
                        onSelect={dimensionProps.onSelect}
                        excludedPeriodTypes={getExcludedPeriodTypes(
                            this.props.settings
                        )}
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
                        dimensionTitle={this.props.dimensions[dialogId].name}
                        displayNameProp={displayNameProperty}
                        // TODO: infoBoxMessage should ideally be implemented for all dimensions
                    />
                )
            }
            return content
        }

        return (
            <Fragment>
                {this.renderPersistedContent(
                    dimensionProps,
                    displayNameProperty
                )}
                {dialogId && dynamicContent()}
            </Fragment>
        )
    }

    getPrimaryOnClick = (handler) => () => {
        handler()
        this.closeDialog()
    }

    render() {
        const { dialogId, dimensions } = this.props
        const dimension = isScatterAttribute(dialogId)
            ? dimensions[DIMENSION_ID_DATA]
            : dimensions[dialogId]

        return (
            <Fragment>
                {dimension && (
                    <Modal
                        onClose={this.closeDialog}
                        dataTest={`dialog-manager-${dimension.id}`}
                        position="top"
                        fluid
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
                                    renderComponent={(handler) =>
                                        this.props.dimensionIdsInLayout.includes(
                                            dialogId
                                        ) || isScatterAttribute(dialogId) ? (
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

DialogManager.propTypes = {
    changeDialog: PropTypes.func.isRequired,
    dataEngine: PropTypes.object.isRequired,
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
    getItemsByAttribute: PropTypes.func,
    metadata: PropTypes.object,
    parentGraphMap: PropTypes.object,
    rootOrgUnits: PropTypes.array,
    selectedItems: PropTypes.func,
    setUiItemAttributes: PropTypes.func,
    setUiItems: PropTypes.func,
    settings: PropTypes.object,
    type: PropTypes.string,
}

const EMPTY_DX_IDS = []

const mapStateToProps = (state) => ({
    displayNameProperty: sGetSettingsDisplayNameProperty(state),
    dialogId: sGetUiActiveModalDialog(state) || null,
    dimensions: sGetDimensions(state),
    metadata: sGetMetadata(state),
    parentGraphMap: sGetUiParentGraphMap(state),
    dxIds: sGetUiItemsByDimension(state, DIMENSION_ID_DATA) || EMPTY_DX_IDS,
    ouIds: sGetUiItemsByDimension(state, DIMENSION_ID_ORGUNIT),
    selectedItems: (dimensionId) => sGetUiItemsByDimension(state, dimensionId),
    settings: sGetSettings(state),
    type: sGetUiType(state),
    getAxisIdByDimensionId: (dimensionId) =>
        sGetAxisIdByDimensionId(state, dimensionId),
    dimensionIdsInLayout: sGetDimensionIdsFromLayout(state),
    getItemsByAttribute: (attribute) =>
        sGetUiItemsByAttribute(state, attribute),
})

export default connect(mapStateToProps, {
    changeDialog: acSetUiActiveModalDialog,
    setRecommendedIds: acSetRecommendedIds,
    setUiItems: acSetUiItems,
    addMetadata: acAddMetadata,
    addParentGraphMap: acAddParentGraphMap,
    setUiItemAttributes: acSetUiItemAttributes,
})(DialogManager)
