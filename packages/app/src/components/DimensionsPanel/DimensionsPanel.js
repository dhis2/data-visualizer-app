import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    DimensionsPanel,
    DimensionMenu,
    getDisallowedDimensions,
    getAllLockedDimensionIds,
    DIMENSION_ID_ASSIGNED_CATEGORIES,
} from '@dhis2/analytics'
import PropTypes from 'prop-types'

import DialogManager from './Dialogs/DialogManager'
import { SOURCE_DIMENSIONS } from '../../modules/layout'
import { setDataTransfer } from '../../modules/dnd'
import * as fromReducers from '../../reducers'
import * as fromActions from '../../actions'

import { styles } from './styles/DimensionsPanel.style'
import { AXIS_SETUP_DIALOG_ID } from '../AxisSetup/AxisSetup'
import {
    acSetUiActiveModalDialog,
    acAddUiLayoutDimensions,
    acRemoveUiLayoutDimensions,
} from '../../actions/ui'
import { sGetUiType } from '../../reducers/ui'
import { createSelector } from 'reselect'

export class Dimensions extends Component {
    state = {
        dimensionMenuAnchorEl: null,
        dimensionId: null,
    }

    onDimensionOptionsClick = (event, id) => {
        event.stopPropagation()

        // set anchor for options menu
        // open menu
        this.setState({
            dimensionMenuAnchorEl: event.currentTarget,
            dimensionId: id,
        })
    }

    onDimensionOptionsClose = () =>
        this.setState({
            dimensionMenuAnchorEl: null,
            dimensionId: null,
        })

    onDimensionDragStart = e => {
        setDataTransfer(e, SOURCE_DIMENSIONS)
    }

    disabledDimension = dimensionId =>
        this.props.disallowedDimensions.includes(dimensionId)

    lockedDimension = dimensionId =>
        this.props.lockedDimensions.includes(dimensionId)

    getNumberOfDimensionItems = () =>
        (this.props.itemsByDimension[this.state.dimensionId] || []).length

    getFilteredDimensions = () =>
        Object.values(this.props.dimensions).filter(
            dimension => !dimension.noItems
        )

    render() {
        return (
            <div style={styles.divContainer}>
                <DimensionsPanel
                    dimensions={this.getFilteredDimensions()}
                    selectedIds={this.props.selectedIds}
                    disabledDimension={this.disabledDimension}
                    lockedDimension={this.lockedDimension}
                    recommendedDimension={dimensionId =>
                        this.props.recommendedIds.includes(dimensionId)
                    }
                    onDimensionOptionsClick={this.onDimensionOptionsClick}
                    onDimensionDragStart={this.onDimensionDragStart}
                    onDimensionClick={this.props.onDimensionClick}
                />
                <DimensionMenu
                    dimensionId={this.state.dimensionId}
                    currentAxisId={this.props.getCurrentAxisId(
                        this.state.dimensionId
                    )}
                    visType={this.props.ui.type}
                    numberOfDimensionItems={this.getNumberOfDimensionItems()}
                    dualAxisItemHandler={this.props.dualAxisItemHandler}
                    isAssignedCategoriesInLayout={
                        this.props.layoutHasAssignedCategories
                    }
                    assignedCategoriesItemHandler={destination =>
                        this.props.assignedCategoriesItemHandler(
                            this.props.layoutHasAssignedCategories,
                            destination
                        )
                    }
                    axisItemHandler={this.props.axisItemHandler}
                    removeItemHandler={this.props.removeItemHandler}
                    anchorEl={this.state.dimensionMenuAnchorEl}
                    onClose={this.onDimensionOptionsClose}
                />
                <DialogManager />
            </div>
        )
    }
}

const getDisallowedDimensionsMemo = createSelector([sGetUiType], type =>
    getDisallowedDimensions(type)
)

const getLockedDimensionsMemo = createSelector([sGetUiType], type =>
    getAllLockedDimensionIds(type)
)

Dimensions.propTypes = {
    assignedCategoriesItemHandler: PropTypes.func,
    axisItemHandler: PropTypes.func,
    dimensions: PropTypes.object,
    disallowedDimensions: PropTypes.array,
    dualAxisItemHandler: PropTypes.func,
    getCurrentAxisId: PropTypes.func,
    itemsByDimension: PropTypes.object,
    layoutHasAssignedCategories: PropTypes.bool,
    lockedDimensions: PropTypes.array,
    recommendedIds: PropTypes.array,
    removeItemHandler: PropTypes.func,
    selectedIds: PropTypes.array,
    ui: PropTypes.object,
    onDimensionClick: PropTypes.func,
}

const mapStateToProps = state => ({
    ui: fromReducers.fromUi.sGetUi(state),
    dimensions: fromReducers.fromDimensions.sGetDimensions(state),
    selectedIds: fromReducers.fromUi.sGetDimensionIdsFromLayout(state),
    recommendedIds: fromReducers.fromRecommendedIds.sGetRecommendedIds(state),
    layout: fromReducers.fromUi.sGetUiLayout(state),
    itemsByDimension: fromReducers.fromUi.sGetUiItems(state),
    disallowedDimensions: getDisallowedDimensionsMemo(state),
    lockedDimensions: getLockedDimensionsMemo(state),
    layoutHasAssignedCategories: fromReducers.fromUi.sLayoutHasAssignedCategories(
        state
    ),
    getCurrentAxisId: dimensionId =>
        fromReducers.fromUi.getAxisIdByDimensionId(state, dimensionId),
})

const mapDispatchToProps = dispatch => ({
    onDimensionClick: id =>
        dispatch(fromActions.fromUi.acSetUiActiveModalDialog(id)),
    dualAxisItemHandler: () =>
        dispatch(acSetUiActiveModalDialog(AXIS_SETUP_DIALOG_ID)),
    axisItemHandler: (dimensionId, targetAxisId, numberOfDimensionItems) => {
        dispatch(acAddUiLayoutDimensions({ [dimensionId]: targetAxisId }))

        if (numberOfDimensionItems > 0) {
            dispatch(acSetUiActiveModalDialog(dimensionId))
        }
    },
    removeItemHandler: dimensionId => {
        dispatch(acRemoveUiLayoutDimensions(dimensionId))
    },
    assignedCategoriesItemHandler: (
        layoutHasAssignedCategories,
        destination
    ) => {
        dispatch(
            layoutHasAssignedCategories
                ? acRemoveUiLayoutDimensions(DIMENSION_ID_ASSIGNED_CATEGORIES)
                : acAddUiLayoutDimensions({
                      [DIMENSION_ID_ASSIGNED_CATEGORIES]: destination,
                  })
        )
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Dimensions)
