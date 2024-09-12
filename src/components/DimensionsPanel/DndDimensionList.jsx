import {
    getDisallowedDimensions,
    getAllLockedDimensionIds,
    getFixedDimensions,
    getDynamicDimensions,
    getPredefinedDimensions,
    VIS_TYPE_OUTLIER_TABLE,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { SOURCE_DIMENSIONS } from '../../modules/layout.js'
import * as fromReducers from '../../reducers/index.js'
import { default as DndDimensionItem } from './DndDimensionItem.jsx'
import styles from './styles/DndDimensionList.module.css'

export class DndDimensionList extends Component {
    dndIndex = 0

    nameContainsFilterText = (dimension) =>
        dimension.name
            .toLowerCase()
            .includes(this.props.filterText.toLowerCase())

    getFilteredDimensions = (filter) =>
        this.props.dimensions.filter(filter).filter(this.nameContainsFilterText)

    isSelected = (id) => this.props.selectedIds.includes(id)
    isDisabledDimension = (id) =>
        // all dimensions in YOUR DIMENSIONS section need to be disabled for Outlier table
        this.props.visType === VIS_TYPE_OUTLIER_TABLE
            ? this.props.disallowedDimensions
                  .concat(this.yourDimensions.map((d) => d.id))
                  .includes(id)
            : this.props.disallowedDimensions.includes(id)
    isLockedDimension = (id) => this.props.lockedDimensions.includes(id)
    isRecommendedDimension = (id) => this.props.recommendedIds.includes(id)

    renderItem = ({ id, name }) => {
        const itemProps = {
            id,
            name,
            index: this.dndIndex++,
            isSelected: this.isSelected(id),
            isLocked: this.isLockedDimension(id),
            isDeactivated: this.isDisabledDimension(id),
            isRecommended: this.isRecommendedDimension(id),
            onClick: this.props.onDimensionClick,
            onOptionsClick: this.props.onDimensionOptionsClick,
            dataTest: `${this.props.dataTest}-dimension-item`,
        }

        return (
            <DndDimensionItem
                key={`${SOURCE_DIMENSIONS}-${id}`}
                {...itemProps}
            />
        )
    }

    getDimensionItemsFromList = (dimensionList) =>
        dimensionList.map(this.renderItem)

    render() {
        this.dndIndex = 0
        this.mainDimensions = this.getFilteredDimensions((dimension) =>
            Object.values(getFixedDimensions()).some(
                (fixedDim) => fixedDim.id === dimension.id
            )
        )
        this.otherDimensions = this.getFilteredDimensions((dimension) =>
            Object.values(getDynamicDimensions()).some(
                (dynDim) => dynDim.id === dimension.id
            )
        )
        this.yourDimensions = this.getFilteredDimensions(
            (dimension) =>
                !Object.values(getPredefinedDimensions()).some(
                    (predefDim) => predefDim.id === dimension.id
                )
        )

        return (
            <Droppable droppableId={SOURCE_DIMENSIONS} isDropDisabled={true}>
                {(provided) => (
                    <div
                        className={styles.container}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        data-test={this.props.dataTest}
                    >
                        <div className={styles.wrapper}>
                            <div className={styles.section}>
                                <h3 className={styles.header}>
                                    {i18n.t('Main dimensions')}
                                </h3>
                                <ul
                                    className={styles.list}
                                    data-test={`${this.props.dataTest}-fixed-dimensions`}
                                >
                                    {this.getDimensionItemsFromList(
                                        this.mainDimensions
                                    )}
                                </ul>
                            </div>
                            <div className={styles.section}>
                                <h3 className={styles.header}>
                                    {i18n.t('Other dimensions')}
                                </h3>
                                <ul
                                    className={styles.list}
                                    data-test={`${this.props.dataTest}-dynamic-dimensions`}
                                >
                                    {this.getDimensionItemsFromList(
                                        this.otherDimensions
                                    )}
                                </ul>
                            </div>
                            <div className={styles.section}>
                                <h3 className={styles.header}>
                                    {i18n.t('Your dimensions')}
                                </h3>
                                <ul
                                    className={styles.list}
                                    data-test={`${this.props.dataTest}-non-predefined-dimensions`}
                                >
                                    {this.getDimensionItemsFromList(
                                        this.yourDimensions
                                    )}
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
    dataTest: PropTypes.string,
    dimensions: PropTypes.array,
    disallowedDimensions: PropTypes.array,
    filterText: PropTypes.string,
    lockedDimensions: PropTypes.array,
    recommendedIds: PropTypes.array,
    selectedIds: PropTypes.array,
    visType: PropTypes.string,
    onDimensionClick: PropTypes.func,
    onDimensionOptionsClick: PropTypes.func,
}

const getDisallowedDimensionsMemo = createSelector(
    [fromReducers.fromUi.sGetUiType],
    (type) => getDisallowedDimensions(type)
)

const getisLockedDimensionsMemo = createSelector(
    [fromReducers.fromUi.sGetUiType],
    (type) => getAllLockedDimensionIds(type)
)

const mapStateToProps = (state) => ({
    dimensions: Object.values(
        fromReducers.fromDimensions.sGetDimensions(state)
    ),
    selectedIds: fromReducers.fromUi.sGetDimensionIdsFromLayout(state),
    recommendedIds: fromReducers.fromRecommendedIds.sGetRecommendedIds(state),
    disallowedDimensions: getDisallowedDimensionsMemo(state),
    lockedDimensions: getisLockedDimensionsMemo(state),
    visType: fromReducers.fromUi.sGetUiType(state),
})

export default connect(mapStateToProps)(DndDimensionList)
