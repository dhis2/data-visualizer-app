import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    DimensionsPanel,
    DimensionItem,
    DimensionMenu,
    getDisallowedDimensions,
    getAllLockedDimensionIds,
    DIMENSION_ID_ASSIGNED_CATEGORIES,
} from '@dhis2/analytics'
import PropTypes from 'prop-types'
import { Draggable, Droppable } from 'react-beautiful-dnd'

import DialogManager from './Dialogs/DialogManager'
import { SOURCE_DIMENSIONS, getInverseLayout } from '../../modules/layout'
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

    disabledDimension = dimensionId =>
        this.props.disallowedDimensions.includes(dimensionId)

    lockedDimension = dimensionId =>
        this.props.lockedDimensions.includes(dimensionId)

    isRecommendedDimension = dimensionId =>
        this.props.recommendedIds.includes(dimensionId)

    getUiAxisId = () => {
        const adaptedUi = getAdaptedUiByType(this.props.ui)
        const inverseLayout = getInverseLayout(adaptedUi.layout)
        return inverseLayout[this.state.dimensionId]
    }

    getNumberOfDimensionItems = () =>
        (this.props.itemsByDimension[this.state.dimensionId] || []).length

    getFilteredDimensions = () => {
        const dims = Object.values(this.props.dimensions).filter(
            dimension => !dimension.noItems
        )
        return dims.map((dim, index) => this.renderItem(dim, index))
    }

    renderItem = ({ id, name }, index) => {
        const key = `${SOURCE_DIMENSIONS}-${id}`
        const isDragDisabled = !!this.props.usedDimIds(id)
        return (
            <Draggable
                key={key}
                draggableId={id}
                index={index}
                isDragDisabled={isDragDisabled}
            >
                {provided => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <DimensionItem
                            id={id}
                            key={id}
                            name={name}
                            isLocked={this.lockedDimension(id)}
                            isSelected={this.props.selectedIds.includes(id)}
                            isRecommended={this.isRecommendedDimension(id)}
                            isDeactivated={this.disabledDimension(id)}
                            onClick={this.props.onDimensionClick}
                            onOptionsClick={this.onDimensionOptionsClick}
                        />
                    </div>
                )}
            </Draggable>
        )
    }

    render() {
        return (
            <div style={styles.divContainer}>
                <Droppable
                    droppableId={SOURCE_DIMENSIONS}
                    isDropDisabled={true}
                >
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <DimensionsPanel
                                dimensions={this.getFilteredDimensions()}
                            />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <DimensionMenu
                    dimensionId={this.state.dimensionId}
                    currentAxisId={this.getUiAxisId()}
                    visType={this.props.ui.type}
                    numberOfDimensionItems={this.getNumberOfDimensionItems()}
                    dualAxisItemHandler={this.props.dualAxisItemHandler}
                    isAssignedCategoriesInLayout={
                        this.props.adaptedLayoutHasAssignedCategories
                    }
                    assignedCategoriesItemHandler={destination =>
                        this.props.assignedCategoriesItemHandler(
                            this.props.adaptedLayoutHasAssignedCategories,
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
    adaptedLayoutHasAssignedCategories: PropTypes.bool,
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
    usedDimIds: PropTypes.func,
    onDimensionClick: PropTypes.func,
}

const mapStateToProps = state => {
    return {
        ui: fromReducers.fromUi.sGetUi(state),
        usedDimIds: dimensionId =>
            fromReducers.fromUi.sAdaptedLayoutHasDimension(state, dimensionId),
        dimensions: fromReducers.fromDimensions.sGetDimensions(state),
        selectedIds: fromReducers.fromUi.sGetDimensionIdsFromLayout(state),
        recommendedIds: fromReducers.fromRecommendedIds.sGetRecommendedIds(
            state
        ),
        itemsByDimension: fromReducers.fromUi.sGetUiItems(state),
        disallowedDimensions: getDisallowedDimensionsMemo(state),
        lockedDimensions: getLockedDimensionsMemo(state),
        adaptedLayoutHasAssignedCategories: fromReducers.fromUi.sAdaptedLayoutHasAssignedCategories(
            state
        ),
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
