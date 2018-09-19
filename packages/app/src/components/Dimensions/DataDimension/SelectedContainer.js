import React, { Component } from 'react';
import { Close } from '@material-ui/icons';
import i18n from '@dhis2/d2-i18n';
import { DeselectAllButton } from './buttons';
import { colors } from '../../../colors';

const style = {
    container: {
        height: 536,
        width: 278,
        border: '1px solid #E0E0E0',
    },
    list: {
        height: 426,
        width: 280,
        paddingLeft: 0,
        margin: 0,
        listStyle: 'none',
    },
    titleContainer: {
        height: 42,
        widht: 280,
        borderBottom: '1px solid #E0E0E0',
    },
    title: {
        position: 'relative',
        height: 20,
        width: 92,
        color: '#494949',
        fontFamily: 'Roboto',
        fontSize: 15,
        fontWeight: 500,
        top: 12,
        left: 8,
    },
    listItem: {
        display: 'flex',
        paddingTop: 2,
        paddingBottom: 2,
    },
    highlighted: {
        display: 'flex',
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 4,
        paddingLeft: 5,
        marginRight: 3,
        marginLeft: 3,
        borderRadius: 4,
        border: '1px solid black',
    },
    icon: {
        height: 6,
        width: 6,
        marginTop: 5,
        marginRight: 5,
        backgroundColor: '#1976D2',
    },
    paddedIcon: {
        height: 6,
        width: 7,
        marginTop: 10,
        marginRight: 5,
        backgroundColor: '#1976D2',
    },
    text: {
        fontSize: 13,
        fontFamily: 'Roboto',
        paddingLeft: 2,
    },
    deleteButton: {
        border: 'none',
        background: 'none',
        marginLeft: 2,
        padding: 0,
        width: 12,
    },
    deleteButtonIcon: {
        fill: colors.blue,
        height: 13,
        width: 10,
    },
    listItemContainer: {
        backgroundColor: colors.lightBlue,
        display: 'flex',
        paddingTop: 1,
        paddingBottom: 1,
        paddingRight: 5,
        paddingLeft: 6,
        marginRight: 3,
        marginLeft: 3,
        borderRadius: 4,
    },
    iconContainer: {},
};

const TITLE = 'Selected Data';

export const RemoveDimensionButton = ({ action }) => {
    return (
        <button style={style.deleteButton} onClick={action} tabIndex={0}>
            <Close style={style.deleteButtonIcon} />
        </button>
    );
};

export class SelectedContainer extends Component {
    renderSelectedItems = dataDim => {
        return (
            <li id={dataDim.id} key={dataDim.id} style={style.listItem}>
                <div
                    style={
                        this.props.highlightedItems.includes(dataDim)
                            ? style.highlighted
                            : style.listItemContainer
                    }
                >
                    <div style={style.iconContainer}>
                        <div style={style.icon} />
                    </div>

                    <span
                        style={style.text}
                        onClick={() => this.props.onItemClick(dataDim)}
                    >
                        {i18n.t(dataDim.displayName)}
                    </span>
                    <RemoveDimensionButton
                        action={() => this.props.removeSelected(dataDim)}
                    />
                </div>
            </li>
        );
    };

    render = () => {
        const selectedItems = this.props.selected.map(dataDim =>
            this.renderSelectedItems(dataDim)
        );
        return (
            <div style={style.container}>
                <div style={style.titleContainer}>
                    <span style={style.title}>{i18n.t(TITLE)}</span>
                </div>
                <ul style={style.list}>{selectedItems}</ul>
                <DeselectAllButton action={this.props.deselectAll} />
            </div>
        );
    };
}

export default SelectedContainer;
