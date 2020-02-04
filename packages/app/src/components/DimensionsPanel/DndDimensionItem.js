import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import { DimensionItem } from '@dhis2/analytics'

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
            onClick,
            onOptionsClick,
        } = this.props

        const itemCommonProps = {
            id,
            name,
            isSelected,
            isLocked,
            isDeactivated,
            isRecommended,
        }

        return (
            <Draggable
                draggableId={id}
                index={index}
                isDragDisabled={isSelected || isDeactivated || isLocked}
            >
                {(provided, snapshot) => (
                    <>
                        <DimensionItem
                            innerRef={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={
                                snapshot.isDragging
                                    ? styles.dragging
                                    : styles.notDragging
                            }
                            onClick={onClick}
                            onOptionsClick={onOptionsClick}
                            {...itemCommonProps}
                        />
                        {snapshot.isDragging && (
                            <DimensionItem
                                className={styles.dimensionItemClone}
                                {...itemCommonProps}
                            />
                        )}
                    </>
                )}
            </Draggable>
        )
    }
}

DndDimensionItem.propTypes = {
    id: PropTypes.string,
    index: PropTypes.number,
    isDeactivated: PropTypes.bool,
    isLocked: PropTypes.bool,
    isRecommended: PropTypes.bool,
    isSelected: PropTypes.bool,
    name: PropTypes.string,
    onClick: PropTypes.func,
    onOptionsClick: PropTypes.func,
}

export default DndDimensionItem
