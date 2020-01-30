import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Droppable } from 'react-beautiful-dnd'
import { createSelector } from 'reselect'
import {
    getDisallowedDimensions,
    getAllLockedDimensionIds,
    getFixedDimensions,
    getDynamicDimensions,
    getPredefinedDimensions,
} from '@dhis2/analytics'

import DndDimensionItem from './DndDimensionItem'
import * as fromReducers from '../../reducers'
import { acSetUiActiveModalDialog } from '../../actions/ui'
import { SOURCE_DIMENSIONS } from '../../modules/layout'

import styles from './styles/DndDimensionList.module.css'

export class DndDimensionList extends Component {
    nameContainsFilterText = dimension =>
        dimension.name
            .toLowerCase()
            .includes(this.props.filterText.toLowerCase())

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
        const fixedDimensions = Object.values(getFixedDimensions())
            .filter(this.nameContainsFilterText)
            .map(this.renderItem)
        const dynamicDimensions = Object.values(getDynamicDimensions())
            .filter(this.nameContainsFilterText)
            .map(this.renderItem)
        const nonPredefinedDimensions = this.props.dimensions
            .filter(
                dimension =>
                    !Object.values(getPredefinedDimensions()).some(
                        predefDim => predefDim.id === dimension.id
                    )
            )
            .filter(this.nameContainsFilterText)
            .map(this.renderItem)

        return (
            <Droppable droppableId={SOURCE_DIMENSIONS} isDropDisabled={true}>
                {provided => (
                    <div
                        className={styles.container}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <div className={styles.wrapper}>
                            <div className={styles.section}>
                                <h3 className={styles.header}>
                                    Main dimensions
                                </h3>
                                <ul className={styles.list}>
                                    {fixedDimensions}
                                </ul>
                            </div>
                            <div className={styles.section}>
                                <h3 className={styles.header}>
                                    Dynamic dimensions
                                </h3>
                                <ul className={styles.list}>
                                    {dynamicDimensions}
                                </ul>
                            </div>
                            <div className={styles.section}>
                                <h3 className={styles.header}>
                                    Your dimensions
                                </h3>
                                <ul className={styles.list}>
                                    {nonPredefinedDimensions}
                                </ul>
                            </div>
                        </div>
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

const mapStateToProps = state => ({
    dimensions: Object.values(
        fromReducers.fromDimensions.sGetDimensions(state)
    ),
    selectedIds: fromReducers.fromUi.sGetDimensionIdsFromLayout(state),
    recommendedIds: fromReducers.fromRecommendedIds.sGetRecommendedIds(state),
    disallowedDimensions: getDisallowedDimensionsMemo(state),
    lockedDimensions: getisLockedDimensionsMemo(state),
})

const mapDispatchToProps = dispatch => ({
    onDimensionClick: id => dispatch(acSetUiActiveModalDialog(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DndDimensionList)
