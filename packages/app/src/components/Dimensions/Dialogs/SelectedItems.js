import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';
import {
    SortableContainer,
    SortableElement,
    arrayMove,
} from 'react-sortable-hoc';

import Item from './Item';
import { SelectButton as DeselectAllButton } from './buttons/SelectButton';

import { sGetMetadata } from '../../../reducers/metadata';
import { toggler } from '../../../modules/toggler';

import { styles } from './styles/SelectedItems.style';

const Subtitle = () => (
    <div style={styles.subTitleContainer}>
        <span style={styles.subTitleText}>{i18n.t('Selected Data')}</span>
    </div>
);

const SortableItem = SortableElement(({ id, idx, ...props }) => (
    <li
        id={id}
        className="dimension-item selected"
        onDoubleClick={() => props.onRemoveItem(id)}
    >
        <Item id={id} index={idx} {...props} selected />
    </li>
));

const SortableList = SortableContainer(
    ({ metadata, highlighted, items, ...itemProps }) => (
        <ul style={styles.list}>
            {items.map((id, index) =>
                metadata[id] ? (
                    <SortableItem
                        id={id}
                        index={index}
                        idx={index}
                        key={`item-${id}`}
                        name={metadata[id].name}
                        highlighted={highlighted.includes(id)}
                        {...itemProps}
                    />
                ) : null
            )}
        </ul>
    )
);
export class SelectedItems extends Component {
    state = { lastClickedIndex: 0 };

    onDeselectClick = () => this.props.onDeselect(this.props.highlighted);

    onRemoveSelected = id => this.props.onDeselect([id]);

    onDeselectAllClick = () => this.props.onDeselect(this.props.items);

    toggleHighlight = (isCtrlPressed, isShiftPressed, index, id) => {
        const newState = toggler(
            id,
            isCtrlPressed,
            isShiftPressed,
            index,
            this.state.lastClickedIndex,
            this.props.highlighted,
            this.props.items
        );

        this.props.onHighlightItem('highlightedSelectedIds', newState.ids);
        this.setState({
            lastClickedIndex: newState.lastClickedIndex,
        });
    };

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.props.onReorder(arrayMove(this.props.items, oldIndex, newIndex));
    };

    render = () => (
        <div style={styles.container}>
            <Subtitle />
            <SortableList
                distance={3}
                transitionDuration={200}
                onSortEnd={this.onSortEnd}
                items={this.props.items}
                onRemoveItem={this.onRemoveSelected}
                onItemClick={this.toggleHighlight}
                metadata={this.props.metadata}
                highlighted={this.props.highlighted}
            />
            <DeselectAllButton
                style={styles.deselectButton}
                onClick={this.onDeselectAllClick}
                label={i18n.t('Deselect All')}
            />
        </div>
    );
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
