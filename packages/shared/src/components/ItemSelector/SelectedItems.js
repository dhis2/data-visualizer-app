import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import sortBy from 'lodash-es/sortBy';

import Item from './Item';
import { ArrowButton as UnAssignButton } from './buttons/ArrowButton';
import { SelectButton as DeselectAllButton } from './buttons/SelectButton';

import { toggler } from './modules/toggler';

import { styles } from './styles/SelectedItems.style';

const Subtitle = () => (
    <div style={styles.subTitleContainer}>
        <span style={styles.subTitleText}>{i18n.t('Selected Data')}</span>
    </div>
);

const ItemsList = ({ styles, innerRef, children }) => (
    <ul style={styles.list} ref={innerRef}>
        {children}
    </ul>
);

export class SelectedItems extends Component {
    state = { highlighted: [], lastClickedIndex: 0, draggingId: null };

    onDeselectClick = () => {
        this.props.onDeselect(this.state.highlighted);
        this.setState({ highlighted: [] });
    };

    onRemoveSelected = id => {
        const highlighted = this.state.highlighted.filter(
            dataDimId => dataDimId !== id
        );

        this.props.onDeselect([id]);
        this.setState({ highlighted });
    };

    onDeselectAllClick = () => {
        this.props.onDeselect(this.props.items.map(item => item.id));
        this.setState({ highlighted: [] });
    };

    toggleHighlight = (isCtrlPressed, isShiftPressed, index, id) => {
        const newState = toggler(
            id,
            isCtrlPressed,
            isShiftPressed,
            index,
            this.state.lastClickedIndex,
            this.state.highlighted,
            this.props.items.map(item => item.id)
        );

        this.setState({
            highlighted: newState.ids,
            lastClickedIndex: newState.lastClickedIndex,
        });
    };

    isMultiDrag = draggableId => {
        return (
            this.state.highlighted.includes(draggableId) &&
            this.state.highlighted.length > 1
        );
    };

    onDragStart = start => {
        const id = start.draggableId;
        const selected = this.state.highlighted.find(itemId => itemId === id);

        // if dragging an item that is not highlighted, unhighlight all items
        if (!selected) {
            this.setState({ highlighted: [] });
        }

        this.setState({ draggingId: start.draggableId });
    };

    onDragEnd = result => {
        const { destination, source, draggableId } = result;

        this.setState({ draggingId: null });

        if (destination === null) {
            return;
        }

        if (
            destination.draggableId === source.draggableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newList = Array.from(this.props.items.map(item => item.id));

        if (this.isMultiDrag(draggableId)) {
            const indexedItemsToMove = sortBy(
                this.state.highlighted.map(item => {
                    return {
                        item,
                        idx: this.props.items
                            .map(item => item.id)
                            .indexOf(item),
                    };
                }),
                'idx'
            );

            let destinationIndex = destination.index;

            if (
                destinationIndex < this.props.items.length - 1 &&
                destinationIndex > 1
            ) {
                indexedItemsToMove.forEach(indexed => {
                    if (indexed.idx < destinationIndex) {
                        --destinationIndex;
                    }
                });
            }

            indexedItemsToMove.forEach(indexed => {
                const idx = newList.indexOf(indexed.item);
                newList.splice(idx, 1);
            });

            indexedItemsToMove.forEach((indexed, i) => {
                newList.splice(destinationIndex + i, 0, indexed.item);
            });
        } else {
            newList.splice(source.index, 1);
            newList.splice(destination.index, 0, draggableId);
        }

        this.props.onReorder(newList);
    };

    renderListItem = ({ id, name, clone }, index) => {
        if (!clone) {
            return (
                <Draggable draggableId={id} index={index} key={id}>
                    {(provided, snapshot) => {
                        const isItemBeingDragged =
                            snapshot.isDragging &&
                            this.state.highlighted.length > 1 &&
                            this.state.highlighted.includes(
                                this.state.draggingId
                            );

                        const isGhosting =
                            isItemBeingDragged &&
                            this.state.highlighted.includes(id) &&
                            this.state.draggingId !== id;

                        const itemText = isItemBeingDragged
                            ? `${this.state.highlighted.length} items`
                            : name;

                        return (
                            <li
                                className="item-selector-item"
                                id={id}
                                onDoubleClick={() => this.onRemoveSelected(id)}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                            >
                                <Item
                                    id={id}
                                    index={index}
                                    name={itemText}
                                    highlighted={
                                        !!this.state.highlighted.includes(id)
                                    }
                                    onItemClick={this.toggleHighlight}
                                    onRemoveItem={this.onRemoveSelected}
                                    selected
                                    classNames={isGhosting ? 'ghost' : ''}
                                />
                            </li>
                        );
                    }}
                </Draggable>
            );
        } else {
            const cloneId = `${id}-clone`;
            return (
                <Draggable draggableId={cloneId} index={index} key={cloneId}>
                    {provided => {
                        return (
                            <li
                                className="item-selector-item"
                                id={cloneId}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                            >
                                <Item
                                    id={cloneId}
                                    index={9999}
                                    name={name}
                                    highlighted={
                                        !!this.state.highlighted.includes(id)
                                    }
                                    selected
                                    classNames="ghost"
                                />
                            </li>
                        );
                    }}
                </Draggable>
            );
        }
    };

    getItemList = () => {
        let list = [];

        this.props.items.forEach(item => {
            list.push(item);

            const itemIsBeingDragged =
                this.isMultiDrag(this.state.draggingId) &&
                this.state.draggingId === item.id;

            if (itemIsBeingDragged) {
                list.push({ id: item.id, name: item.name, clone: true });
            }
        });

        return list;
    };

    render = () => {
        const dataDimensions = this.getItemList().map((itemObj, index) =>
            this.renderListItem(itemObj, index)
        );

        return (
            <div style={styles.container}>
                <Subtitle />
                <DragDropContext
                    onDragStart={this.onDragStart}
                    onDragEnd={this.onDragEnd}
                >
                    <Droppable droppableId="selected-items-droppable">
                        {provided => {
                            return (
                                <ItemsList
                                    styles={styles}
                                    innerRef={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {dataDimensions}
                                    {provided.placeholder}
                                </ItemsList>
                            );
                        }}
                    </Droppable>
                </DragDropContext>
                <UnAssignButton
                    className="item-selector-arrow-back-button"
                    onClick={this.onDeselectClick}
                    iconType={'arrowBack'}
                />
                <DeselectAllButton
                    style={styles.deselectButton}
                    onClick={this.onDeselectAllClick}
                    label={i18n.t('Deselect All')}
                />
            </div>
        );
    };
}

SelectedItems.propTypes = {
    items: PropTypes.array.isRequired,
    onDeselect: PropTypes.func.isRequired,
    onReorder: PropTypes.func.isRequired,
};

export default SelectedItems;
