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
import { SOURCE_DIMENSIONS, getInverseLayout } from '../../modules/layout'
import { setDataTransfer } from '../../modules/dnd'
import * as fromReducers from '../../reducers'
import * as fromActions from '../../actions'

import { styles } from './styles/DimensionsPanel.style'
import { getAdaptedUiByType } from '../../modules/ui'
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

    getUiAxisId = () => {
        const adaptedUi = getAdaptedUiByType(this.props.ui)
        const inverseLayout = getInverseLayout(adaptedUi.layout)
        return inverseLayout[this.state.dimensionId]
    }

    getNumberOfDimensionItems = () =>
        (this.props.itemsByDimension[this.state.dimensionId] || []).length

    getFilteredDimensions = () =>
        Object.values(this.props.dimensions).filter(
            dimension => !dimension.noItems
        )

    isAssignedCategoriesDimensionInLayout = () =>
        this.props.adaptedLayoutHasDimension(DIMENSION_ID_ASSIGNED_CATEGORIES)
    // AC TODO: Move this to a central reusable location

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
                {/* {this.state.dimensionMenuAnchorEl && ( */}
                <DimensionMenu
                    dimensionId={this.state.dimensionId}
                    currentAxisId={this.getUiAxisId()}
                    visType={this.props.ui.type}
                    numberOfDimensionItems={this.getNumberOfDimensionItems()}
                    dualAxisItemHandler={this.props.dualAxisItemHandler}
                    isAssignedCategoriesInLayout={this.isAssignedCategoriesDimensionInLayout()}
                    assignedCategoriesItemHandler={
                        destination =>
                            this.props.assignedCategoriesItemHandler(
                                this.isAssignedCategoriesDimensionInLayout(),
                                destination
                            ) // AC TODO: Move this to a central reusable location
                    }
                    axisItemHandler={this.props.axisItemHandler}
                    removeItemHandler={this.props.removeItemHandler}
                    anchorEl={this.state.dimensionMenuAnchorEl}
                    onClose={this.onDimensionOptionsClose}
                />
                {/* )} */}
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
    adaptedLayoutHasDimension: PropTypes.func,
    assignedCategoriesItemHandler: PropTypes.func,
    axisItemHandler: PropTypes.func,
    dimensions: PropTypes.object,
    disallowedDimensions: PropTypes.array,
    dualAxisItemHandler: PropTypes.func,
    itemsByDimension: PropTypes.object,
    lockedDimensions: PropTypes.array,
    recommendedIds: PropTypes.array,
    removeItemHandler: PropTypes.func,
    selectedIds: PropTypes.array,
    ui: PropTypes.object,
    onDimensionClick: PropTypes.func,
}

const mapStateToProps = state => {
    return {
        ui: fromReducers.fromUi.sGetUi(state),
        dimensions: fromReducers.fromDimensions.sGetDimensions(state),
        selectedIds: fromReducers.fromUi.sGetDimensionIdsFromLayout(state),
        recommendedIds: fromReducers.fromRecommendedIds.sGetRecommendedIds(
            state
        ),
        layout: fromReducers.fromUi.sGetUiLayout(state),
        itemsByDimension: fromReducers.fromUi.sGetUiItems(state),
        disallowedDimensions: getDisallowedDimensionsMemo(state),
        lockedDimensions: getLockedDimensionsMemo(state),
        adaptedLayoutHasDimension: dimensionId =>
            fromReducers.fromUi.sAdaptedLayoutHasDimension(state, dimensionId),
    }
}

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
        isAssignedCategoriesDimensionInLayout,
        destination
    ) => {
        dispatch(
            // AC TODO: Move this to a central reusable location
            isAssignedCategoriesDimensionInLayout
                ? acRemoveUiLayoutDimensions(DIMENSION_ID_ASSIGNED_CATEGORIES)
                : acAddUiLayoutDimensions({
                      [DIMENSION_ID_ASSIGNED_CATEGORIES]: destination,
                  })
        )
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Dimensions)
