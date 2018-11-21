import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';
import {
    SortableContainer,
    SortableElement,
    arrayMove,
} from 'react-sortable-hoc';

import { Item } from './Item';
import { UnAssignButton, DeselectAllButton } from './buttons';

import { sGetMetadata } from '../../../reducers/metadata';
import { toggler } from '../../../modules/toggler';

import { styles } from './styles/SelectedItems.style';

const Subtitle = () => (
    <div style={styles.subTitleContainer}>
        <span style={styles.subTitleText}>{i18n.t('Selected Data')}</span>
    </div>
);

const SortableItem = SortableElement(({ id, ...props }) => {
    return (
        <li
            id={id}
            className="dimension-item"
            onDoubleClick={() => props.removeSelected(id)}
            style={{ zIndex: 10000 }}
        >
            <Item
                id={id}
                index={props.idx}
                displayName={props.name}
                isHighlighted={props.isHighlighted}
                onItemClick={props.toggleHighlight}
                onRemoveItem={props.removeSelected}
                className="selected"
            />
        </li>
    );
});

const SortableList = SortableContainer(props => {
    return (
        <ul style={props.style}>
            {props.items.map((id, index) => {
                return (
                    <SortableItem
                        id={id}
                        index={index}
                        idx={index}
                        key={`item-${id}`}
                        name={props.metadata[id].name}
                        isHighlighted={props.highlighted.includes(id)}
                        removeSelected={props.removeSelected}
                        toggleHighlight={props.toggleHighlight}
                    />
                );
            })}
        </ul>
    );
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
        this.setState({ highlighted });
        this.props.onDeselect([id]);
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

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.props.onReorder(arrayMove(this.props.items, oldIndex, newIndex));
    };

    renderUl = items => <ul style={styles.list}>{items}</ul>;

    render = () => {
        const listProps = {
            style: styles.list,
            items: this.props.items,
            removeSelected: this.onRemoveSelected,
            toggleHighlight: this.toggleHighlight,
            metadata: this.props.metadata,
            highlighted: this.state.highlighted,
        };

        return (
            <div style={styles.container}>
                <Subtitle />
                <SortableList
                    distance={3}
                    onSortEnd={this.onSortEnd}
                    {...listProps}
                />
                <UnAssignButton
                    className={this.props.className}
                    action={this.onDeselectClick}
                />
                <DeselectAllButton action={this.onDeselectAllClick} />
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
