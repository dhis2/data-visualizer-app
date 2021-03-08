import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Popover, FlyoutMenu, Tooltip, MenuItem, MenuDivider } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { AXIS_ID_COLUMNS, DIMENSION_ID_DATA } from '@dhis2/analytics'

import Chip from '../Chip'
import { sGetUi, sGetUiLayout } from '../../../reducers/ui'
import { acSetUiActiveModalDialog } from '../../../actions/ui'
import styles from './styles/ScatterAxis.style'
import IconButton from '../../IconButton/IconButton'
import MoreHorizontalIcon from '../../../assets/MoreHorizontalIcon'
import {
    ITEM_ATTRIBUTE_HORIZONTAL,
    ITEM_ATTRIBUTE_VERTICAL,
} from '../../../modules/ui'
import {
    acSetUiItemAttributes,
    acRemoveUiItemAttributes,
} from '../../../actions/ui'
import { sGetUiItemsByAttribute } from '../../../reducers/ui'
import VerticalIcon from '../../../assets/VerticalIcon'
import HorizontalIcon from '../../../assets/HorizontalIcon'

const Axis = ({
    label,
    style,
    getOpenHandler,
    items,
    itemAttribute,
    getItemsByAttribute,
    setItemAttributes,
    removeItemAttributes,
}) => {
    const buttonRef = useRef()
    const [dialogIsOpen, setDialogIsOpen] = useState(false)

    const toggleMenu = () => setDialogIsOpen(!dialogIsOpen)

    const destination =
        itemAttribute === ITEM_ATTRIBUTE_VERTICAL
            ? ITEM_ATTRIBUTE_HORIZONTAL
            : ITEM_ATTRIBUTE_VERTICAL

    const onSwap = () => {
        toggleMenu()
        const verticalItems = getItemsByAttribute(ITEM_ATTRIBUTE_VERTICAL)
        const horizontalItems = getItemsByAttribute(ITEM_ATTRIBUTE_HORIZONTAL)
        removeItemAttributes(
            DIMENSION_ID_DATA,
            verticalItems,
            ITEM_ATTRIBUTE_VERTICAL
        )
        removeItemAttributes(
            DIMENSION_ID_DATA,
            horizontalItems,
            ITEM_ATTRIBUTE_HORIZONTAL
        )
        setItemAttributes(
            DIMENSION_ID_DATA,
            horizontalItems,
            ITEM_ATTRIBUTE_VERTICAL
        )
        setItemAttributes(
            DIMENSION_ID_DATA,
            verticalItems,
            ITEM_ATTRIBUTE_HORIZONTAL
        )
    }

    const renderChipMenu = () => (
        <>
            <div ref={buttonRef}>
                <IconButton
                    ariaOwns={dialogIsOpen ? `menu-for-${itemAttribute}` : null}
                    ariaHaspopup={true}
                    onClick={toggleMenu}
                    style={styles.icon}
                    dataTest={`layout-chip-menu-button-${itemAttribute}`}
                >
                    <MoreHorizontalIcon style={styles.icon} />
                </IconButton>
            </div>
            {dialogIsOpen && (
                <Popover
                    reference={buttonRef}
                    placement="bottom-start"
                    onClickOutside={toggleMenu}
                    arrow={false}
                >
                    <FlyoutMenu
                        dense
                        dataTest={'layout-chip-menu-dimension-menu'}
                    >
                        <Tooltip
                            key={`assigned-categories-item-${DIMENSION_ID_DATA}`}
                            content={i18n.t('Not available for Scatter')}
                            aria-label="disabled"
                        >
                            <MenuItem
                                disabled
                                dense
                                label={i18n.t('Add Assigned Categories')}
                                dataTest={`layout-chip-menu-dimension-menu-item-co-menu`}
                            />
                        </Tooltip>
                        <MenuDivider
                            dense
                            key={'assigned-categories-divider'}
                        />
                        <MenuItem
                            key={`${itemAttribute}-to-${destination}`}
                            onClick={onSwap}
                            label={i18n.t(`Swap with {{axisName}} axis`, {
                                axisName:
                                    destination === ITEM_ATTRIBUTE_VERTICAL
                                        ? i18n.t('vertical')
                                        : i18n.t('horizontal'),
                            })}
                            dataTest={`layout-chip-menu-dimension-menu-item-action-${itemAttribute}-to-${destination}`}
                        />
                    </FlyoutMenu>
                </Popover>
            )}
        </>
    )

    const renderIcon = () =>
        itemAttribute === ITEM_ATTRIBUTE_VERTICAL ? (
            <VerticalIcon />
        ) : (
            <HorizontalIcon />
        )

    return (
        <div
            id={label}
            data-test={`${label}-axis`}
            style={{ ...styles.axisContainer, ...style }}
        >
            <div style={styles.label}>
                {label}
                {renderIcon()}
            </div>
            <Chip
                axisId={AXIS_ID_COLUMNS}
                axisName={label}
                onClick={getOpenHandler(itemAttribute)}
                dimensionId={DIMENSION_ID_DATA}
                items={items}
                isLocked={true}
                contextMenu={renderChipMenu()}
            />
        </div>
    )
}

Axis.propTypes = {
    getItemsByAttribute: PropTypes.func,
    getOpenHandler: PropTypes.func,
    itemAttribute: PropTypes.string,
    items: PropTypes.array,
    label: PropTypes.string,
    removeItemAttributes: PropTypes.func,
    setItemAttributes: PropTypes.func,
    style: PropTypes.object,
}

const mapStateToProps = state => ({
    ui: sGetUi(state),
    layout: sGetUiLayout(state),
    getItemsByAttribute: attribute => sGetUiItemsByAttribute(state, attribute),
})

const mapDispatchToProps = dispatch => ({
    getOpenHandler: dialogId => () =>
        dispatch(acSetUiActiveModalDialog(dialogId)),
    setItemAttributes: (dimensionId, itemIds, attribute) =>
        dispatch(acSetUiItemAttributes({ dimensionId, itemIds, attribute })),
    removeItemAttributes: (dimensionId, itemIdsToRemove, attribute) =>
        dispatch(
            acRemoveUiItemAttributes({
                dimensionId,
                itemIdsToRemove,
                attribute,
            })
        ),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Axis)
