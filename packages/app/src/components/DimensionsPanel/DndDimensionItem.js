import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import { DimensionItem } from '@dhis2/analytics'

export class DndDimensionItem extends Component {
    render = () => {
        const {
            id,
            name,
            index,
            isSelected,
            isLocked,
            isDeactivated,
            isRecommended,
            onClick,
            onOptionsClick,
            key,
        } = this.props
        const itemProps = {
            name,
            isSelected,
            isLocked,
            isDeactivated,
            isRecommended,
        }

        return (
            <Draggable
                key={key}
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
                            onClick={onClick}
                            onOptionsClick={onOptionsClick}
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
}

export default DndDimensionItem
