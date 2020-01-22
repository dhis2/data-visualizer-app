import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { createSelector } from 'reselect'
import {
    DimensionItem,
    getDisallowedDimensions,
    getAllLockedDimensionIds,
} from '@dhis2/analytics'

import * as fromReducers from '../../reducers'
import { acSetUiActiveModalDialog } from '../../actions/ui'
import { SOURCE_DIMENSIONS } from '../../modules/layout'

const styles = {
    listWrapper: {
        position: 'relative',
        flex: '1 1 0%',
        minHeight: '30vh',
    },
    list: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        marginTop: '0px',
        padding: 0,
    },
}

export class DndDimensionList extends Component {
    // filterTextContains = dimensionName => {
    //     return dimensionName
    //         .toLowerCase()
    //         .includes(this.props.filterText.toLowerCase())
    // }

    // filterMatchingDimensions = dimension => {
    //     return this.filterTextContains(dimension.props.name) ? dimension : null
    // }

    isDisabledDimension = dimensionId =>
        this.props.disallowedDimensions.includes(dimensionId)

    isLockedDimension = dimensionId =>
        this.props.lockedDimensions.includes(dimensionId)

    isRecommendedDimension = dimensionId =>
        this.props.recommendedIds.includes(dimensionId)

    getFilteredDimensions = () => {
        const dims = Object.values(this.props.dimensions).filter(
            dimension => !dimension.noItems
        )

        return dims.map((dim, index) => this.renderItem(dim, index))
    }

    renderItem = ({ id, name }, index) => {
        const isSelected = this.props.selectedIds.includes(id)
        const isLocked = this.isLockedDimension(id)
        const isDeactivated = this.isDisabledDimension(id)
        const isRecommended = this.isRecommendedDimension(id)

        const itemProps = {
            name,
            isSelected,
            isLocked,
            isDeactivated,
            isRecommended,
        }

        return (
            <Draggable
                key={`${SOURCE_DIMENSIONS}-${id}`}
                draggableId={id}
                index={index}
                isDragDisabled={isSelected || isDeactivated || isLocked}
            >
                {(provided, snapshot) => (
                    <React.Fragment>
                        <DimensionItem
                            innerRef={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={snapshot.isDragging ? 'dragging' : null}
                            id={id}
                            key={id}
                            onClick={this.props.onDimensionClick}
                            onOptionsClick={this.onDimensionOptionsClick}
                            {...itemProps}
                        />
                        {snapshot.isDragging && (
                            <DimensionItem
                                id="dimension-item-clone"
                                key="dimension-item-clone"
                                className="dimension-item-clone"
                                {...itemProps}
                            />
                        )}
                    </React.Fragment>
                )}
            </Draggable>
        )
    }

    render() {
        return (
            <Droppable droppableId={SOURCE_DIMENSIONS} isDropDisabled={true}>
                {provided => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={styles.listWrapper}
                    >
                        <ul style={styles.list}>
                            {this.getFilteredDimensions()}
                            {provided.placeholder}
                        </ul>
                    </div>
                )}
            </Droppable>
        )
    }
}

DndDimensionList.propTypes = {
    dimensions: PropTypes.object,
    disallowedDimensions: PropTypes.array,
    lockedDimensions: PropTypes.array,
    recommendedIds: PropTypes.array,
    selectedIds: PropTypes.array,
    onDimensionClick: PropTypes.func,
}

const getDisallowedDimensionsMemo = createSelector(
    [fromReducers.fromUi.sGetUiType],
    type => getDisallowedDimensions(type)
)

const getisLockedDimensionsMemo = createSelector(
    [fromReducers.fromUi.sGetUiType],
    type => getAllLockedDimensionIds(type)
)

const mapStateToProps = state => {
    return {
        dimensions: fromReducers.fromDimensions.sGetDimensions(state),
        selectedIds: fromReducers.fromUi.sGetDimensionIdsFromLayout(state),
        recommendedIds: fromReducers.fromRecommendedIds.sGetRecommendedIds(
            state
        ),
        disallowedDimensions: getDisallowedDimensionsMemo(state),
        lockedDimensions: getisLockedDimensionsMemo(state),
    }
}

const mapDispatchToProps = dispatch => ({
    onDimensionClick: id => dispatch(acSetUiActiveModalDialog(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DndDimensionList)
