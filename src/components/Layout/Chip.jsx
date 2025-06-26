// TODO: Refactor chip to contain less logic
import {
    getPredefinedDimensionProp,
    getDimensionMaxNumberOfItems,
    getAxisMaxNumberOfItems,
    hasAxisTooManyItems,
    hasDimensionTooManyItems,
    getDisplayNameByVisType,
    getAxisNameByLayoutType,
    getLayoutTypeByVisType,
    DIMENSION_ID_ASSIGNED_CATEGORIES,
    DIMENSION_PROP_NO_ITEMS,
    DIMENSION_TYPE_DATA_ELEMENT,
    DIMENSION_TYPE_DATA_ELEMENT_OPERAND,
    VIS_TYPE_OUTLIER_TABLE,
    VIS_TYPE_SCATTER,
    DIMENSION_ID_DATA,
    ALL_DYNAMIC_DIMENSION_ITEMS,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import { Tooltip, IconWarning16 } from '@dhis2/ui'
import { colors } from '@dhis2/ui-constants'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import DynamicDimensionIcon from '../../assets/DynamicDimensionIcon.jsx'
import { setDataTransfer } from '../../modules/dnd.js'
import { sGetDimensions } from '../../reducers/dimensions.js'
import { sGetMetadata } from '../../reducers/metadata.js'
import { sGetUiType } from '../../reducers/ui.js'
import styles from './styles/Chip.module.css'
import { default as TooltipContent } from './TooltipContent.jsx'

const ITEMS_PROP_DEFAULT = []

const Chip = ({
    type,
    dimensionId,
    dimensionName,
    axisId,
    items = ITEMS_PROP_DEFAULT,
    onClick,
    isLocked,
    axisName,
    metadata,
    contextMenu,
}) => {
    const id = Math.random().toString(36)

    const dataTest = `layout-chip-${dimensionId}`

    const LockIconWrapper = (
        <div
            className={styles.lockIconWrapper}
            data-test={`${dataTest}-lock-icon`}
        >
            <svg
                width="7"
                height="9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.5 1A1.5 1.5 0 0 0 2 2.5V3h3v-.5A1.5 1.5 0 0 0 3.5 1ZM1 2.5V3H0v6h7V3H6v-.5a2.5 2.5 0 0 0-5 0ZM1 8V4h5v4H1Zm3-1V5H3v2h1Z"
                    fill="none"
                />
            </svg>
        </div>
    )

    const WarningIconWrapper = (
        <div
            className={styles.warningIconWrapper}
            data-test={`${dataTest}-warning-icon`}
        >
            <IconWarning16 color={colors.yellow700} />
        </div>
    )

    const getMaxNumberOfItems = () =>
        getAxisMaxNumberOfItems(type, axisId) ||
        getDimensionMaxNumberOfItems(type, dimensionId)

    let activeItemIds = getMaxNumberOfItems()
        ? items.slice(0, getMaxNumberOfItems())
        : items

    // filter out non DATA_ELEMENT types for Outlier table vis type
    if (type === VIS_TYPE_OUTLIER_TABLE && dimensionId === DIMENSION_ID_DATA) {
        activeItemIds = activeItemIds.filter((id) =>
            [
                DIMENSION_TYPE_DATA_ELEMENT,
                DIMENSION_TYPE_DATA_ELEMENT_OPERAND,
            ].includes(metadata[id]?.dimensionItemType)
        )
    }

    const hasWarning =
        hasAxisTooManyItems(type, axisId, items.length) ||
        hasDimensionTooManyItems(type, dimensionId, items.length) ||
        items.length > activeItemIds.length

    const isSplitAxis =
        type === VIS_TYPE_SCATTER && dimensionId === DIMENSION_ID_DATA

    let chipLabelSuffix

    if (items.length > 0) {
        if (items.includes(ALL_DYNAMIC_DIMENSION_ITEMS)) {
            chipLabelSuffix = i18n.t('all')
        } else if (isSplitAxis) {
            chipLabelSuffix = i18n.t(metadata[items[0]]?.name || null)
        } else {
            chipLabelSuffix = items.length
        }
    }

    const handleClick = () => {
        if (!getPredefinedDimensionProp(dimensionId, DIMENSION_PROP_NO_ITEMS)) {
            onClick()
        }
    }

    const getDragStartHandler = () => (event) => {
        setDataTransfer(event, axisId)
    }

    const renderChipIcon = () => {
        const Icon = getPredefinedDimensionProp(dimensionId, 'icon')
        return Icon ? (
            <Icon className={styles.fixedDimensionIcon} />
        ) : (
            <DynamicDimensionIcon className={styles.dynamicDimensionIcon} />
        )
    }

    const renderTooltipContent = () => {
        const lockedLabel = isLocked
            ? i18n.t(
                  `{{dimensionName}} is locked to {{axisName}} for {{visTypeName}}`,
                  {
                      dimensionName: dimensionName,
                      axisName:
                          axisName ||
                          getAxisNameByLayoutType(
                              axisId,
                              getLayoutTypeByVisType(type)
                          ),
                      visTypeName: getDisplayNameByVisType(type),
                  }
              )
            : null

        return (
            <TooltipContent
                dimensionId={dimensionId}
                itemIds={activeItemIds}
                lockedLabel={lockedLabel}
                displayLimitedAmount={items.length > activeItemIds.length}
            />
        )
    }

    const renderChipContent = () => (
        <>
            <div className={styles.leftIconWrapper}>{renderChipIcon()}</div>
            <span
                className={cx({
                    [styles.label]: !isSplitAxis,
                })}
            >
                {dimensionName}
            </span>
            {chipLabelSuffix && (
                <span className={styles.suffix} data-test="chip-suffix">
                    {chipLabelSuffix}
                </span>
            )}
            {hasWarning && WarningIconWrapper}
        </>
    )

    return (
        <div
            className={cx(styles.chip, {
                [styles.chipEmpty]:
                    !getPredefinedDimensionProp(
                        dimensionId,
                        DIMENSION_PROP_NO_ITEMS
                    ) && !items.length,
                [styles.assignedCategories]:
                    dimensionId === DIMENSION_ID_ASSIGNED_CATEGORIES,
            })}
            data-dimensionid={dimensionId}
            draggable={!isLocked}
            onDragStart={getDragStartHandler()}
        >
            {dimensionId !== DIMENSION_ID_ASSIGNED_CATEGORIES ? (
                <Tooltip content={renderTooltipContent()} placement="bottom">
                    {({ ref, onMouseOver, onMouseOut }) => (
                        <div
                            data-test={dataTest}
                            id={id}
                            className={styles.chipLeft}
                            onClick={handleClick}
                            ref={ref}
                            onMouseOver={onMouseOver}
                            onMouseOut={onMouseOut}
                        >
                            {renderChipContent()}
                        </div>
                    )}
                </Tooltip>
            ) : (
                <div
                    id={id}
                    className={styles.chipLeft}
                    data-test={dataTest}
                    onClick={handleClick}
                >
                    {renderChipContent()}
                </div>
            )}
            {contextMenu && (
                <div className={styles.chipRight}> {contextMenu}</div>
            )}
            {isLocked && (
                <Tooltip content={renderTooltipContent()} placement="bottom">
                    {LockIconWrapper}
                </Tooltip>
            )}
        </div>
    )
}

Chip.propTypes = {
    axisId: PropTypes.string.isRequired,
    dimensionId: PropTypes.string.isRequired,
    dimensionName: PropTypes.string.isRequired,
    isLocked: PropTypes.bool.isRequired,
    metadata: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    axisName: PropTypes.string,
    contextMenu: PropTypes.object,
    items: PropTypes.array,
}

const mapStateToProps = (state, ownProps) => ({
    dimensionName: (sGetDimensions(state)[ownProps.dimensionId] || {}).name,
    type: sGetUiType(state),
    metadata: sGetMetadata(state),
})

export default connect(mapStateToProps)(Chip)
