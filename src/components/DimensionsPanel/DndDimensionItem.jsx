import {
    DimensionItem,
    DIMENSION_ID_ASSIGNED_CATEGORIES,
} from '@dhis2/analytics'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Draggable } from '../DNDMocks.jsx'
import styles from './styles/DndDimensionItem.module.css'

export class DndDimensionItem extends Component {
    render = () => {
        const {
            id,
            index,
            name,
            isSelected,
            isLocked,
            isDeactivated,
            isRecommended,
            isActive,
            onClick,
            onOptionsClick,
            dataTest,
        } = this.props

        const itemCommonProps = {
            id,
            name,
            isSelected,
            isLocked,
            isDeactivated,
            isRecommended,
            dataTest,
        }

        return (
            <Draggable
                draggableId={id}
                index={index}
                isDragDisabled={isSelected || isDeactivated || isLocked}
            >
                {(provided, snapshot = {}) => {
                    console.log(provided, snapshot)
                    return (
                        <>
                            <DimensionItem
                                innerRef={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={cx({
                                    [styles.dragging]: snapshot.isDragging,
                                    [styles.notDragging]: !snapshot.isDragging,
                                    [styles.active]: isActive,
                                    [styles.assignedCategories]:
                                        id === DIMENSION_ID_ASSIGNED_CATEGORIES,
                                })}
                                onClick={onClick}
                                onOptionsClick={onOptionsClick}
                                {...itemCommonProps}
                            />
                            {snapshot.isDragging && (
                                <DimensionItem {...itemCommonProps} />
                            )}
                        </>
                    )
                }}
            </Draggable>
        )
    }
}

DndDimensionItem.propTypes = {
    dataTest: PropTypes.string,
    id: PropTypes.string,
    index: PropTypes.number,
    isActive: PropTypes.bool,
    isDeactivated: PropTypes.bool,
    isLocked: PropTypes.bool,
    isRecommended: PropTypes.bool,
    isSelected: PropTypes.bool,
    name: PropTypes.string,
    onClick: PropTypes.func,
    onOptionsClick: PropTypes.func,
}

export default DndDimensionItem
