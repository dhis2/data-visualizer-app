// TODO: Refactor chip to contain less logic
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import WarningIcon from '@material-ui/icons/Warning'
import LockIcon from '@material-ui/icons/Lock'

import { Tooltip } from '@dhis2/ui'

import i18n from '@dhis2/d2-i18n'
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
} from '@dhis2/analytics'

import TooltipContent from './TooltipContent'
import { setDataTransfer } from '../../modules/dnd'
import { sGetDimensions } from '../../reducers/dimensions'
import { sGetUiType } from '../../reducers/ui'
import DynamicDimensionIcon from '../../assets/DynamicDimensionIcon'
import { styles } from './styles/Chip.style'
import { sGetMetadata } from '../../reducers/metadata'

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
        <div style={styles.lockIconWrapper} data-test={`${dataTest}-lock-icon`}>
            <LockIcon style={styles.lockIcon} />
        </div>
    )

    const WarningIconWrapper = (
        <div
            style={styles.warningIconWrapper}
            data-test={`${dataTest}-warning-icon`}
        >
            <WarningIcon style={styles.warningIcon} />
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

    const getDragStartHandler = () => event => {
        setDataTransfer(event, axisId)
    }

    const getWrapperStyles = () => ({
        ...styles.chipWrapper,
        ...(!getPredefinedDimensionProp(dimensionId, DIMENSION_PROP_NO_ITEMS) &&
        !items.length
            ? styles.chipEmpty
            : {}),
    })

    const renderChipLabelSuffix = () => {
        const numberOfItems = items.length

        const getItemsLabel =
            !!getMaxNumberOfItems() && numberOfItems > getMaxNumberOfItems()
                ? i18n.t(`{{total}} of {{axisMaxNumberOfItems}} selected`, {
                      total: numberOfItems,
                      axisMaxNumberOfItems: getMaxNumberOfItems(),
                  })
                : isSplitAxis
                ? i18n.t(metadata[items[0]]?.name || '')
                : i18n.t('{{total}} selected', {
                      total: numberOfItems,
                  })

        return `${items.length > 0 ? `: ${getItemsLabel}` : ''}`
    }

    const renderChipIcon = () => {
        const Icon = getPredefinedDimensionProp(dimensionId, 'icon')
        return Icon ? (
            <Icon style={styles.fixedDimensionIcon} />
        ) : (
            <DynamicDimensionIcon style={styles.dynamicDimensionIcon} />
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
            <div style={styles.iconWrapper}>{renderChipIcon()}</div>
            <span style={!isSplitAxis ? styles.label : {}}>
                {dimensionName}
            </span>
            <span style={isSplitAxis ? styles.label : {}}>
                {renderChipLabelSuffix()}
            </span>
            {hasAxisTooManyItems(type, axisId, items.length) &&
                WarningIconWrapper}
            {isLocked && LockIconWrapper}
        </>
    )

    return (
        <div
            style={getWrapperStyles()}
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
                            style={styles.chipLeft}
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
                    style={styles.chipLeft}
                    data-test={dataTest}
                    onClick={handleClick}
                >
                    {renderChipContent()}
                </div>
            )}
            {contextMenu && <div style={styles.chipRight}> {contextMenu}</div>}
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
