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

const CLONE_INDEX = 9999; // a high number to not influence the actual item list

export class SelectedItems extends Component {
    state = { highlighted: [], lastClickedIndex: 0, draggingId: null };

    onDeselectHighlighted = () => {
        this.props.onDeselect(this.state.highlighted);
        this.setState({ highlighted: [] });
    };

    onDeselectOne = id => {
        const highlighted = this.state.highlighted.filter(
            highlightedId => highlightedId !== id
        );

        this.props.onDeselect([id]);
        this.setState({ highlighted });
    };

    onDeselectAll = () => {
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

    reorderList = (destination, source, draggableId) => {
        const list = Array.from(this.props.items.map(item => item.id));

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
                const idx = list.indexOf(indexed.item);
                list.splice(idx, 1);
            });

            indexedItemsToMove.forEach((indexed, i) => {
                list.splice(destinationIndex + i, 0, indexed.item);
            });
        } else {
            list.splice(source.index, 1);
            list.splice(destination.index, 0, draggableId);
        }

        return list;
    };

    onDragEnd = ({ destination, source, draggableId }) => {
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

        const newList = this.reorderList(destination, source, draggableId);

        this.props.onReorder(newList);
    };

    renderListItem = ({ id, name }, index) => (
        <Draggable draggableId={id} index={index} key={id}>
            {(provided, snapshot) => {
                const isDraggedItem =
                    snapshot.isDragging &&
                    this.state.highlighted.length > 1 &&
                    this.state.highlighted.includes(this.state.draggingId);

                const isGhost =
                    this.state.highlighted.includes(id) &&
                    Boolean(this.state.draggingId) &&
                    this.state.draggingId !== id;

                const itemText = isDraggedItem
                    ? `${this.state.highlighted.length} items`
                    : name;

                return (
                    <li
                        className="item-selector-item"
                        id={id}
                        onDoubleClick={() => this.onDeselectOne(id)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <Item
                            id={id}
                            index={index}
                            name={itemText}
                            highlighted={!!this.state.highlighted.includes(id)}
                            onRemoveItem={this.onDeselectOne}
                            onClick={this.toggleHighlight}
                            selected
                            isGhost={isGhost}
                        />
                    </li>
                );
            }}
        </Draggable>
    );

    renderCloneItem = ({ id, name }, index) => {
        const cloneId = `${id}-clone`;
        return (
            <Draggable draggableId={cloneId} index={index} key={cloneId}>
                {provided => (
                    <li
                        className="item-selector-item"
                        id={cloneId}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <Item
                            id={cloneId}
                            index={CLONE_INDEX}
                            name={name}
                            highlighted={!!this.state.highlighted.includes(id)}
                            selected
                            isGhost
                        />
                    </li>
                )}
            </Draggable>
        );
    };

    getItemListWithClone = () => {
        let list = [];

        this.props.items.forEach(item => {
            list.push(item);

            const isDraggedItem =
                this.isMultiDrag(this.state.draggingId) &&
                this.state.draggingId === item.id;

            if (isDraggedItem) {
                list.push({ id: item.id, name: item.name, clone: true });
            }
        });

        return list;
    };

    render = () => {
        const dimensions = this.getItemListWithClone().map((item, i) =>
            item.clone
                ? this.renderCloneItem(item, i)
                : this.renderListItem(item, i)
        );

        return (
            <div style={styles.container}>
                <Subtitle />
                <DragDropContext
                    onDragStart={this.onDragStart}
                    onDragEnd={this.onDragEnd}
                >
                    <Droppable droppableId="selected-items-droppable">
                        {provided => (
                            <ItemsList
                                styles={styles}
                                innerRef={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {dimensions}
                                {provided.placeholder}
                            </ItemsList>
                        )}
                    </Droppable>
                </DragDropContext>
                <UnAssignButton
                    className="item-selector-arrow-back-button"
                    onClick={this.onDeselectHighlighted}
                    iconType={'arrowBack'}
                />
                <DeselectAllButton
                    style={styles.deselectButton}
                    onClick={this.onDeselectAll}
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
