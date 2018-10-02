import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import {
    UnAssignButton,
    DeselectAllButton,
    RemoveSelectedItemButton,
} from './buttons';
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

const OBJECT_POS = 1;

export class SelectedItems extends Component {
    state = { highlighted: [] };

    onDeselectClick = () => {
        this.props.onDeselect(this.state.highlighted);
        this.setState({ highlighted: [] });
    };

    onRemoveSelected = id => {
        this.setState({ highlighted: this.removeHighlight(id) });
        this.props.onDeselect(id);
    };

    onDeselectAllClick = () => {
        this.props.onDeselect(this.props.items.map(i => i.id));
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

    renderItem = dataDim => {
        const itemStyle = this.state.highlighted.includes(dataDim.id)
            ? { ...style.unHighlighted, ...style.highlighted }
            : style.unHighlighted;

        return (
            <li
                className="dimension-item"
                id={dataDim.id}
                key={dataDim.id}
                style={style.listItem}
            >
                <div style={itemStyle}>
                    <SelectedIcon />
                    <span
                        style={style.text}
                        onClick={() => this.toggleHighlight(dataDim.id)}
                    >
                        {i18n.t(dataDim.displayName)}
                    </span>
                    <RemoveSelectedItemButton
                        style={style.removeButton}
                        action={() => this.onRemoveSelected(dataDim.id)}
                    />
                </div>
            </li>
        );
    };

    render = () => {
        const dataDimensions = this.props.items.map(dataDim =>
            this.renderItem(dataDim)
        );

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

export default SelectedItems;
