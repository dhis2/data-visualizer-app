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
    isDimensionLocked,
    DIMENSION_PROP_NO_ITEMS,
} from '@dhis2/analytics'

import ChipMenu from './ChipMenu'
import TooltipContent from './TooltipContent'
import { setDataTransfer } from '../../modules/dnd'
import { sGetDimensions } from '../../reducers/dimensions'
import { sGetUiItemsByDimension, sGetUiType } from '../../reducers/ui'
import DynamicDimensionIcon from '../../assets/DynamicDimensionIcon'
import { styles } from './styles/Chip.style'
import { acSetUiActiveModalDialog } from '../../actions/ui'

const LockIconWrapper = (
    <div style={styles.lockIconWrapper}>
        <LockIcon style={styles.lockIcon} />
    </div>
)

const WarningIconWrapper = (
    <div style={styles.warningIconWrapper}>
        <WarningIcon style={styles.warningIcon} />
    </div>
)

const Chip = ({
    type,
    dimensionId,
    dimensionName,
    axisId,
    items,
    getOpenHandler,
}) => {
    const id = Math.random().toString(36)
    const isLocked = () => isDimensionLocked(type, dimensionId)

    const getMaxNumberOfItems = () => getAxisMaxNumberOfItems(type, axisId)

    const handleClick = () => {
        if (!getPredefinedDimensionProp(dimensionId, DIMENSION_PROP_NO_ITEMS)) {
            getOpenHandler(dimensionId)
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

    const renderMenu = () => (
        <div style={styles.chipRight}>
            <ChipMenu
                dimensionId={dimensionId}
                currentAxisId={axisId}
                visType={type}
                numberOfDimensionItems={items.length}
            />
        </div>
    )

    const renderTooltipContent = () => {
        const activeItemIds = getMaxNumberOfItems()
            ? items.slice(0, getMaxNumberOfItems())
            : items

        const lockedLabel = isLocked()
            ? i18n.t(
                  `{{dimensionName}} is locked to {{axisName}} for {{visTypeName}}`,
                  {
                      dimensionName: dimensionName,
                      axisName: getAxisNameByLayoutType(
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
            <span style={styles.label}>{dimensionName}</span>
            <span>{renderChipLabelSuffix()}</span>
            {hasAxisTooManyItems(type, axisId, items.length) &&
                WarningIconWrapper}
            {isLocked() && LockIconWrapper}
        </>
    )

    return (
        <div
            style={getWrapperStyles()}
            data-dimensionid={dimensionId}
            draggable={!isLocked()}
            onDragStart={getDragStartHandler()}
        >
            {dimensionId !== DIMENSION_ID_ASSIGNED_CATEGORIES ? (
                <Tooltip content={renderTooltipContent()} placement="bottom">
                    {({ ref, onMouseOver, onMouseOut }) => (
                        <div
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
                <div id={id} style={styles.chipLeft} onClick={handleClick}>
                    {renderChipContent()}
                </div>
            )}
            {!isLocked() && renderMenu()}
        </div>
    )
}

Chip.propTypes = {
    axisId: PropTypes.string.isRequired,
    dimensionId: PropTypes.string.isRequired,
    dimensionName: PropTypes.string.isRequired,
    getOpenHandler: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    items: PropTypes.array,
}

Chip.defaultProps = {
    items: [],
}

const mapStateToProps = (state, ownProps) => ({
    dimensionName: (sGetDimensions(state)[ownProps.dimensionId] || {}).name,
    items: sGetUiItemsByDimension(state, ownProps.dimensionId) || [],
    type: sGetUiType(state),
})

const mapDispatchToProps = dispatch => ({
    getOpenHandler: dimensionId =>
        dispatch(acSetUiActiveModalDialog(dimensionId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Chip)
