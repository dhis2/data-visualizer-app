import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';
import {
    UnAssignButton,
    DeselectAllButton,
    RemoveSelectedItemButton,
} from './buttons';

import { sGetMetadata } from '../../../reducers/metadata';

import { styles } from './styles/SelectedItems.style';

const SelectedIcon = () => {
    return (
        <div style={styles.iconContainer}>
            <div style={styles.icon} />
        </div>
    );
};

const Subtitle = () => {
    return (
        <div style={styles.subTitleContainer}>
            <span style={styles.subTitleText}>{i18n.t('Selected Data')}</span>
        </div>
    );
};

export class SelectedItems extends Component {
    state = { highlighted: [] };

    onDeselectClick = () => {
        this.props.onDeselect(this.state.highlighted);
        this.setState({ highlighted: [] });
    };

    onRemoveSelected = id => {
        this.setState({ highlighted: this.removeHighlight(id) });
        this.props.onDeselect([id]);
    };

    onDeselectAllClick = () => {
        this.props.onDeselect(this.props.items);
        this.setState({ highlighted: [] });
    };

    removeHighlight = id => {
        return this.state.highlighted.filter(
            dataDimId => dataDimId !== id && dataDimId
        );
    };

    toggleHighlight = id => {
        const higlightedItems = this.state.highlighted.includes(id)
            ? this.removeHighlight(id)
            : [...this.state.highlighted, id];

        this.setState({ highlighted: higlightedItems });
    };

    renderItem = id => {
        const itemStyle = this.state.highlighted.includes(id)
            ? { ...styles.unHighlighted, ...styles.highlighted }
            : styles.unHighlightesds;

        return (
            <li
                className="dimension-item"
                id={id}
                key={id}
                style={styles.listItems}
                onDoubleClick={() => this.onRemoveSelected(id)}
            >
                <div style={itemStyle}>
                    <SelectedIcon />
                    <span
                        style={styles.text}
                        onClick={() => this.toggleHighlight(id)}
                    >
                        {this.props.metadata[id].name}
                    </span>
                    <RemoveSelectedItemButton
                        style={styles.removeButton}
                        action={() => this.onRemoveSelected(id)}
                    />
                </div>
            </li>
        );
    };

    render = () => {
        const dataDimensions = this.props.items.map(id => this.renderItem(id));

        return (
            <div style={styles.container}>
                <Subtitle />
                <ul style={styles.list}>{dataDimensions}</ul>
                <UnAssignButton action={this.onDeselectClick} />
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
