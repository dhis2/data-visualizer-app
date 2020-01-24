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

    filterMatchingDimensions = dimension => {
        return this.filterTextContains(dimension.name)
            ? this.renderItem(dimension)
            : null
    }
    isDisabledDimension = id => this.props.disallowedDimensions.includes(id)

    isLockedDimension = id => this.props.lockedDimensions.includes(id)

    isRecommendedDimension = id => this.props.recommendedIds.includes(id)

    renderDimensions = () => {
        const dimensionsWithItems = Object.values(this.props.dimensions).filter(
            dimension => !dimension.noItems
        )

        return dimensionsWithItems.map(({ id, name }, index) => {
            const isSelected = this.props.selectedIds.includes(id)
            const isLocked = this.isLockedDimension(id)
            const isDeactivated = this.isDisabledDimension(id)
            const isRecommended = this.isRecommendedDimension(id)

            const itemProps = {
                id,
                name,
                index,
                isSelected,
                isLocked,
                isDeactivated,
                isRecommended,
                onClick: this.props.onDimensionClick,
                onOptionsClick: this.props.onDimensionOptionsClick,
            }

            return (
                <DndDimensionItem
                    key={`${SOURCE_DIMENSIONS}-${id}`}
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
                        <div style={styles.listWrapper}>
                            <ul style={styles.list}>
                                {this.renderDimensions()}
                            </ul>
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }
}

DndDimensionList.propTypes = {
    dimensions: PropTypes.object,
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
