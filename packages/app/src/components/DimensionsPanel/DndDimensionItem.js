import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import { DimensionItem } from '@dhis2/analytics'

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

        const itemProps = {
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
                    <React.Fragment>
                        <DimensionItem
                            innerRef={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            id={id}
                            className={snapshot.isDragging ? 'dragging' : null}
                            onClick={onClick}
                            onOptionsClick={onOptionsClick}
                            {...itemProps}
                        />
                        {snapshot.isDragging && (
                            <DimensionItem
                                id="dimension-item-clone"
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
