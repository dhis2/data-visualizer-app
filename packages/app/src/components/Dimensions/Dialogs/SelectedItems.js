import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

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

    renderListItem = (id, index) => (
        <li
            className="dimension-item"
            id={id}
            key={id}
            onDoubleClick={() => this.onRemoveSelected(id)}
        >
            <Item
                id={id}
                index={index}
                displayName={this.props.metadata[id].name}
                isHighlighted={!!this.state.highlighted.includes(id)}
                onItemClick={this.toggleHighlight}
                onRemoveItem={this.onRemoveSelected}
                className="selected"
            />
        </li>
    );

    renderUl = items => <ul style={styles.list}>{items}</ul>;

    render = () => {
        const dataDimensions = this.props.items.map((id, index) =>
            SortableElement(this.renderListItem(id, index))
        );

        return (
            <div style={styles.container}>
                <Subtitle />
                {/* <ul style={styles.list}>{dataDimensions}</ul> */}
                {SortableContainer(this.renderUl(dataDimensions))}
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
};

const mapStateToProps = state => ({
    metadata: sGetMetadata(state),
});

export default connect(mapStateToProps)(SelectedItems);
