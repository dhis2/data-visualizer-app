// TODO: Refactor chip to contain less logic
import {
    getPredefinedDimensionProp,
    getAxisMaxNumberOfItems,
    hasAxisTooManyItems,
    getDisplayNameByVisType,
    getAxisNameByLayoutType,
    getLayoutTypeByVisType,
    DIMENSION_ID_ASSIGNED_CATEGORIES,
    DIMENSION_PROP_NO_ITEMS,
    VIS_TYPE_SCATTER,
    DIMENSION_ID_DATA,
    ALL_DYNAMIC_DIMENSION_ITEMS,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import { Tooltip, IconLock16, IconWarningFilled16 } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import DynamicDimensionIcon from '../../assets/DynamicDimensionIcon.js'
import { setDataTransfer } from '../../modules/dnd.js'
import { sGetDimensions } from '../../reducers/dimensions.js'
import { sGetMetadata } from '../../reducers/metadata.js'
import { sGetUiType } from '../../reducers/ui.js'
import styles from './styles/Chip.module.css'
import { default as TooltipContent } from './TooltipContent.js'

const Chip = ({
    type,
    dimensionId,
    dimensionName,
    axisId,
    items,
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
            className={styles.rightIconWrapper}
            data-test={`${dataTest}-lock-icon`}
        >
            <IconLock16 />
        </div>
    )

    const WarningIconWrapper = (
        <div
            className={styles.rightIconWrapper}
            data-test={`${dataTest}-warning-icon`}
        >
            <IconWarningFilled16 />
        </div>
    )

    const isSplitAxis =
        type === VIS_TYPE_SCATTER && dimensionId === DIMENSION_ID_DATA

    const getMaxNumberOfItems = () => getAxisMaxNumberOfItems(type, axisId)

    const handleClick = () => {
        if (!getPredefinedDimensionProp(dimensionId, DIMENSION_PROP_NO_ITEMS)) {
            onClick()
        }
    }

    const getDragStartHandler = () => (event) => {
        setDataTransfer(event, axisId)
    }

    const renderChipLabelSuffix = () => {
        const numberOfItems = items.length
        let itemsLabel
        if (items.includes(ALL_DYNAMIC_DIMENSION_ITEMS)) {
            itemsLabel = i18n.t('all')
        } else if (isSplitAxis) {
            itemsLabel = i18n.t(metadata[items[0]]?.name || '')
        } else {
            itemsLabel = numberOfItems
        }
        return items.length > 0 ? itemsLabel : ''
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
        const activeItemIds = getMaxNumberOfItems()
            ? items.slice(0, getMaxNumberOfItems())
            : items
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
            <span
                className={cx({
                    [styles.label]: !isSplitAxis,
                })}
            >
                {renderChipLabelSuffix()}
            </span>
            {hasAxisTooManyItems(type, axisId, items.length) &&
                WarningIconWrapper}
            {isLocked && LockIconWrapper}
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

Chip.defaultProps = {
    items: [],
}

const mapStateToProps = (state, ownProps) => ({
    dimensionName: (sGetDimensions(state)[ownProps.dimensionId] || {}).name,
    type: sGetUiType(state),
    metadata: sGetMetadata(state),
})

export default connect(mapStateToProps)(Chip)
