import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import sortBy from 'lodash-es/sortBy';

import Item from './Item';
import { ArrowButton as UnAssignButton } from './buttons/ArrowButton';
import { SelectButton as DeselectAllButton } from './buttons/SelectButton';

import { sGetMetadata } from '../../../reducers/metadata';
import { toggler } from '../../../modules/toggler';

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
    state = { highlighted: [], lastClickedIndex: 0 };

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
        this.props.onDeselect(this.props.items);
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
            this.props.items
        );

        this.setState({
            highlighted: newState.ids,
            lastClickedIndex: newState.lastClickedIndex,
        });
    };

    renderListItem = (id, index, itemBeingDragged) => {
        return (
            <Draggable draggableId={id} index={index} key={id}>
                {(provided, snapshot) => {
                    const showCount =
                        snapshot.isDragging &&
                        this.state.highlighted.length > 1 &&
                        this.state.highlighted.includes(itemBeingDragged);

                    return (
                        <li
                            className="dimension-item"
                            id={id}
                            onDoubleClick={() => this.onRemoveSelected(id)}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <Item
                                id={id}
                                index={index}
                                displayName={this.props.metadata[id].name}
                                name={this.props.metadata[id].name}
                                highlighted={
                                    !!this.state.highlighted.includes(id)
                                }
                                onItemClick={this.toggleHighlight}
                                onRemoveItem={this.onRemoveSelected}
                                className="selected"
                                selected
                            />
                            {showCount ? (
                                <span>{this.state.highlighted.length}</span>
                            ) : null}
                        </li>
                    );
                }}
            </Draggable>
        );
    };

    onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if (destination === null) {
            return;
        }

        if (
            destination.draggableId === source.draggableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newList = Array.from(this.props.items);

        if (
            this.state.highlighted.includes(draggableId) &&
            this.state.highlighted.length > 1
        ) {
            const indexedItemsToMove = sortBy(
                this.state.highlighted.map(item => {
                    return { item, idx: this.props.items.indexOf(item) };
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

    render = () => {
        return (
            <div style={styles.container}>
                <Subtitle />
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="selectedi-items-droppable">
                        {(provided, snapshot) => {
                            const dataDimensions = this.props.items.map(
                                (id, index) =>
                                    this.renderListItem(
                                        id,
                                        index,
                                        snapshot.draggingOverWith
                                    )
                            );

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
                    className={`${this.props.className}-arrow-back-button`}
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

const mapStateToProps = state => ({
    metadata: sGetMetadata(state),
});

export default connect(mapStateToProps)(SelectedItems);
