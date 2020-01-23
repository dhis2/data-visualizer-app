import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Droppable } from 'react-beautiful-dnd'
import { createSelector } from 'reselect'
import {
    DimensionList,
    getDisallowedDimensions,
    getAllLockedDimensionIds,
} from '@dhis2/analytics'

import DndDimensionItem from './DndDimensionItem'
import * as fromReducers from '../../reducers'
import { acSetUiActiveModalDialog } from '../../actions/ui'
import { SOURCE_DIMENSIONS } from '../../modules/layout'

export class DndDimensionList extends Component {
    isDisabledDimension = dimensionId =>
        this.props.disallowedDimensions.includes(dimensionId)

    isLockedDimension = dimensionId =>
        this.props.lockedDimensions.includes(dimensionId)

    isRecommendedDimension = dimensionId =>
        this.props.recommendedIds.includes(dimensionId)

    renderDimensions = () => {
        console.log('renderDimensions now')
        const dims = Object.values(this.props.dimensions).filter(
            dimension => !dimension.noItems
        )

        return dims.map((dim, index) => {
            const isSelected = this.props.selectedIds.includes(dim.id)
            const isLocked = this.isLockedDimension(dim.id)
            const isDeactivated = this.isDisabledDimension(dim.id)
            const isRecommended = this.isRecommendedDimension(dim.id)
            const name = dim.name
            const id = dim.id

            const itemProps = {
                index,
                isSelected,
                isLocked,
                isDeactivated,
                isRecommended,
                name,
                id,
                onClick: this.props.onDimensionClick,
                onOptionsClick: this.props.onDimensionOptionsClick,
            }

            return (
                <DndDimensionItem
                    key={`${SOURCE_DIMENSIONS}-${dim.id}`}
                    {...itemProps}
                />
            )
        })
    }

    render() {
        return (
            <Droppable droppableId={SOURCE_DIMENSIONS} isDropDisabled={true}>
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <DimensionList dimensions={this.renderDimensions()}>
                            {provided.placeholder}
                        </DimensionList>
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
    onDimensionOptionsClick: PropTypes.func,
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
