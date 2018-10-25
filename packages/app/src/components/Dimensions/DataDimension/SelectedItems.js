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
import { colors } from '../../../colors';

const style = {
    container: {
        border: `1px solid ${colors.greyLight}`,
        height: 534,
        minWidth: 278,
    },
    subTitleContainer: {
        borderBottom: `1px solid ${colors.greyLight}`,
        height: 42,
    },
    list: {
        listStyle: 'none',
        overflow: 'scroll',
        height: 455,
        paddingLeft: 0,
        margin: 0,
        userSelect: 'none',
    },
    subTitleText: {
        position: 'relative',
        color: colors.black,
        fontFamily: 'Roboto',
        height: 20,
        fontSize: 15,
        fontWeight: 500,
        top: 12,
        left: 8,
    },
    listItem: {
        display: 'flex',
        margin: 5,
        minHeight: 24,
    },
    highlighted: {
        backgroundColor: '#92C9F7',
    },
    unHighlighted: {
        borderRadius: 4,
        backgroundColor: '#BBDEFB',
        display: 'flex',
        padding: 2,
    },
    iconContainer: {
        width: 20,
    },
    icon: {
        backgroundColor: '#1976D2', // color
        position: 'relative',
        left: '44%',
        top: '44%',
        height: 6,
        width: 6,
    },
    text: {
        fontFamily: 'Roboto',
        wordBreak: 'break-word',
        fontSize: 14,
        paddingLeft: 3,
        paddingTop: 3,
    },
};

const SELECTED_DATA_TITLE = i18n.t('Selected Data');

const SelectedIcon = () => {
    return (
        <div style={style.iconContainer}>
            <div style={style.icon} />
        </div>
    );
};

const Subtitle = () => {
    return (
        <div style={style.subTitleContainer}>
            <span style={style.subTitleText}>{SELECTED_DATA_TITLE}</span>
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
            ? { ...style.unHighlighted, ...style.highlighted }
            : style.unHighlighted;

        return (
            <li
                className="dimension-item"
                id={id}
                key={id}
                style={style.listItem}
                onDoubleClick={() => this.onRemoveSelected(id)}
            >
                <div style={itemStyle}>
                    <SelectedIcon />
                    <span
                        style={style.text}
                        onClick={() => this.toggleHighlight(id)}
                    >
                        {this.props.metadata[id].name}
                    </span>
                    <RemoveSelectedItemButton
                        style={style.removeButton}
                        action={() => this.onRemoveSelected(id)}
                    />
                </div>
            </li>
        );
    };

    render = () => {
        const dataDimensions = this.props.items.map(id => this.renderItem(id));

        return (
            <div style={style.container}>
                <Subtitle />
                <ul style={style.list}>{dataDimensions}</ul>
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
