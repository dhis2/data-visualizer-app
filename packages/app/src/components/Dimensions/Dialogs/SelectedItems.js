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
            {items.map((id, index) => (
                <SortableItem
                    id={id}
                    index={index}
                    idx={index}
                    key={`item-${id}`}
                    name={metadata[id].name}
                    highlighted={highlighted.includes(id)}
                    {...itemProps}
                />
            ))}
        </ul>
    )
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
                highlighted={this.state.highlighted}
            />
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
