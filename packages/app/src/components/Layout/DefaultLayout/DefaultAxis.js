import React from 'react'
import { connect } from 'react-redux'
import i18n from '@dhis2/d2-i18n'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import {
    AXIS_ID_COLUMNS,
    DEFAULT_AXIS_IDS,
    DIMENSION_ID_DATA,
    isYearOverYear,
    isDualAxisType,
    getAxisName,
} from '@dhis2/analytics'

import Chip from '../Chip'
import { sGetUi } from '../../../reducers/ui'
import { decodeDataTransfer } from '../../../modules/dnd'
import {
    acAddUiLayoutDimensions,
    acSetUiActiveModalDialog,
} from '../../../actions/ui'
import { SOURCE_DIMENSIONS, menuLabels } from '../../../modules/layout'
import { getAdaptedUiByType } from '../../../modules/ui'

import styles from './styles/DefaultAxis.style'
class Axis extends React.Component {
    onDragOver = e => {
        e.preventDefault()
    }

    onDrop = e => {
        e.preventDefault()

        const { dimensionId, source } = decodeDataTransfer(e)

        this.props.onAddDimension({
            [dimensionId]: this.props.axisId,
        })

        const items = this.props.itemsByDimension[dimensionId]
        const hasNoItems = Boolean(!items || !items.length)

        if (source === SOURCE_DIMENSIONS && hasNoItems) {
            this.props.onDropWithoutItems(dimensionId)
        }
    }

    isMoveSupported = () => !isYearOverYear(this.props.type)

    getAxisMenuItems = dimensionId =>
        DEFAULT_AXIS_IDS.filter(key => key !== this.props.axisId).map(key => (
            <MenuItem
                key={`${dimensionId}-to-${key}`}
                onClick={this.props.getMoveHandler({ [dimensionId]: key })}
            >{`${i18n.t('Move to')} ${menuLabels[key]}`}</MenuItem>
        ))

    isSeries = () => this.props.axisId === AXIS_ID_COLUMNS

    isData = dimensionId => dimensionId === DIMENSION_ID_DATA

    getItemsArrayByDimension = dimensionId =>
        this.props.itemsByDimension[dimensionId] || []

    shouldHaveDualAxis = dimensionId =>
        Boolean(
            this.isSeries() &&
                this.isData(dimensionId) &&
                isDualAxisType(this.props.type) &&
                this.getItemsArrayByDimension(this.props.axis[0]).length > 1
        )

    getDualAxisItem = dimensionId => (
        <MenuItem
            key={`dual-axis-${dimensionId}`}
            onClick={this.props.onOpenAxisSetup}
        >
            {i18n.t('Manage axes')}
        </MenuItem>
    )

    getRemoveMenuItem = dimensionId => (
        <MenuItem
            key={`remove-${dimensionId}`}
            onClick={this.props.getRemoveHandler(dimensionId)}
        >
            {i18n.t('Remove')}
        </MenuItem>
    )

    getDividerItem = key => <Divider light key={key} />

    getMenuItems = dimensionId => [
        this.shouldHaveDualAxis(dimensionId)
            ? this.getDualAxisItem(dimensionId)
            : null,
        this.shouldHaveDualAxis(dimensionId)
            ? this.getDividerItem('dual-axis-menu-divider')
            : null,
        ...(this.isMoveSupported() ? this.getAxisMenuItems(dimensionId) : []),
        this.getRemoveMenuItem(dimensionId),
    ]

    render() {
        return (
            <div
                id={this.props.axisId}
                style={{ ...styles.axisContainer, ...this.props.style }}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
            >
                <div style={styles.label}>{getAxisName(this.props.axisId)}</div>
                <div style={styles.content}>
                    {this.props.axis.map(dimensionId => (
                        <Chip
                            key={`${this.props.axisId}-${dimensionId}`}
                            onClick={this.props.getOpenHandler(dimensionId)}
                            axisId={this.props.axisId}
                            dimensionId={dimensionId}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ui: sGetUi(state),
})

const mapDispatchToProps = dispatch => ({
    onAddDimension: map => dispatch(acAddUiLayoutDimensions(map)),
    onDropWithoutItems: dimensionId =>
        dispatch(acSetUiActiveModalDialog(dimensionId)),
    getOpenHandler: dimensionId => () =>
        dispatch(acSetUiActiveModalDialog(dimensionId)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const adaptedUi = getAdaptedUiByType(stateProps.ui)

    return {
        axis: adaptedUi.layout[ownProps.axisId],
        itemsByDimension: adaptedUi.itemsByDimension,
        type: adaptedUi.type,
        ...dispatchProps,
        ...ownProps,
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Axis)
