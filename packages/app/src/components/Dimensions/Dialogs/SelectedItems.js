import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    // background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle,
});
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

    onDragEnd = result => {
        if (!result.destination) {
            return;
        }

        this.props.onReorder(result.source.index, result.destination.index);
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

    renderListItem = (id, index) => {
        return (
            <Draggable key={id} draggableId={id} index={index}>
                {(provided, snapshot) => (
                    <li
                        className="dimension-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        id={id}
                        key={id}
                        onDoubleClick={() => this.onRemoveSelected(id)}
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )}
                    >
                        <Item
                            id={id}
                            index={index}
                            name={this.props.metadata[id].name}
                            highlighted={!!this.state.highlighted.includes(id)}
                            onItemClick={this.toggleHighlight}
                            onRemoveItem={this.onRemoveSelected}
                            selected
                        />
                    </li>
                )}
            </Draggable>
        );
    };

    render = () => {
        const dataDimensions = this.props.items.map((id, index) =>
            this.renderListItem(id, index)
        );

        return (
            <div style={styles.container}>
                <Subtitle />
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {provided => (
                            <ul ref={provided.innerRef} style={styles.list}>
                                {dataDimensions}
                            </ul>
                        )}
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
