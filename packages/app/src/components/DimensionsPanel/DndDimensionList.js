import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Droppable } from 'react-beautiful-dnd'
import { createSelector } from 'reselect'
import {
    getDisallowedDimensions,
    getAllLockedDimensionIds,
} from '@dhis2/analytics'

import DndDimensionItem from './DndDimensionItem'
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
    filterTextContains = dimensionName => {
        return dimensionName
            .toLowerCase()
            .includes(this.props.filterText.toLowerCase())
    }

    filterMatchingDimensions = (dimension, index) => {
        return this.filterTextContains(dimension.name, index)
            ? this.renderItem(dimension, index)
            : null
    }

    isSelected = id => this.props.selectedIds.includes(id)
    isDisabledDimension = id => this.props.disallowedDimensions.includes(id)
    isLockedDimension = id => this.props.lockedDimensions.includes(id)
    isRecommendedDimension = id => this.props.recommendedIds.includes(id)

    renderItem = ({ id, name }, index) => {
        const itemProps = {
            id,
            name,
            index,
            isSelected: this.isSelected(id),
            isLocked: this.isLockedDimension(id),
            isDeactivated: this.isDisabledDimension(id),
            isRecommended: this.isRecommendedDimension(id),
            onClick: this.props.onDimensionClick,
            onOptionsClick: this.props.onDimensionOptionsClick,
        }

        return (
            <DndDimensionItem
                key={`${SOURCE_DIMENSIONS}-${id}`}
                {...itemProps}
            />
        )
    }

    render() {
        const dimensionsList = this.props.dimensions.map((dimension, index) =>
            this.props.filterText.length
                ? this.filterMatchingDimensions(dimension, index)
                : this.renderItem(dimension, index)
        )

        return (
            <Droppable droppableId={SOURCE_DIMENSIONS} isDropDisabled={true}>
                {provided => (
                    <div
                        style={styles.listWrapper}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <ul style={styles.list}>{dimensionsList}</ul>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }
}

DndDimensionList.propTypes = {
    dimensions: PropTypes.array,
    disallowedDimensions: PropTypes.array,
    filterText: PropTypes.string,
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
    const dimensions = Object.values(
        fromReducers.fromDimensions.sGetDimensions(state)
    ).filter(dimension => !dimension.noItems)

    return {
        dimensions,
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
