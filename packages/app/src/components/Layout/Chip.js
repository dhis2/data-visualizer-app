// TODO: Refactor chip to contain less logic
import React from 'react'
import { connect } from 'react-redux'
import WarningIcon from '@material-ui/icons/Warning'
import LockIcon from '@material-ui/icons/Lock'
import i18n from '@dhis2/d2-i18n'
import {
    getFixedDimensionProp,
    getAxisMaxNumberOfItems,
    hasAxisTooManyItems,
    getAxisPerLockedDimension,
    getDisplayNameByVisType,
    getAxisName,
    DIMENSION_ID_ASSIGNED_CATEGORIES,
} from '@dhis2/analytics'
import PropTypes from 'prop-types'

import Menu from './Menu'
import Tooltip from './Tooltip'
import { setDataTransfer } from '../../modules/dnd'
import { sGetDimensions } from '../../reducers/dimensions'
import { sGetUiItemsByDimension, sGetUiType } from '../../reducers/ui'
import DynamicDimensionIcon from '../../assets/DynamicDimensionIcon'
import { styles } from './styles/Chip.style'
import { acSetUiActiveModalDialog } from '../../actions/ui'

const TOOLTIP_ENTER_DELAY = 500

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

class Chip extends React.Component {
    state = {
        tooltipOpen: false,
    }

    id = Math.random().toString(36)

    timeout = null

    isLocked =
        getAxisPerLockedDimension(this.props.type, this.props.dimensionId) ===
        this.props.axisId

    axisMaxNumberOfItems = getAxisMaxNumberOfItems(
        this.props.type,
        this.props.axisId
    )

    handleMouseOver = () => {
        if (this.timeout === null) {
            this.timeout = setTimeout(
                () =>
                    this.setState({
                        tooltipOpen: true,
                    }),
                TOOLTIP_ENTER_DELAY
            )
        }
    }

    handleMouseOut = () => {
        if (typeof this.timeout === 'number') {
            clearTimeout(this.timeout)
            this.timeout = null
            this.setState({
                tooltipOpen: false,
            })
        }
    }

    handleClick = () => {
        if (!getFixedDimensionProp(this.props.dimensionId, 'noItems')) {
            this.props.getOpenHandler(this.props.dimensionId)
        }

        this.handleMouseOut()
    }

    getDragStartHandler = () => event => {
        this.handleMouseOut()

        setDataTransfer(event, this.props.axisId)
    }

    getAnchorEl = () => document.getElementById(this.id)

    getWrapperStyles = () => ({
        ...styles.chipWrapper,
        ...(!getFixedDimensionProp(this.props.dimensionId, 'noItems') &&
        !this.props.items.length
            ? styles.chipEmpty
            : {}),
    })

    renderChipLabel = () => {
        const numberOfItems = this.props.items.length

        const getItemsLabel =
            !!this.axisMaxNumberOfItems &&
            numberOfItems > this.axisMaxNumberOfItems
                ? i18n.t(`{{total}} of {{axisMaxNumberOfItems}} selected`, {
                      total: numberOfItems,
                      axisMaxNumberOfItems: this.axisMaxNumberOfItems,
                  })
                : i18n.t('{{total}} selected', {
                      total: numberOfItems,
                  })

        return `${this.props.dimensionName}${
            this.props.items.length > 0 ? `: ${getItemsLabel}` : ''
        }`
    }

    renderChipIcon = () => {
        const Icon = getFixedDimensionProp(this.props.dimensionId, 'icon')
        return Icon ? (
            <Icon style={styles.fixedDimensionIcon} />
        ) : (
            <DynamicDimensionIcon style={styles.dynamicDimensionIcon} />
        )
    }

    renderMenu = () => (
        <div style={styles.chipRight}>
            <Menu
                dimensionId={this.props.dimensionId}
                currentAxisId={this.props.axisId}
                visType={this.props.type}
                numberOfDimensionItems={this.props.items.length}
            />
        </div>
    )

    renderTooltip = () => {
        if (this.props.dimensionId !== DIMENSION_ID_ASSIGNED_CATEGORIES) {
            const activeItemIds = this.axisMaxNumberOfItems
                ? this.props.items.slice(0, this.axisMaxNumberOfItems)
                : this.props.items

            const lockedLabel = this.isLocked
                ? i18n.t(
                      `{{dimensionName}} is locked to {{axisName}} for {{visTypeName}}`,
                      {
                          dimensionName: this.props.dimensionName,
                          axisName: getAxisName(this.props.axisId),
                          visTypeName: getDisplayNameByVisType(this.props.type),
                      }
                  )
                : null

            return (
                <Tooltip
                    dimensionId={this.props.dimensionId}
                    itemIds={activeItemIds}
                    lockedLabel={lockedLabel}
                    displayLimitedAmount={
                        this.props.items.length > activeItemIds.length
                    }
                    open={this.state.tooltipOpen}
                    anchorEl={this.getAnchorEl()}
                />
            )
        }
    }

    render = () => (
        <div
            style={this.getWrapperStyles()}
            data-dimensionid={this.props.dimensionId}
            draggable={!this.isLocked}
            onDragStart={this.getDragStartHandler()}
        >
            <div
                id={this.id}
                style={styles.chipLeft}
                onClick={this.handleClick}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
            >
                <div style={styles.iconWrapper}>{this.renderChipIcon()}</div>
                {this.renderChipLabel()}
                {hasAxisTooManyItems(
                    this.props.type,
                    this.props.axisId,
                    this.props.items.length
                ) && WarningIconWrapper}
                {this.isLocked && LockIconWrapper}
            </div>
            {!this.isLocked && this.renderMenu()}
            {this.getAnchorEl() && this.renderTooltip()}
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
